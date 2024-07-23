import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Element, Node } from 'hast'

let re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g

function rehypeMetaAttribute(options = {}) {
    const visitor = (
        node: Element,
        index: number | undefined,
        parentNode: Element | undefined
    ) => {
        let match

        if (
            node.tagName === 'code' &&
            node.data &&
            node.data.meta &&
            node.properties &&
            parentNode?.properties
        ) {
            re.lastIndex = 0 // Reset regex.

            while ((match = re.exec(node.data.meta as string))) {
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
