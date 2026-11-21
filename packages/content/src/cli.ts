#!/usr/bin/env node
import path from 'node:path'
import { parseArgs } from 'node:util'
import { addAsset } from './commands/add.js'
import { prune } from './commands/prune.js'
import { renamePost } from './commands/rename.js'
import { runCheck } from './check.js'
import { migrate } from './migrate.js'
import { getPaths } from './paths.js'
import { syncAll } from './sync.js'
import type { ContentType } from './types.js'

const color = !process.env.NO_COLOR && process.stdout.isTTY
const paint = (code: string, text: string) =>
    color ? `\u001b[${code}m${text}\u001b[0m` : text
const red = (text: string) => paint('31', text)
const yellow = (text: string) => paint('33', text)
const green = (text: string) => paint('32', text)
const cyan = (text: string) => paint('36', text)
const dim = (text: string) => paint('2', text)

async function main(argv: string[]): Promise<number> {
    const [command, ...rest] = argv

    if (!command || command === 'help' || command === '--help' || command === '-h') {
        printHelp()

        return 0
    }

    switch (command) {
        case 'sync':
            return runSync(rest)
        case 'check':
            return runCheckCommand()
        case 'add':
            return runAdd(rest)
        case 'migrate':
            return runMigrate(rest)
        case 'rename':
            return runRename(rest)
        case 'prune':
            return runPrune(rest)
        default:
            console.error(red(`Unknown command "${command}".`))
            printHelp()

            return 1
    }
}

async function runSync(argv: string[]): Promise<number> {
    const { values } = parseArgs({
        args: argv,
        options: {
            upload: { type: 'boolean', default: false },
            offline: { type: 'boolean', default: false },
            'dry-run': { type: 'boolean', default: false },
        },
    })
    const summary = await syncAll({
        upload: Boolean(values.upload),
        offline: Boolean(values.offline),
        dryRun: Boolean(values['dry-run']),
    })

    console.log(
        `${green('synced')} ${summary.posts} posts, ${summary.assets} assets ` +
            `(${summary.uploaded} uploaded, ${summary.local} local, ${summary.changed} changed)`
    )

    for (const warning of summary.warnings) {
        console.warn(yellow(`warning: ${warning}`))
    }

    return 0
}

async function runCheckCommand(): Promise<number> {
    const result = await runCheck()

    for (const warning of result.warnings) {
        console.warn(yellow(`warning  ${warning}`))
    }

    for (const error of result.errors) {
        console.error(red(`error    ${error}`))
    }

    const summary = `${result.errors.length} errors, ${result.warnings.length} warnings`

    if (result.errors.length > 0) {
        console.error(red(`content check failed: ${summary}`))

        return 1
    }

    console.log(green(`content check passed: ${summary}`))

    return 0
}

async function runAdd(argv: string[]): Promise<number> {
    const { values, positionals } = parseArgs({
        args: argv,
        allowPositionals: true,
        options: {
            post: { type: 'string' },
            name: { type: 'string' },
            type: { type: 'string', default: 'blog' },
            force: { type: 'boolean', default: false },
            upload: { type: 'boolean', default: false },
            offline: { type: 'boolean', default: false },
        },
    })

    if (!positionals[0] || !values.post) {
        console.error('Usage: content add <file> --post <slug> [--name cover]')

        return 1
    }

    const result = await addAsset(path.resolve(positionals[0]), {
        post: values.post,
        name: values.name,
        type: values.type === 'project' ? 'project' : 'blog',
        force: Boolean(values.force),
        upload: Boolean(values.upload),
        offline: Boolean(values.offline),
    })
    const paths = getPaths()

    console.log(
        `${green('added')} ${path.relative(paths.root, result.destination)}`
    )
    console.log(
        `${green('synced')} ${result.sync.assets} assets (${result.sync.uploaded} uploaded, ${result.sync.local} local)`
    )

    return 0
}

