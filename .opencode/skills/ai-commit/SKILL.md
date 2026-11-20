---
name: ai-commit
description: Creates structured Git commits with the configured human co-authorship trailer.
---

## Rules for Commits
1. Write concise commit titles using Conventional Commits (`feat:`, `fix:`, `refactor:`).
2. Keep the title under 50 characters.
3. Always append the human co-authorship trailer at the bottom:

   Co-authored-by: Jerens Lensun <jerensslensun@gmail.com>

## Bot attribution (GitHub App)
AI work must be published under the dedicated GitHub App bot, not the human account.

- Before pushing or creating a PR, load bot credentials:
  `eval "$(scripts/bot-env.sh)"` (or use the wrappers below).
- Push branches with `scripts/bot-git push origin <branch>`.
- Create/update PRs with `scripts/bot-gh pr create …` / `scripts/bot-gh pr edit …`.
- Commit author becomes the bot automatically when `GIT_AUTHOR_*`/`GIT_COMMITTER_*`
  are set by `bot-env.sh`. Keep the co-author trailer above for attribution.
- Never commit secrets; `.envrc`, `*.pem`, and token files stay gitignored.
- If `bot-env.sh` fails (missing env vars / key), stop and ask the user to finish
  GitHub App setup (see AGENTS.md) instead of falling back to the human account.
