import { Node, visit } from 'unist-util-visit'
import type * as unified from 'unified'
import type * as hast from 'hast'
import { Visitor } from 'unist-util-visit/complex-types'

let re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g

function rehypeMetaAttribute(options = {}): unified.Plugin {
    const visitor = (node, index: number, parentNode) => {
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
