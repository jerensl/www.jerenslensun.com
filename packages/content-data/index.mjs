import path from 'node:path'
import { fileURLToPath } from 'node:url'

const packageDir = path.dirname(fileURLToPath(import.meta.url))

export const contentDir = path.join(packageDir, 'contents')
export const blogDir = path.join(contentDir, 'blog')
export const projectDir = path.join(contentDir, 'project')
export const imagesDir = path.join(contentDir, 'images')
export const sharedDir = path.join(contentDir, 'images', 'shared')
