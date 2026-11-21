# Content Images and CDN Pipeline

This document describes the image and CDN workflow introduced for the portfolio site.
It replaces the previous manual flow of uploading files to ImageKit and copying
filenames into MDX frontmatter.

## Layout

```
packages/content-data/contents/
  blog/en-foo.mdx
  images/
    blog/en-foo/
      cover.webp
      chart.webp
      meta.json          # generated, committed
    shared/
      speed.webp
      meta.json
    project/<slug>/
      cover.webp
      meta.json
```

- `packages/content-data/contents/images/<type>/<slug>/` holds the **source of truth** for a post's images.
- `packages/content-data/contents/images/shared/` holds assets reused by several posts.
- Each folder has a `meta.json` with width, height, blur data URL and the `remotePath`
  the app loads in production.
- The app consumes the content at build time via the `@jerensl/content-data` package.

## Conventions

- **Cover**: a file named `cover.*` in the post folder is used automatically.
  No `cover:` frontmatter is needed. Use `cover: shared/speed.webp` (or any path
  under `contents/images`) to point at a shared or legacy asset.
- **Inline images**: write `![alt](chart.webp)` in MDX. The pipeline rewrites it
  to the asset's `remotePath` and attaches the real dimensions.
- **Translation**: `en-foo` and `id-foo` are paired automatically. An explicit
  `translation:` field is only needed when the slugs do not follow this rule.

## Remote paths

Each asset has a `provider`:

- `imagekit` — loaded from the ImageKit CDN as `<type>/<slug>/<hash>-<file>`.
  New uploads always use a content hash, so replacing an image is a new URL and
  no cache purge is required.
- `local` — served from `public/images/content/<path>` (generated at build time).
  Used when no `IMAGEKIT_PRIVATE_KEY` is available.

The app loader (`src/constant/images.ts`) passes absolute and `/`-prefixed paths
through unchanged, so both providers work in development and production.

## Commands

Run from the repository root.

| Command | Purpose |
|---|---|
| `pnpm content sync` | Hash local assets, write `meta.json`, publish dev copies. Uploads changed assets when `IMAGEKIT_PRIVATE_KEY` is set (`--upload`). |
| `pnpm content check` | Offline validation: frontmatter, stale meta, covers, inline images, reciprocal translation links. |
| `pnpm content add <file> --post <slug>` | Copy an image into a post asset folder and sync it. |
| `pnpm content rename <old> <new>` | Rename a post, its asset folder, translation links and internal links. |
| `pnpm content migrate` | One-time import of legacy covers/inline images into `contents/images`. |
| `pnpm content prune [--remote]` | Report local orphans; with `--remote` also report/delete unused CDN files. |

Flags: `--upload`, `--offline`, `--dry-run`, `--force`, `--yes`.

## Authoring workflow

```sh
# 1. Drop the image into the post folder
cp ~/Pictures/chart.png packages/content-data/contents/images/blog/en-foo/chart.png

# 2. Sync (uploads only if IMAGEKIT_PRIVATE_KEY is set)
pnpm content sync --upload

# 3. Validate what CI will run
pnpm content check

# 4. Commit the post, the asset and its meta.json
git add -A && git commit
```

For a new cover, name the file `cover.webp` (or `cover.png`/`cover.jpg`) and no
frontmatter change is required.

## Environment

- `IMAGEKIT_PRIVATE_KEY` — used for uploads and `prune --remote`. Never commit it.
  Set it in `.envrc` (gitignored). CI does not need it.
- `NEXT_PUBLIC_IMAGES_CDN` — ImageKit endpoint (defaults to
  `https://ik.imagekit.io/jerensl`).

## Build and development

`pnpm --filter "./apps/web-app" dev` and `build` run `content:sync` first, which:
- regenerates `meta.json` if an asset changed,
- copies local-provider assets to `public/images/content`,
- copies ImageKit-provider assets to `public/media` for offline development.

`content check` is the CI gate and exits non-zero on errors (warnings are allowed).

## Troubleshooting

- **"no cover asset; the default cover will be used"** — the post has no
  `cover.*` file. Add one or set `cover:` to a shared/legacy path.
- **"meta is stale"** — run `pnpm content sync`.
- **"inline image … was not found"** — the file is not in the post folder or
  `shared/`. Add it and sync.
- **"translation … does not exist" / one-way links** — fix the `translation:`
  field or rename the paired post with `content rename`.
- **Local assets in production** — `content sync --upload` with
  `IMAGEKIT_PRIVATE_KEY` set converts local paths to CDN paths.

## Migration notes

`content migrate` was run once to import the legacy covers (`speed.jpg`,
`binary-search.jpg`, …) from Cloudinary into `contents/images/`. Eight covers had
no recoverable source and now fall back to the default; add them later with
`content add`.
