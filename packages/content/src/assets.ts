import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import type { MediaAsset } from './types.js'

export const IMAGE_EXTENSIONS = new Set([
    '.avif',
    '.gif',
    '.jpeg',
    '.jpg',
    '.png',
    '.svg',
    '.webp',
])

export function isImageFile(file: string): boolean {
    return IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase())
}

export async function listImageFiles(dir: string): Promise<string[]> {
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true })

        return entries
            .filter((entry) => entry.isFile() && isImageFile(entry.name))
            .map((entry) => entry.name)
            .sort()
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return []
        }

        throw error
    }
}

export function sha256(buffer: Buffer): string {
    return crypto.createHash('sha256').update(buffer).digest('hex')
}

export async function readAssetFile(
    dir: string,
    file: string
): Promise<Buffer> {
    return fs.readFile(path.join(dir, file))
}

export async function inspectImage(
    buffer: Buffer
): Promise<Pick<MediaAsset, 'width' | 'height' | 'blurDataURL'>> {
    const image = sharp(buffer)
    const metadata = await image.metadata()
    const width = metadata.width ?? 0
    const height = metadata.height ?? 0

    let blurDataURL = ''

    try {
        const tiny = await sharp(buffer)
            .resize({ width: 16, withoutEnlargement: true })
            .png({ compressionLevel: 9 })
            .toBuffer()

        blurDataURL = `data:image/png;base64,${tiny.toString('base64')}`
    } catch {
        // Animated or malformed images can fail to produce a placeholder. The
        // app simply falls back to no blur for those assets.
    }

    return { width, height, blurDataURL }
}

export function sanitizeFileName(file: string): string {
    return path
        .basename(file)
        .normalize('NFKD')
        .replace(/[^A-Za-z0-9._-]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
}

export function buildCdnPath(
    scope: string,
    file: string,
    hash: string
): string {
    const directory = scope === 'shared' ? 'shared' : scope
    const name = sanitizeFileName(file)

    return `${directory}/${hash.slice(0, 12)}-${name}`
}

export function buildLocalPath(scope: string, file: string): string {
    const directory = scope === 'shared' ? 'shared' : scope
    const name = sanitizeFileName(file)

    return `/images/content/${directory}/${name}`
}

export async function copyInto(
    source: string,
    destination: string
): Promise<void> {
    await fs.mkdir(path.dirname(destination), { recursive: true })
    await fs.copyFile(source, destination)
}

export async function writeBuffer(
    destination: string,
    buffer: Buffer
): Promise<void> {
    await fs.mkdir(path.dirname(destination), { recursive: true })
    await fs.writeFile(destination, buffer)
}

export function localPathToFile(publicContent: string, localPath: string) {
    const relative = localPath.replace(/^\/images\/content\//, '')

    return path.join(publicContent, relative)
}

export function formatBytes(bytes: number): string {
    if (bytes < 1024) {
        return `${bytes} B`
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}
