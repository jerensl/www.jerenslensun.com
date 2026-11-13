#!/usr/bin/env bash
# Mint a short-lived GitHub App installation token and export bot identity.
# Usage: eval "$(scripts/bot-env.sh)"
#
# Required env (put in your local, gitignored .envrc):
#   GITHUB_APP_ID               GitHub App ID (numeric) or client ID
#   GITHUB_APP_INSTALLATION_ID  Installation ID for this repo
#   GITHUB_APP_PRIVATE_KEY      Path to the downloaded .pem private key
# Optional:
#   GITHUB_APP_SLUG             App slug (defaults to "opencode-bot"); used for bot login + email
set -euo pipefail

: "${GITHUB_APP_ID:?GITHUB_APP_ID is required}"
: "${GITHUB_APP_INSTALLATION_ID:?GITHUB_APP_INSTALLATION_ID is required}"
: "${GITHUB_APP_PRIVATE_KEY:?GITHUB_APP_PRIVATE_KEY is required}"

if [[ ! -r "${GITHUB_APP_PRIVATE_KEY}" ]]; then
  echo "bot-env: private key not readable: ${GITHUB_APP_PRIVATE_KEY}" >&2
  exit 1
fi
for cmd in openssl curl jq; do
  if ! command -v "${cmd}" >/dev/null 2>&1; then
    echo "bot-env: missing required command: ${cmd}" >&2
    exit 1
  fi
done

APP_SLUG="${GITHUB_APP_SLUG:-opencode-bot}"

# Bot login + numeric user id (best effort) for commit author linkage.
BOT_LOGIN="${APP_SLUG}[bot]"
BOT_USER_ID="$(curl -sS "https://api.github.com/users/${BOT_LOGIN}" 2>/dev/null | jq -r '.id // empty' 2>/dev/null)" || true
if [[ -z "${BOT_USER_ID}" ]]; then
  BOT_USER_ID="${GITHUB_APP_ID}"
fi
BOT_EMAIL="${BOT_USER_ID}+${BOT_LOGIN}@users.noreply.github.com"

# --- Mint JWT (RS256), max 10 minutes ---
NOW="$(date +%s)"
IAT="$((NOW - 60))"
EXP="$((NOW + 540))"

b64url() { openssl base64 -A | tr '+/' '-_' | tr -d '='; }

HEADER="$(printf '{"alg":"RS256","typ":"JWT"}' | b64url)"
PAYLOAD="$(printf '{"iat":%s,"exp":%s,"iss":"%s"}' "${IAT}" "${EXP}" "${GITHUB_APP_ID}" | b64url)"
SIGNING_INPUT="${HEADER}.${PAYLOAD}"
SIGNATURE="$(printf '%s' "${SIGNING_INPUT}" | openssl dgst -sha256 -sign "${GITHUB_APP_PRIVATE_KEY}" | b64url)"
JWT="${SIGNING_INPUT}.${SIGNATURE}"

# --- Exchange JWT for installation access token ---
RESPONSE="$(curl -sS -X POST \
  -H "Authorization: Bearer ${JWT}" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/app/installations/${GITHUB_APP_INSTALLATION_ID}/access_tokens")"

TOKEN="$(printf '%s' "${RESPONSE}" | jq -r '.token // empty')"
if [[ -z "${TOKEN}" ]]; then
  echo "bot-env: failed to obtain installation token" >&2
  printf '%s\n' "${RESPONSE}" >&2
  exit 1
fi

# --- Emit exports for eval ---
printf 'export GH_TOKEN=%q\n' "${TOKEN}"
printf 'export GIT_AUTHOR_NAME=%q\n' "${BOT_LOGIN}"
printf 'export GIT_AUTHOR_EMAIL=%q\n' "${BOT_EMAIL}"
printf 'export GIT_COMMITTER_NAME=%q\n' "${BOT_LOGIN}"
printf 'export GIT_COMMITTER_EMAIL=%q\n' "${BOT_EMAIL}"
printf 'export GITHUB_BOT_LOGIN=%q\n' "${BOT_LOGIN}"
