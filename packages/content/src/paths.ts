import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const moduleDir = path.dirname(fileURLToPath(import.meta.url))

export interface ProjectPaths {
    root: string
    app: string
    contents: string
    blog: string
    project: string
    images: string
    shared: string
    publicDir: string
    publicMedia: string
    publicContent: string
}

export function findRepoRoot(start: string = moduleDir): string {
    let dir = path.resolve(start)

    for (;;) {
        if (fs.existsSync(path.join(dir, 'pnpm-workspace.yaml'))) {
            return dir
        }

        const parent = path.dirname(dir)

        if (parent === dir) {
            throw new Error(
                `Could not find the repository root (pnpm-workspace.yaml) above ${moduleDir}`
            )
        }

        dir = parent
    }
}

export function getPaths(): ProjectPaths {
    const root = process.env.CONTENT_REPO_ROOT
        ? path.resolve(process.env.CONTENT_REPO_ROOT)
        : findRepoRoot()
    const app = path.join(root, 'apps', 'web-app')
    const contents = path.join(root, 'packages', 'content-data', 'contents')
    const images = path.join(contents, 'images')
    const publicDir = path.join(app, 'public')

    return {
        root,
        app,
        contents,
        blog: path.join(contents, 'blog'),
        project: path.join(contents, 'project'),
        images,
        shared: path.join(images, 'shared'),
        publicDir,
        publicMedia: path.join(publicDir, 'media'),
        publicContent: path.join(publicDir, 'images', 'content'),
    }
}
