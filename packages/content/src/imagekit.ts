import path from 'node:path'
import type { CdnUpload } from './types.js'

const UPLOAD_URL = 'https://upload.imagekit.io/api/v1/files/upload'
const API_URL = 'https://api.imagekit.io/v1'

export interface ImageKitConfig {
    endpoint: string
    privateKey?: string
}

export function imageKitConfig(): ImageKitConfig {
    return {
        endpoint:
            process.env.NEXT_PUBLIC_IMAGES_CDN?.replace(/\/$/, '') ||
            'https://ik.imagekit.io/jerensl',
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    }
}

export function hasUploadCredentials(): boolean {
    return Boolean(process.env.IMAGEKIT_PRIVATE_KEY)
}

export function authHeader(privateKey: string): string {
    return `Basic ${Buffer.from(`${privateKey}:`).toString('base64')}`
}

export interface UploadInput {
    buffer: Buffer
    fileName: string
    folder: string
    mimeType?: string
}

export async function uploadAsset(input: UploadInput): Promise<CdnUpload> {
    const { privateKey } = imageKitConfig()

    if (!privateKey) {
        throw new Error(
            'IMAGEKIT_PRIVATE_KEY is not set. Export it or run with --offline.'
        )
    }

    const form = new FormData()
    const blob = new Blob([new Uint8Array(input.buffer)], {
        type: input.mimeType ?? 'application/octet-stream',
    })

    form.set('file', blob, input.fileName)
    form.set('fileName', input.fileName)
    form.set('folder', input.folder.startsWith('/') ? input.folder : `/${input.folder}`)
    form.set('useUniqueFileName', 'false')
    form.set('overwriteFile', 'true')
    form.set('tags', 'content-pipeline')

    const response = await requestWithRetry(UPLOAD_URL, {
        method: 'POST',
        headers: {
            Authorization: authHeader(privateKey),
        },
        body: form,
    })

    const payload = (await response.json()) as {
        filePath?: string
        url?: string
        fileId?: string
        name?: string
        message?: string
    }

    if (!response.ok || !payload.filePath) {
        throw new Error(
            `ImageKit upload failed (${response.status}): ${
                payload.message ?? 'unknown error'
            }`
        )
    }

    return {
        filePath: payload.filePath.replace(/^\//, ''),
        url: payload.url ?? '',
        fileId: payload.fileId ?? '',
        name: payload.name ?? path.basename(input.fileName),
    }
}

export interface RemoteFile {
    fileId: string
    name: string
    filePath: string
    url: string
}

export async function listRemoteFiles(
    startingAfter?: string
): Promise<RemoteFile[]> {
    const { privateKey } = imageKitConfig()

    if (!privateKey) {
        throw new Error('IMAGEKIT_PRIVATE_KEY is not set.')
    }

    const files: RemoteFile[] = []
    let skip = 0
    const limit = 100

    for (;;) {
        const params = new URLSearchParams({
            skip: String(skip),
            limit: String(limit),
            sort: 'ASC_CREATED',
        })

        const response = await requestWithRetry(`${API_URL}/files?${params}`, {
            headers: { Authorization: authHeader(privateKey) },
        })

        if (!response.ok) {
            throw new Error(
                `ImageKit list failed (${response.status}): ${await response.text()}`
            )
        }

        const page = (await response.json()) as Array<{
            fileId: string
            name: string
            filePath: string
            url: string
        }>

        files.push(...page)

        if (page.length < limit) {
            break
        }

        skip += limit
    }

    return files
}

export async function deleteRemoteFile(fileId: string): Promise<void> {
    const { privateKey } = imageKitConfig()

    if (!privateKey) {
        throw new Error('IMAGEKIT_PRIVATE_KEY is not set.')
    }

    const response = await requestWithRetry(`${API_URL}/files/${fileId}`, {
        method: 'DELETE',
        headers: { Authorization: authHeader(privateKey) },
    })

    if (!response.ok) {
        throw new Error(
            `ImageKit delete failed (${response.status}): ${await response.text()}`
        )
    }
}

async function requestWithRetry(
    url: string,
    init: RequestInit,
    attempts = 3
): Promise<Response> {
    let lastError: unknown

    for (let attempt = 1; attempt <= attempts; attempt += 1) {
        try {
            const response = await fetch(url, init)

            if (response.status < 500 || attempt === attempts) {
                return response
            }

            lastError = new Error(`HTTP ${response.status}`)
        } catch (error) {
            lastError = error
        }

        await new Promise((resolve) => setTimeout(resolve, attempt * 500))
    }

    throw lastError instanceof Error
        ? lastError
        : new Error('ImageKit request failed')
}