async function runMigrate(argv: string[]): Promise<number> {
    const { values } = parseArgs({
        args: argv,
        options: {
            'dry-run': { type: 'boolean', default: false },
        },
    })
    const result = await migrate({ dryRun: Boolean(values['dry-run']) })

    console.log(
        `${green('restored')} ${result.restored.length} covers from Cloudinary`
    )

    for (const item of result.restored) {
        console.log(`  ${green('+')} ${item}`)
    }

    for (const item of result.inline) {
        console.log(`  ${cyan('~')} ${item}`)
    }

    for (const item of [...new Set(result.missing)]) {
        console.log(`  ${yellow('!')} ${item} ${dim('(no source, using fallback)')}`)
    }

    for (const warning of result.warnings) {
        console.warn(yellow(`warning: ${warning}`))
    }

    return 0
}

async function runRename(argv: string[]): Promise<number> {
    const { values, positionals } = parseArgs({
        args: argv,
        allowPositionals: true,
        options: {
            type: { type: 'string', default: 'blog' },
            'dry-run': { type: 'boolean', default: false },
        },
    })

    if (positionals.length < 2) {
        console.error('Usage: content rename <old-slug> <new-slug> [--type blog]')

        return 1
    }

    const result = await renamePost(positionals[0], positionals[1], {
        type: (values.type === 'project' ? 'project' : 'blog') as ContentType,
        dryRun: Boolean(values['dry-run']),
    })

    console.log(
        `${green('renamed')} ${positionals[0]} -> ${positionals[1]}` +
            (values['dry-run'] ? dim(' (dry run)') : '')
    )
    console.log(
        `  assets: ${result.renamedAssets ? 'moved' : 'none'}, ` +
            `translations: ${result.touchedTranslations.length}, ` +
            `links: ${result.touchedLinks}`
    )

    return 0
}

async function runPrune(argv: string[]): Promise<number> {
    const { values } = parseArgs({
        args: argv,
        options: {
            remote: { type: 'boolean', default: false },
            yes: { type: 'boolean', default: false },
            'dry-run': { type: 'boolean', default: false },
        },
    })
    const result = await prune({
        remote: Boolean(values.remote),
        yes: Boolean(values.yes),
        dryRun: Boolean(values['dry-run']),
    })

    if (result.localOrphans.length === 0 && result.remoteOrphans.length === 0) {
        console.log(green('nothing to prune'))

        return 0
    }

    for (const item of result.localOrphans) {
        console.log(`  ${yellow('local ')} ${item}`)
    }

    for (const item of result.remoteOrphans) {
        console.log(`  ${yellow('remote')} ${item}`)
    }

    if (values.remote && !values.yes) {
        console.log(dim('Pass --yes to delete the remote orphans.'))
    }

    return 0
}

function printHelp(): void {
    const paths = getPaths()

    console.log(`content — assets and translation links for ${paths.app}

Usage:
  content sync [--upload] [--offline] [--dry-run]
      Hash local assets, write meta.json, publish dev copies. Uploads changed
      assets to ImageKit when IMAGEKIT_PRIVATE_KEY is set.

  content check
      Offline validation: frontmatter, stale meta, covers, inline images and
      reciprocal translation links.

  content add <file> --post <slug> [--name cover] [--type blog] [--force]
      Copy an image into a post's asset folder and sync it.

  content migrate [--dry-run]
      One-time import of legacy covers/inline images into contents/images.

  content rename <old-slug> <new-slug> [--type blog] [--dry-run]
      Rename a post, its asset folder, translation links and internal links.

  content prune [--remote] [--yes] [--dry-run]
      Report local orphans; with --remote also report/delete unused CDN files.

Conventions:
  contents/images/<type>/<slug>/cover.webp   default cover
  contents/images/<type>/<slug>/chart.webp   inline image
  contents/images/shared/speed.webp          shared asset, referenced as
                                             cover: shared/speed.webp

Environment:
  IMAGEKIT_PRIVATE_KEY   uploads only; never needed by CI
  NEXT_PUBLIC_IMAGES_CDN ImageKit endpoint (default https://ik.imagekit.io/jerensl)
`)
}

main(process.argv.slice(2))
    .then((code) => {
        process.exitCode = code
    })
    .catch((error: unknown) => {
        console.error(red(error instanceof Error ? error.message : String(error)))
        process.exitCode = 1
    })
