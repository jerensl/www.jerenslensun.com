import { Node, visit } from 'unist-util-visit'
import parameterize from 'parameterize'
import type { Plugin } from 'unified'
import type { Element } from 'hast'

function rehypeTOC(options = {}): Plugin {
    const visitor = (
        node: Element,
        _index: number | null,
        _parentNode: Element | null
    ) => {
        if (['h2', 'h3', 'h4', 'h5'].includes(node.tagName)) {
            if (node.children[0].type === 'text') {
                const id = parameterize(node.children[0].value)
                if (node.properties) {
                    node.properties.id = id
                }
            } else if (
                node.children[0].type === 'element' &&
                node.children[0].children[0].type === 'text'
            ) {
                const id = parameterize(node.children[0].children[0].value)
                if (node.properties) {
                    node.properties.id = id
                }
            }
        }
    }

    return (tree: Node) => {
        visit(tree, 'element', visitor)
    }
}

export default rehypeTOC
