import { toHtml } from 'hast-util-to-html'
import { unified } from 'unified'
import parse from 'rehype-parse'
import type { ElementContent } from 'hast'

const CALLOUT = /__(.*?)__/g

function highlightWord(code: Array<ElementContent>): Array<ElementContent> {
    const html = toHtml(code)
    const result = html.replace(
        CALLOUT,
        (_, text) => `<span class="highlight-word">${text}</span>`
    )
    const hast = unified()
        .use(parse, { emitParseErrors: true, fragment: true })
        .parse(result)
    return hast.children as Array<ElementContent>
}

export default highlightWord
