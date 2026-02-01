import { toHtml } from 'hast-util-to-html'
import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import type { Element, Nodes, RootContent } from 'hast'
import { RefractorRoot } from 'refractor'

const lineNumberify = (ast: Array<RootContent>, lineNum = 1) => {
    let lineNumber = lineNum
    return ast.reduce(
        (result: any, node: any) => {
            if (node.type === 'text') {
                if (node.value.indexOf('\n') === -1) {
                    node.lineNumber = lineNumber
                    result.nodes.push(node)
                    return result
                }

                const lines = node.value.split('\n')
                for (let i = 0; i < lines.length; i++) {
                    if (i !== 0) ++lineNumber
                    if (i === lines.length - 1 && lines[i].length === 0)
                        continue
                    result.nodes.push({
                        type: 'text',
                        value:
                            i === lines.length - 1 ? lines[i] : `${lines[i]}\n`,
                        lineNumber: lineNumber,
                    })
                }

                result.lineNumber = lineNumber
                return result
            }

            if (node.children) {
                node.lineNumber = lineNumber
                const processed = lineNumberify(node.children, lineNumber)
                node.children = processed.nodes
                result.lineNumber = processed.lineNumber
                result.nodes.push(node)
                return result
            }

            result.nodes.push(node)
            return result
        },
        { nodes: [], lineNumber: lineNumber }
    )
}

export type ElementWithLineNumber = RootContent & { lineNumber: number }

const wrapLines = (
    ast: Array<ElementWithLineNumber>,
    linesToHighlight: number[]
): Array<Element> => {
    const allLines = Array.from(
        new Set(ast.map((x: ElementWithLineNumber) => x.lineNumber))
    )
    let i = 0
    const wrapped = allLines.reduce((nodes: any, marker: any) => {
        const line = marker
        const children = []
        for (; i < ast.length; i++) {
            if (ast[i].lineNumber < line) {
                nodes.push(ast[i])
                continue
            }

            if (ast[i].lineNumber === line) {
                children.push(ast[i])
                continue
            }

            if (ast[i].lineNumber > line) {
                break
            }
        }

        nodes.push({
            type: 'element',
            tagName: 'div',
            properties: {
                dataLine: line,
                className: 'highlight-line',
                dataHighlighted: linesToHighlight.includes(line)
                    ? 'true'
                    : 'false',
            },
            children: children,
            lineNumber: line,
        })

        return nodes
    }, [])

    return wrapped
}

// https://github.com/gatsbyjs/gatsby/pull/26161/files
const MULTILINE_TOKEN_SPAN = /<span class="token ([^"]+)">[^<]*\n[^<]*<\/span>/g

const applyMultilineFix = function (ast: RefractorRoot) {
    // AST to HTML
    let html = toHtml(ast as Nodes)

    // Fix JSX issue
    html = html.replace(MULTILINE_TOKEN_SPAN, (match, token) =>
        match.replace(/\n/g, `</span>\n<span class="token ${token}">`)
    )

    // HTML to AST
    const hast = unified()
        .use(rehypeParse, { emitParseErrors: true, fragment: true })
        .parse(html)

    return hast.children
}

function highlightLine(ast: RefractorRoot, lines: number[]): Array<Element> {
    const formattedAst = applyMultilineFix(ast)
    const numbered = lineNumberify(formattedAst).nodes

    return wrapLines(numbered, lines)
}

export default highlightLine
