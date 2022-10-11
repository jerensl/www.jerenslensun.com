import { Node, visit } from 'unist-util-visit'
import type * as unified from 'unified'

let re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g

function rehypeMetaAttribute(options = {}): unified.Plugin {
    const visitor = (node: any, index: number, parentNode: any) => {
        let match

        if (node.tagName === 'code' && node.data && node.data.meta) {
            re.lastIndex = 0 // Reset regex.

            while ((match = re.exec(node.data.meta))) {
                node.properties[match[1]] =
                    match[2] || match[3] || match[4] || ''
                parentNode.properties[match[1]] =
                    match[2] || match[3] || match[4] || ''
            }
        }
    }

    return (tree: Node) => {
        visit(tree, 'element', visitor)
    }
}

export default rehypeMetaAttribute
