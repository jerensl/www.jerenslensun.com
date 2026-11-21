import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'
import { resolveInlineAsset } from '@/libs/media'
import type { ContentType } from '@/types/content'

export interface RemarkLocalImagesOptions {
    type: ContentType
    slug: string
}

/**
 * Rewrite relative markdown images to their resolved CDN/local path and attach
 * the real dimensions from meta.json so the article does not shift on load.
 */
export default function remarkLocalImages(options: RemarkLocalImagesOptions) {
    return (tree: Root) => {
        visit(tree, 'image', (node) => {
            const asset = resolveInlineAsset(
                options.type,
                options.slug,
                node.url
            )

            if (!asset) {
                return
            }

            node.url = asset.remotePath

            const data = (node.data ?? {}) as Record<string, unknown>
            const properties = (data.hProperties ?? {}) as Record<
                string,
                unknown
            >

            data.hProperties = {
                ...properties,
                width: asset.width,
                height: asset.height,
            }
            node.data = data as typeof node.data
        })
    }
}
