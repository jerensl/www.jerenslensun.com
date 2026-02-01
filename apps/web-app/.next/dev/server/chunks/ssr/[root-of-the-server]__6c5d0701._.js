module.exports = [
"[project]/src/libs/mdx-plugins/rehype-highlight-line.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$hast$2d$util$2d$to$2d$html__$5b$external$5d$__$28$hast$2d$util$2d$to$2d$html$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$to$2d$html$29$__ = __turbopack_context__.i("[externals]/hast-util-to-html [external] (hast-util-to-html, esm_import, [project]/node_modules/hast-util-to-html)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$unified__$5b$external$5d$__$28$unified$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unified$29$__ = __turbopack_context__.i("[externals]/unified [external] (unified, esm_import, [project]/node_modules/unified)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$rehype$2d$parse__$5b$external$5d$__$28$rehype$2d$parse$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$rehype$2d$parse$29$__ = __turbopack_context__.i("[externals]/rehype-parse [external] (rehype-parse, esm_import, [project]/node_modules/rehype-parse)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$hast$2d$util$2d$to$2d$html__$5b$external$5d$__$28$hast$2d$util$2d$to$2d$html$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$to$2d$html$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$unified__$5b$external$5d$__$28$unified$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unified$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$rehype$2d$parse__$5b$external$5d$__$28$rehype$2d$parse$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$rehype$2d$parse$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$hast$2d$util$2d$to$2d$html__$5b$external$5d$__$28$hast$2d$util$2d$to$2d$html$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$to$2d$html$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$unified__$5b$external$5d$__$28$unified$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unified$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$rehype$2d$parse__$5b$external$5d$__$28$rehype$2d$parse$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$rehype$2d$parse$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const lineNumberify = (ast, lineNum = 1)=>{
    let lineNumber = lineNum;
    return ast.reduce((result, node)=>{
        if (node.type === 'text') {
            if (node.value.indexOf('\n') === -1) {
                node.lineNumber = lineNumber;
                result.nodes.push(node);
                return result;
            }
            const lines = node.value.split('\n');
            for(let i = 0; i < lines.length; i++){
                if (i !== 0) ++lineNumber;
                if (i === lines.length - 1 && lines[i].length === 0) continue;
                result.nodes.push({
                    type: 'text',
                    value: i === lines.length - 1 ? lines[i] : `${lines[i]}\n`,
                    lineNumber: lineNumber
                });
            }
            result.lineNumber = lineNumber;
            return result;
        }
        if (node.children) {
            node.lineNumber = lineNumber;
            const processed = lineNumberify(node.children, lineNumber);
            node.children = processed.nodes;
            result.lineNumber = processed.lineNumber;
            result.nodes.push(node);
            return result;
        }
        result.nodes.push(node);
        return result;
    }, {
        nodes: [],
        lineNumber: lineNumber
    });
};
const wrapLines = (ast, linesToHighlight)=>{
    const allLines = Array.from(new Set(ast.map((x)=>x.lineNumber)));
    let i = 0;
    const wrapped = allLines.reduce((nodes, marker)=>{
        const line = marker;
        const children = [];
        for(; i < ast.length; i++){
            if (ast[i].lineNumber < line) {
                nodes.push(ast[i]);
                continue;
            }
            if (ast[i].lineNumber === line) {
                children.push(ast[i]);
                continue;
            }
            if (ast[i].lineNumber > line) {
                break;
            }
        }
        nodes.push({
            type: 'element',
            tagName: 'div',
            properties: {
                dataLine: line,
                className: 'highlight-line',
                dataHighlighted: linesToHighlight.includes(line) ? 'true' : 'false'
            },
            children: children,
            lineNumber: line
        });
        return nodes;
    }, []);
    return wrapped;
};
// https://github.com/gatsbyjs/gatsby/pull/26161/files
const MULTILINE_TOKEN_SPAN = /<span class="token ([^"]+)">[^<]*\n[^<]*<\/span>/g;
const applyMultilineFix = function(ast) {
    // AST to HTML
    let html = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$hast$2d$util$2d$to$2d$html__$5b$external$5d$__$28$hast$2d$util$2d$to$2d$html$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$to$2d$html$29$__["toHtml"])(ast);
    // Fix JSX issue
    html = html.replace(MULTILINE_TOKEN_SPAN, (match, token)=>match.replace(/\n/g, `</span>\n<span class="token ${token}">`));
    // HTML to AST
    const hast = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$unified__$5b$external$5d$__$28$unified$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unified$29$__["unified"])().use(__TURBOPACK__imported__module__$5b$externals$5d2f$rehype$2d$parse__$5b$external$5d$__$28$rehype$2d$parse$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$rehype$2d$parse$29$__["default"], {
        emitParseErrors: true,
        fragment: true
    }).parse(html);
    return hast.children;
};
function highlightLine(ast, lines) {
    const formattedAst = applyMultilineFix(ast);
    const numbered = lineNumberify(formattedAst).nodes;
    return wrapLines(numbered, lines);
}
const __TURBOPACK__default__export__ = highlightLine;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/libs/mdx-plugins/rehype-highlight-word.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$hast$2d$util$2d$to$2d$html__$5b$external$5d$__$28$hast$2d$util$2d$to$2d$html$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$to$2d$html$29$__ = __turbopack_context__.i("[externals]/hast-util-to-html [external] (hast-util-to-html, esm_import, [project]/node_modules/hast-util-to-html)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$unified__$5b$external$5d$__$28$unified$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unified$29$__ = __turbopack_context__.i("[externals]/unified [external] (unified, esm_import, [project]/node_modules/unified)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$rehype$2d$parse__$5b$external$5d$__$28$rehype$2d$parse$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$rehype$2d$parse$29$__ = __turbopack_context__.i("[externals]/rehype-parse [external] (rehype-parse, esm_import, [project]/node_modules/rehype-parse)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$hast$2d$util$2d$to$2d$html__$5b$external$5d$__$28$hast$2d$util$2d$to$2d$html$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$to$2d$html$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$unified__$5b$external$5d$__$28$unified$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unified$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$rehype$2d$parse__$5b$external$5d$__$28$rehype$2d$parse$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$rehype$2d$parse$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$hast$2d$util$2d$to$2d$html__$5b$external$5d$__$28$hast$2d$util$2d$to$2d$html$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$to$2d$html$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$unified__$5b$external$5d$__$28$unified$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unified$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$rehype$2d$parse__$5b$external$5d$__$28$rehype$2d$parse$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$rehype$2d$parse$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const CALLOUT = /__(.*?)__/g;
function highlightWord(code) {
    const html = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$hast$2d$util$2d$to$2d$html__$5b$external$5d$__$28$hast$2d$util$2d$to$2d$html$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$to$2d$html$29$__["toHtml"])(code);
    const result = html.replace(CALLOUT, (_, text)=>`<span class="highlight-word">${text}</span>`);
    const hast = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$unified__$5b$external$5d$__$28$unified$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unified$29$__["unified"])().use(__TURBOPACK__imported__module__$5b$externals$5d2f$rehype$2d$parse__$5b$external$5d$__$28$rehype$2d$parse$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$rehype$2d$parse$29$__["default"], {
        emitParseErrors: true,
        fragment: true
    }).parse(result);
    return hast.children;
}
const __TURBOPACK__default__export__ = highlightWord;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/libs/mdx-plugins/rehype-highlight-code.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$unist$2d$util$2d$visit__$5b$external$5d$__$28$unist$2d$util$2d$visit$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$visit$29$__ = __turbopack_context__.i("[externals]/unist-util-visit [external] (unist-util-visit, esm_import, [project]/node_modules/unist-util-visit)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$parse$2d$numeric$2d$range__$5b$external$5d$__$28$parse$2d$numeric$2d$range$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$parse$2d$numeric$2d$range$29$__ = __turbopack_context__.i("[externals]/parse-numeric-range [external] (parse-numeric-range, cjs, [project]/node_modules/parse-numeric-range)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$hast$2d$util$2d$to$2d$string__$5b$external$5d$__$28$hast$2d$util$2d$to$2d$string$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$to$2d$string$29$__ = __turbopack_context__.i("[externals]/hast-util-to-string [external] (hast-util-to-string, esm_import, [project]/node_modules/hast-util-to-string)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$refractor__$5b$external$5d$__$28$refractor$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$refractor$29$__ = __turbopack_context__.i("[externals]/refractor [external] (refractor, esm_import, [project]/node_modules/refractor)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$highlight$2d$line$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/libs/mdx-plugins/rehype-highlight-line.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$highlight$2d$word$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/libs/mdx-plugins/rehype-highlight-word.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$unist$2d$util$2d$visit__$5b$external$5d$__$28$unist$2d$util$2d$visit$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$visit$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$hast$2d$util$2d$to$2d$string__$5b$external$5d$__$28$hast$2d$util$2d$to$2d$string$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$to$2d$string$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$refractor__$5b$external$5d$__$28$refractor$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$refractor$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$highlight$2d$line$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$highlight$2d$word$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$unist$2d$util$2d$visit__$5b$external$5d$__$28$unist$2d$util$2d$visit$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$visit$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$hast$2d$util$2d$to$2d$string__$5b$external$5d$__$28$hast$2d$util$2d$to$2d$string$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$to$2d$string$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$refractor__$5b$external$5d$__$28$refractor$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$refractor$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$highlight$2d$line$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$highlight$2d$word$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
function rehypeHighlightCode(options = {}) {
    const visitor = (node, index, parentNode)=>{
        if (parentNode?.tagName === 'pre' && node.tagName === 'code') {
            // syntax highlight
            const lang = node.properties?.className ? node.properties.className[0].split('-')[1] : 'go';
            const registeredLanguages = __TURBOPACK__imported__module__$5b$externals$5d2f$refractor__$5b$external$5d$__$28$refractor$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$refractor$29$__["refractor"].listLanguages();
            if (!registeredLanguages.includes(lang)) return;
            const result = __TURBOPACK__imported__module__$5b$externals$5d2f$refractor__$5b$external$5d$__$28$refractor$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$refractor$29$__["refractor"].highlight((0, __TURBOPACK__imported__module__$5b$externals$5d2f$hast$2d$util$2d$to$2d$string__$5b$external$5d$__$28$hast$2d$util$2d$to$2d$string$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$to$2d$string$29$__["toString"])(node), lang);
            const range = node.properties?.line || '0';
            // line highlight
            const linesToHighlight = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$parse$2d$numeric$2d$range__$5b$external$5d$__$28$parse$2d$numeric$2d$range$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$parse$2d$numeric$2d$range$29$__["default"])(range);
            const currentHighlightLine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$highlight$2d$line$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(result, linesToHighlight);
            // word highlight
            let highlightedWord;
            const shouldIgnoreWordHighlight = typeof node.properties?.ignoreWordHighlight !== 'undefined';
            if (!shouldIgnoreWordHighlight) {
                highlightedWord = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$highlight$2d$word$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(currentHighlightLine);
            }
            if (highlightedWord) {
                node.children = highlightedWord;
            }
        }
    };
    return (tree)=>{
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$unist$2d$util$2d$visit__$5b$external$5d$__$28$unist$2d$util$2d$visit$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$visit$29$__["visit"])(tree, 'element', visitor);
    };
}
const __TURBOPACK__default__export__ = rehypeHighlightCode;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/libs/mdx-plugins/rehype-meta-attribute.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$unist$2d$util$2d$visit__$5b$external$5d$__$28$unist$2d$util$2d$visit$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$visit$29$__ = __turbopack_context__.i("[externals]/unist-util-visit [external] (unist-util-visit, esm_import, [project]/node_modules/unist-util-visit)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$unist$2d$util$2d$visit__$5b$external$5d$__$28$unist$2d$util$2d$visit$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$visit$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$unist$2d$util$2d$visit__$5b$external$5d$__$28$unist$2d$util$2d$visit$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$visit$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
let re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g;
function rehypeMetaAttribute(options = {}) {
    const visitor = (node, index, parentNode)=>{
        let match;
        if (node.tagName === 'code' && node.data && node.data.meta && node.properties && parentNode?.properties) {
            re.lastIndex = 0; // Reset regex.
            while(match = re.exec(node.data.meta)){
                node.properties[match[1]] = match[2] || match[3] || match[4] || '';
                parentNode.properties[match[1]] = match[2] || match[3] || match[4] || '';
            }
        }
    };
    return (tree)=>{
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$unist$2d$util$2d$visit__$5b$external$5d$__$28$unist$2d$util$2d$visit$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$visit$29$__["visit"])(tree, 'element', visitor);
    };
}
const __TURBOPACK__default__export__ = rehypeMetaAttribute;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/libs/mdx-plugins/rehype-toc.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$unist$2d$util$2d$visit__$5b$external$5d$__$28$unist$2d$util$2d$visit$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$visit$29$__ = __turbopack_context__.i("[externals]/unist-util-visit [external] (unist-util-visit, esm_import, [project]/node_modules/unist-util-visit)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$parameterize__$5b$external$5d$__$28$parameterize$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$parameterize$29$__ = __turbopack_context__.i("[externals]/parameterize [external] (parameterize, cjs, [project]/node_modules/parameterize)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$unist$2d$util$2d$visit__$5b$external$5d$__$28$unist$2d$util$2d$visit$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$visit$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$unist$2d$util$2d$visit__$5b$external$5d$__$28$unist$2d$util$2d$visit$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$visit$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function rehypeTOC(options = {}) {
    const visitor = (node, _index, parentNode)=>{
        if ([
            'h2',
            'h3'
        ].includes(node.tagName)) {
            if (node.children[0].type === 'text') {
                const id = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$parameterize__$5b$external$5d$__$28$parameterize$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$parameterize$29$__["default"])(node.children[0].value);
                if (node.properties) {
                    node.properties.id = id;
                }
            } else if (node.children[0].type === 'element' && node.children[0].children[0].type === 'text') {
                const id = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$parameterize__$5b$external$5d$__$28$parameterize$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$parameterize$29$__["default"])(node.children[0].children[0].value);
                if (node.properties) {
                    node.properties.id = id;
                }
            }
        }
    };
    return (tree)=>{
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$unist$2d$util$2d$visit__$5b$external$5d$__$28$unist$2d$util$2d$visit$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$visit$29$__["visit"])(tree, 'element', visitor);
    };
}
const __TURBOPACK__default__export__ = rehypeTOC;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/libs/content.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getContent",
    ()=>getContent,
    "getContentByName",
    ()=>getContentByName,
    "getContents",
    ()=>getContents,
    "getFiles",
    ()=>getFiles,
    "getTags",
    ()=>getTags
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mdx$2d$bundler__$5b$external$5d$__$28$mdx$2d$bundler$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mdx$2d$bundler$29$__ = __turbopack_context__.i("[externals]/mdx-bundler [external] (mdx-bundler, cjs, [project]/node_modules/mdx-bundler)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$remark$2d$math__$5b$external$5d$__$28$remark$2d$math$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$remark$2d$math$29$__ = __turbopack_context__.i("[externals]/remark-math [external] (remark-math, esm_import, [project]/node_modules/remark-math)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$rehype$2d$katex__$5b$external$5d$__$28$rehype$2d$katex$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$rehype$2d$katex$29$__ = __turbopack_context__.i("[externals]/rehype-katex [external] (rehype-katex, esm_import, [project]/node_modules/rehype-katex)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$highlight$2d$code$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/libs/mdx-plugins/rehype-highlight-code.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$meta$2d$attribute$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/libs/mdx-plugins/rehype-meta-attribute.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$toc$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/libs/mdx-plugins/rehype-toc.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$gray$2d$matter__$5b$external$5d$__$28$gray$2d$matter$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$gray$2d$matter$29$__ = __turbopack_context__.i("[externals]/gray-matter [external] (gray-matter, cjs, [project]/node_modules/gray-matter)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$plaiceholder__$5b$external$5d$__$28$plaiceholder$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$plaiceholder$29$__ = __turbopack_context__.i("[externals]/plaiceholder [external] (plaiceholder, esm_import, [project]/node_modules/plaiceholder)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$remark$2d$math__$5b$external$5d$__$28$remark$2d$math$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$remark$2d$math$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$rehype$2d$katex__$5b$external$5d$__$28$rehype$2d$katex$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$rehype$2d$katex$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$highlight$2d$code$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$meta$2d$attribute$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$toc$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$plaiceholder__$5b$external$5d$__$28$plaiceholder$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$plaiceholder$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$remark$2d$math__$5b$external$5d$__$28$remark$2d$math$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$remark$2d$math$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$rehype$2d$katex__$5b$external$5d$__$28$rehype$2d$katex$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$rehype$2d$katex$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$highlight$2d$code$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$meta$2d$attribute$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$toc$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$plaiceholder__$5b$external$5d$__$28$plaiceholder$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$plaiceholder$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
const getFiles = (dir)=>{
    const fileDirectory = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'contents', dir);
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(fileDirectory)) {
        throw new Error('You are using the empty directory');
    }
    const readFolderDirectory = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(fileDirectory);
    return readFolderDirectory.map((file)=>file.replace(/\.mdx/, ''));
};
const getFileByName = (dir, fileName)=>{
    const sourceFile = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'contents', dir, fileName);
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(sourceFile)) {
        throw new Error('File cannot be found');
    }
    const readFileDirectory = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(sourceFile, 'utf8');
    return readFileDirectory;
};
const getContentByName = async (type, slug)=>{
    const remarkPlugins = [
        __TURBOPACK__imported__module__$5b$externals$5d2f$remark$2d$math__$5b$external$5d$__$28$remark$2d$math$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$remark$2d$math$29$__["default"]
    ];
    const rehypePlugins = [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$meta$2d$attribute$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$highlight$2d$code$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$externals$5d2f$rehype$2d$katex__$5b$external$5d$__$28$rehype$2d$katex$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$rehype$2d$katex$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$toc$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["default"]
    ];
    const source = getFileByName(type, slug);
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        process.env.ESBUILD_BINARY_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'node_modules', 'esbuild', 'bin', 'esbuild');
    }
    const { code, frontmatter } = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mdx$2d$bundler__$5b$external$5d$__$28$mdx$2d$bundler$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mdx$2d$bundler$29$__["bundleMDX"])({
        source: source,
        mdxOptions (options) {
            options.remarkPlugins = [
                ...options.remarkPlugins ?? [],
                ...remarkPlugins
            ];
            options.rehypePlugins = [
                ...options.rehypePlugins ?? [],
                ...rehypePlugins
            ];
            return options;
        }
    });
    return {
        code,
        frontmatter
    };
};
async function getContents(directory) {
    const files = getFiles(directory);
    const contents = await Promise.all(files.map(async (fileName)=>{
        const source = getFileByName(directory, `${fileName}.mdx`);
        const { data } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$gray$2d$matter__$5b$external$5d$__$28$gray$2d$matter$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$gray$2d$matter$29$__["default"])(source);
        let defaultContent = '';
        if (directory === 'blog') {
            defaultContent = 'default-content.webp';
        } else if (directory === 'project') {
            defaultContent = 'project-default.webp';
        } else {
            defaultContent = 'default-content.webp';
        }
        try {
            const resp = await fetch(`${("TURBOPACK compile-time value", "https://ik.imagekit.io")}/tr:di-${defaultContent}/${data.cover}?tr=bl-10`);
            const buffer = Buffer.from(await resp.arrayBuffer());
            const { base64 } = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$plaiceholder__$5b$external$5d$__$28$plaiceholder$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$plaiceholder$29$__["getPlaiceholder"])(buffer);
            return {
                ...data,
                slug: fileName,
                blurDataURL: base64
            };
        } catch (error) {}
        return {
            ...data,
            slug: fileName
        };
    }));
    return contents.filter((data)=>{
        return data.isPublished === true;
    }).sort((a, b)=>{
        return Date.parse(b.date) - Date.parse(a.date);
    });
}
const getContent = async (directory, fileName)=>{
    const file = `${fileName}.mdx`;
    const source = getFileByName(directory, file);
    const remarkPlugins = [
        __TURBOPACK__imported__module__$5b$externals$5d2f$remark$2d$math__$5b$external$5d$__$28$remark$2d$math$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$remark$2d$math$29$__["default"]
    ];
    const rehypePlugins = [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$meta$2d$attribute$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$highlight$2d$code$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$externals$5d2f$rehype$2d$katex__$5b$external$5d$__$28$rehype$2d$katex$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$rehype$2d$katex$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mdx$2d$plugins$2f$rehype$2d$toc$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["default"]
    ];
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        process.env.ESBUILD_BINARY_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'node_modules', 'esbuild', 'bin', 'esbuild');
    }
    const { code, frontmatter } = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mdx$2d$bundler__$5b$external$5d$__$28$mdx$2d$bundler$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mdx$2d$bundler$29$__["bundleMDX"])({
        source: source,
        mdxOptions (options) {
            options.remarkPlugins = [
                ...options.remarkPlugins ?? [],
                ...remarkPlugins
            ];
            options.rehypePlugins = [
                ...options.rehypePlugins ?? [],
                ...rehypePlugins
            ];
            return options;
        }
    });
    try {
        const resp = await fetch(`${("TURBOPACK compile-time value", "https://ik.imagekit.io")}/tr:di-project-default.webp/${frontmatter.cover}?tr=bl-10`);
        const buffer = Buffer.from(await resp.arrayBuffer());
        const { base64 } = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$plaiceholder__$5b$external$5d$__$28$plaiceholder$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$plaiceholder$29$__["getPlaiceholder"])(buffer);
        return {
            code,
            frontmatter,
            metadata: {
                slug: fileName,
                fileName: file,
                blurDataURL: base64
            }
        };
    } catch (error) {}
    return {
        code,
        frontmatter,
        metadata: {
            slug: fileName,
            fileName: file,
            blurDataURL: null
        }
    };
};
function getTags(contents) {
    const tags = new Set();
    for (const post of contents){
        for (const tag of post?.tags ?? []){
            tags.add(tag);
        }
    }
    return Array.from(tags);
}
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/constant/social-media.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "socialMediaLinks",
    ()=>socialMediaLinks
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$29$__ = __turbopack_context__.i("[externals]/@fortawesome/free-brands-svg-icons [external] (@fortawesome/free-brands-svg-icons, esm_import, [project]/node_modules/@fortawesome/free-brands-svg-icons)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$29$__ = __turbopack_context__.i("[externals]/@fortawesome/free-solid-svg-icons [external] (@fortawesome/free-solid-svg-icons, esm_import, [project]/node_modules/@fortawesome/free-solid-svg-icons)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const socialMediaLinks = [
    {
        name: 'Twitter',
        url: 'https://twitter.com/jerensl22',
        icon: __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$29$__["faTwitterSquare"]
    },
    {
        name: ' Instagram',
        url: 'http://instagram.com/jerensl',
        icon: __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$29$__["faInstagram"]
    },
    {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/jerensl/',
        icon: __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$29$__["faLinkedin"]
    },
    {
        name: 'Github',
        url: 'https://github.com/jerensl',
        icon: __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$29$__["faGithubSquare"]
    },
    {
        name: 'RSS',
        url: '/rss.xml',
        icon: __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$29$__["faRssSquare"]
    }
];
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/components/Footer.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$react$2d$fontawesome__$5b$external$5d$__$2840$fortawesome$2f$react$2d$fontawesome$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$29$__ = __turbopack_context__.i("[externals]/@fortawesome/react-fontawesome [external] (@fortawesome/react-fontawesome, cjs, [project]/node_modules/@fortawesome/react-fontawesome)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$links$2f$StandardLink$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/links/StandardLink.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$links$2f$HighlightLink$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/links/HighlightLink.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$page$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constant/page.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$social$2d$media$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constant/social-media.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$links$2f$StandardLink$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$links$2f$HighlightLink$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$page$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$social$2d$media$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$links$2f$StandardLink$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$links$2f$HighlightLink$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$page$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$social$2d$media$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
function SitemapSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                className: "text-xl font-medium text-gray-500 dark:text-white",
                children: "Sitemap"
            }, void 0, false, {
                fileName: "[project]/src/components/Footer.tsx",
                lineNumber: 11,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-2 flex font-normal flex-col gap-1",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$page$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["pageLinks"].map(({ name, url })=>{
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$links$2f$HighlightLink$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["HighlightLink"], {
                        className: "text-lg mr-auto",
                        href: url,
                        children: name
                    }, name, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 17,
                        columnNumber: 25
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/Footer.tsx",
                lineNumber: 14,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Footer.tsx",
        lineNumber: 10,
        columnNumber: 9
    }, this);
}
function ContactSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                className: "text-xl font-medium text-gray-500 dark:text-white",
                children: "Contact"
            }, void 0, false, {
                fileName: "[project]/src/components/Footer.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-2 flex font-normal flex-col gap-1",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$social$2d$media$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["socialMediaLinks"].map(({ name, url })=>{
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$links$2f$HighlightLink$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["HighlightLink"], {
                        className: "text-lg not-italic mr-auto",
                        href: url,
                        isExternal: true,
                        children: name
                    }, name, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 40,
                        columnNumber: 25
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/Footer.tsx",
                lineNumber: 37,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Footer.tsx",
        lineNumber: 33,
        columnNumber: 9
    }, this);
}
function AboutSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                className: "text-xl font-medium text-center sm:text-left",
                children: "Jerens S. Lensun"
            }, void 0, false, {
                fileName: "[project]/src/components/Footer.tsx",
                lineNumber: 58,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "text-center sm:text-left mb-4 md:mb-6 max-w-md text-2xl",
                children: "Software Engineering"
            }, void 0, false, {
                fileName: "[project]/src/components/Footer.tsx",
                lineNumber: 61,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex space-x-6 h-10 justify-center sm:justify-start py-1",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$social$2d$media$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["socialMediaLinks"].filter(({ name })=>name !== 'RSS').map(({ icon, url })=>{
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$links$2f$StandardLink$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["StandardLink"], {
                        href: url,
                        "aria-label": "Github",
                        isExternal: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$react$2d$fontawesome__$5b$external$5d$__$2840$fortawesome$2f$react$2d$fontawesome$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$29$__["FontAwesomeIcon"], {
                            className: "hover:text-red-600 cursor-pointer",
                            icon: icon,
                            size: "2x"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Footer.tsx",
                            lineNumber: 75,
                            columnNumber: 33
                        }, this)
                    }, url, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 69,
                        columnNumber: 29
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/Footer.tsx",
                lineNumber: 64,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Footer.tsx",
        lineNumber: 57,
        columnNumber: 9
    }, this);
}
const Footer = ({ currentYear })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "relative px-5vw mt-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
            className: "relative mx-auto grid max-w-7xl grid-cols-4 grid-rows-max-content gap-x-4 md:grid-cols-8 xl:grid-cols-12 xl:gap-x-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "col-span-full md:col-span-4 xl:col-span-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(AboutSection, {}, void 0, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 97,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/Footer.tsx",
                    lineNumber: 96,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "col-span-full md:col-span-2 mt-10 md:mt-0 xl:col-span-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ContactSection, {}, void 0, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 100,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/Footer.tsx",
                    lineNumber: 99,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "col-span-full md:col-span-2 mt-10 md:mt-0 xl:col-span-1",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(SitemapSection, {}, void 0, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 103,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/Footer.tsx",
                    lineNumber: 102,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "col-span-full my-5 text-lg mb-24 md:mb-10 dark:text-blueGray-500 md:my-5 border-t border-gray-500",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        children: [
                            "© ",
                            currentYear,
                            " Jerens Lensun. All Rights Reserved."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 106,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/Footer.tsx",
                    lineNumber: 105,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Footer.tsx",
            lineNumber: 95,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Footer.tsx",
        lineNumber: 94,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/constant/seo.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "app",
    ()=>app,
    "siteMetadata",
    ()=>siteMetadata
]);
const siteMetadata = {
    url: 'https://www.jerenslensun.com/',
    twitter: '@jerensl22',
    linkedin: 'https://www.linkedin.com/in/jerensl/'
};
const app = {
    name: 'Jerens',
    title: 'Jerens Lensun',
    image: 'https://www.jerenslensun.com/images/banner-og.png',
    description: 'Explore the mind of Jerens Lensun through his personal website, where he shares captivating blog posts on software development, life, and project documentation. Join the conversation now!'
};
}),
"[project]/src/components/Seo.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArticleSeo",
    ()=>ArticleSeo,
    "HeadComponent",
    ()=>HeadComponent
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$seo$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constant/seo.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
;
;
;
const ArticleSeo = ({ title, description, path, image })=>{
    const currTitle = title ? `${title} | ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$seo$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["app"].title}` : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$seo$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["app"].title;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                    children: `${currTitle}`
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 23,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    name: "robots",
                    content: "follow, index"
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 24,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    name: "description",
                    content: description
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 25,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    property: "og:title",
                    content: currTitle
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 28,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    property: "og:url",
                    content: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$seo$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["siteMetadata"].url}${path}`
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 29,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    property: "og:description",
                    content: description
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 33,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    property: "og:site_name",
                    content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$seo$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["app"].name
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 34,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    property: "og:type",
                    content: "website"
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 35,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    name: "image",
                    property: "og:image",
                    content: image
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 36,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    name: "twitter:card",
                    content: "summary_large_image"
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 39,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    name: "twitter:site",
                    content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$seo$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["siteMetadata"].twitter
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 40,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    name: "twitter:title",
                    content: title
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 41,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    name: "twitter:description",
                    content: description
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 42,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    name: "twitter:image",
                    content: image
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 43,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Seo.tsx",
            lineNumber: 22,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false);
};
const HeadComponent = ({ title, path })=>{
    const currTitle = title ? `${title} | ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$seo$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["app"].title}` : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$seo$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["app"].title;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                    children: `${currTitle}`
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 60,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    name: "robots",
                    content: "follow, index"
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 61,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    name: "description",
                    content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$seo$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["app"].description
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 62,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    property: "og:title",
                    content: currTitle
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 65,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    property: "og:url",
                    content: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$seo$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["siteMetadata"].url}${path}`
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 66,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    property: "og:description",
                    content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$seo$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["app"].description
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 70,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    property: "og:site_name",
                    content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$seo$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["app"].name
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 71,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    property: "og:type",
                    content: "website"
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 72,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    name: "image",
                    property: "og:image",
                    content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$seo$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["app"].image
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 73,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    name: "twitter:card",
                    content: "summary_large_image"
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 76,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    name: "twitter:site",
                    content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$seo$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["siteMetadata"].twitter
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 77,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    name: "twitter:title",
                    content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$seo$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["app"].title
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 78,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    name: "twitter:description",
                    content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$seo$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["app"].description
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 79,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                    name: "twitter:image",
                    content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$seo$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["app"].image
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 80,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                    rel: "icon",
                    href: "/favicon.ico"
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 81,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                path === '/about' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                    rel: "canonical",
                    href: "https://www.jerenslensun.com/"
                }, void 0, false, {
                    fileName: "[project]/src/components/Seo.tsx",
                    lineNumber: 84,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Seo.tsx",
            lineNumber: 59,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false);
};
}),
"[project]/src/components/Grid.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "Grid",
    ()=>Grid,
    "GridLines",
    ()=>GridLines
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$clsx$29$__ = __turbopack_context__.i("[externals]/clsx [external] (clsx, esm_import, [project]/node_modules/clsx)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$clsx$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$clsx$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const Grid = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["forwardRef"](function Grid({ children, className, as: Tag = 'div', nested, rowGap }, ref) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Tag, {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$clsx$29$__["default"])('relative', {
            'mx-10vw': !nested,
            'w-full': nested
        }),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$clsx$29$__["default"])('relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6', {
                'mx-auto max-w-7xl': !nested,
                'gap-y-4 lg:gap-y-6': rowGap
            }, className),
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/Grid.tsx",
            lineNumber: 25,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Grid.tsx",
        lineNumber: 18,
        columnNumber: 9
    }, this);
});
/**
 * Use for development only! It renders the grid columns and gaps as page overlay
 */ function GridLines() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "pointer-events-none fixed inset-0 z-10 select-none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Grid, {
            rowGap: true,
            children: Array.from({
                length: 12
            }).map((_, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex h-screen items-start bg-black text-black dark:bg-white dark:text-white opacity-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "w-full pt-4 text-center text-lg text-white dark:text-black",
                        children: idx + 1
                    }, void 0, false, {
                        fileName: "[project]/src/components/Grid.tsx",
                        lineNumber: 57,
                        columnNumber: 25
                    }, this)
                }, idx, false, {
                    fileName: "[project]/src/components/Grid.tsx",
                    lineNumber: 53,
                    columnNumber: 21
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/Grid.tsx",
            lineNumber: 51,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Grid.tsx",
        lineNumber: 50,
        columnNumber: 9
    }, this);
}
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/components/ImageWithFallback.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Images
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$images$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constant/images.ts [ssr] (ecmascript)");
;
;
;
function Images({ src, height, width, alt, blurDataURL, placeholder, className, quality }) {
    if ("TURBOPACK compile-time truthy", 1) {
        const isValid = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$images$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["validLocalImg"].includes(src);
        if (!isValid) {
            src = 'default-content.webp';
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("picture", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                src: `/images/${src}`,
                height: height,
                width: width,
                alt: alt,
                className: "m-auto"
            }, void 0, false, {
                fileName: "[project]/src/components/ImageWithFallback.tsx",
                lineNumber: 34,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ImageWithFallback.tsx",
            lineNumber: 33,
            columnNumber: 13
        }, this);
    }
    //TURBOPACK unreachable
    ;
}
}),
"[project]/src/components/cards/Content.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ContentCard",
    ()=>ContentCard
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$clsx$29$__ = __turbopack_context__.i("[externals]/clsx [external] (clsx, esm_import, [project]/node_modules/clsx)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ImageWithFallback$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ImageWithFallback.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$clsx$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$clsx$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const ContentCard = ({ variant, title, role, subtitle, tags, description, slug, imageURL, blurDataURL })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("article", {
        className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$clsx$29$__["default"])('relative col-span-full sm:col-span-6 xl:col-span-4 rounded-medium h-[460px] sm:w-[320px] hover:bg-on-surface/8 active:bg-on-surface/12', {
            'bg-surface border border-outline-variant': variant === 'outlined',
            'bg-surface-container-low shadow-elevation-1': variant === 'elevated',
            'bg-surface-container-high': variant === 'filled'
        }),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
            href: slug,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "relative overflow-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ImageWithFallback$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        src: imageURL,
                        alt: title,
                        blurDataURL: blurDataURL ?? '',
                        placeholder: blurDataURL ? 'blur' : 'empty',
                        width: 450,
                        height: 200,
                        className: "cursor-pointer object-cover rounded-t-medium"
                    }, void 0, false, {
                        fileName: "[project]/src/components/cards/Content.tsx",
                        lineNumber: 46,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/cards/Content.tsx",
                    lineNumber: 45,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-1 m-4",
                    children: [
                        tags ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: tags.map((value)=>{
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "inline-flex text-sm text-center text-gray-100 py-1 px-2 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out",
                                    children: value
                                }, value, false, {
                                    fileName: "[project]/src/components/cards/Content.tsx",
                                    lineNumber: 61,
                                    columnNumber: 37
                                }, ("TURBOPACK compile-time value", void 0));
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/cards/Content.tsx",
                            lineNumber: 58,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            className: "text-2xl text-on-surface font-bold cursor-pointer",
                            children: title.split(' ').map((w)=>w.substring(0, 1).toUpperCase() + w.substring(1)).join(' ')
                        }, void 0, false, {
                            fileName: "[project]/src/components/cards/Content.tsx",
                            lineNumber: 71,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("b", {
                                            children: "Status:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/cards/Content.tsx",
                                            lineNumber: 84,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " ",
                                        subtitle
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/cards/Content.tsx",
                                    lineNumber: 83,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                role && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("b", {
                                            children: "Role:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/cards/Content.tsx",
                                            lineNumber: 89,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " ",
                                        role
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/cards/Content.tsx",
                                    lineNumber: 88,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/cards/Content.tsx",
                            lineNumber: 81,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "line-clamp-3 text-on-surface-variant",
                            children: description
                        }, void 0, false, {
                            fileName: "[project]/src/components/cards/Content.tsx",
                            lineNumber: 93,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/cards/Content.tsx",
                    lineNumber: 56,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/cards/Content.tsx",
            lineNumber: 44,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/cards/Content.tsx",
        lineNumber: 32,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/pages/project/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Project,
    "getStaticProps",
    ()=>getStaticProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$content$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/libs/content.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Footer.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Seo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Seo.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Grid.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cards$2f$Content$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/cards/Content.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$content$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cards$2f$Content$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$content$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cards$2f$Content$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
const getStaticProps = async ()=>{
    const projects = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$content$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getContents"])('project');
    const getCurrentYear = new Date().getFullYear();
    return {
        props: {
            projects,
            currentYear: getCurrentYear
        }
    };
};
function Project({ projects, currentYear }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Seo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["HeadComponent"], {
                path: "/project",
                title: "Project"
            }, void 0, false, {
                fileName: "[project]/src/pages/project/index.tsx",
                lineNumber: 25,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "min-h-9/10 flex px-4 md:px-10 flex-col gap-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex flex-col text-center gap-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                            className: "pt-24 text-3xl font-semibold",
                            children: "Projects"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/project/index.tsx",
                            lineNumber: 28,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/project/index.tsx",
                        lineNumber: 27,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Grid"], {
                        as: "section",
                        rowGap: true,
                        children: [
                            projects?.length ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "col-span-full text-center",
                                children: "No project available."
                            }, void 0, false, {
                                fileName: "[project]/src/pages/project/index.tsx",
                                lineNumber: 32,
                                columnNumber: 25
                            }, this),
                            projects.map(({ slug, title, role, status, programming_languange, description, cover, blurDataURL })=>{
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cards$2f$Content$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["ContentCard"], {
                                    variant: "outlined",
                                    title: title,
                                    role: role,
                                    subtitle: status,
                                    tags: programming_languange,
                                    description: description,
                                    slug: `project/${slug}`,
                                    imageURL: cover,
                                    blurDataURL: blurDataURL
                                }, slug, false, {
                                    fileName: "[project]/src/pages/project/index.tsx",
                                    lineNumber: 48,
                                    columnNumber: 33
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/project/index.tsx",
                        lineNumber: 30,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/project/index.tsx",
                lineNumber: 26,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "h-20 lg:h-32"
            }, void 0, false, {
                fileName: "[project]/src/pages/project/index.tsx",
                lineNumber: 65,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Footer"], {
                currentYear: currentYear
            }, void 0, false, {
                fileName: "[project]/src/pages/project/index.tsx",
                lineNumber: 66,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6c5d0701._.js.map