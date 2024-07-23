import { visit } from 'unist-util-visit'
import parseNumericRange from 'parse-numeric-range'
import { toString } from 'hast-util-to-string'
import { refractor } from 'refractor'
import highlightLine from './rehype-highlight-line'
import highlightWord from './rehype-highlight-word'
import type { Element, Node } from 'hast'
import { Nodes } from 'hast-util-to-string/lib'

function rehypeHighlightCode(options = {}) {
    const visitor = (
        node: Element,
        index: number | undefined,
        parentNode: Element | undefined
    ) => {
        if (parentNode?.tagName === 'pre' && node.tagName === 'code') {
            // syntax highlight
            const lang = node.properties?.className
                ? (node.properties.className as string[])[0].split('-')[1]
                : 'go'

            const registeredLanguages = refractor.listLanguages()
            if (!registeredLanguages.includes(lang)) return

            const result = refractor.highlight(toString(node as Nodes), lang)

            const range = node.properties?.line || '0'

            // line highlight
            const linesToHighlight = parseNumericRange(range as string)
            const currentHighlightLine = highlightLine(result, linesToHighlight)

            // word highlight
            let highlightedWord
            const shouldIgnoreWordHighlight =
                typeof node.properties?.ignoreWordHighlight !== 'undefined'
            if (!shouldIgnoreWordHighlight) {
                highlightedWord = highlightWord(currentHighlightLine)
            }

            if (highlightedWord) {
                node.children = highlightedWord
            }
        }
    }

    return (tree: Node) => {
        visit(tree, 'element', visitor)
    }
}

export default rehypeHighlightCode
