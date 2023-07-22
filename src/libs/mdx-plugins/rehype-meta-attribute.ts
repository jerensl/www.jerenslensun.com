import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Visitor } from 'unist-util-visit/complex-types'
import type { Element } from 'hast'

let re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g

function rehypeMetaAttribute(options = {}): Plugin {
    const visitor: Visitor<Element, Element> = (
        node: Element,
        _index: number | null,
        parentNode: Element | null
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

    return (tree: Element) => {
        visit(tree, 'element', visitor)
    }
}

export default rehypeMetaAttribute
