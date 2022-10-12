import { visit } from 'unist-util-visit'
import { Visitor } from 'unist-util-visit/complex-types'
import parseNumericRange from 'parse-numeric-range'
import { toString } from 'hast-util-to-string'
import { refractor } from 'refractor'
import highlightLine from './rehype-highlight-line'
import highlightWord from './rehype-highlight-word'
import type * as hast from 'hast'
import type * as unified from 'unified'

function rehypeHighlightCode(options = {}): unified.Plugin {
    const visitor: Visitor<hast.Element, hast.Element> = (
        node: any,
        index,
        parentNode
    ) => {
        if (parentNode?.tagName === 'pre' && node.tagName === 'code') {
            // syntax highlight
            const lang = node.properties.className
                ? node.properties.className[0].split('-')[1]
                : 'md'

            const registeredLanguages = refractor.listLanguages()
            if (!registeredLanguages.includes(lang)) return

            let result: any = refractor.highlight(toString(node), lang)

            const range: any = node.properties?.line || '0'

            // line highlight
            const linesToHighlight = parseNumericRange(range)
            result = highlightLine(result, linesToHighlight)

            // word highlight
            const shouldIgnoreWordHighlight =
                typeof node.properties?.ignoreWordHighlight !== 'undefined'
            if (!shouldIgnoreWordHighlight) {
                result = highlightWord(result)
            }

            node.children = result
        }
    }

    return (tree) => {
        visit(tree, 'element', visitor)
    }
}

export default rehypeHighlightCode
