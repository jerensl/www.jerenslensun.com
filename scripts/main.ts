import { parseArgs } from 'https://deno.land/std@0.224.0/cli/mod.ts'
import type { Args } from 'https://deno.land/std@0.224.0/cli/mod.ts'
import type { Root } from 'npm:@types/mdast'
import remarkFrontmatter from 'https://esm.sh/remark-frontmatter@5.0.0'
import remarkParse from 'https://esm.sh/remark-parse@11.0.0'
import remarkStringify from 'https://esm.sh/remark-stringify@11.0.0'
import { unified } from 'https://esm.sh/unified@11.0.4'
import { read } from 'https://esm.sh/to-vfile@8.0.0'
import { visit, EXIT } from 'https://esm.sh/unist-util-visit@5.0.0'
import { parse, stringify } from 'jsr:@std/yaml@0.224.1'
import dayjs from 'npm:dayjs'

interface IOptions {
    title: string
}

function remarkReplaceYAML(options: IOptions) {
    return (tree: Root) => {
        visit(tree, 'yaml', (node) => {
            const data = parse(node.value) as Record<string, string>

            data['title'] =  options.title
            if (data['date'] === "") {
                data['date'] = dayjs(dayjs(), "YYYY-MM-DDTh:mm:ssZ").toString()
            } 
            node.value = stringify(data)
            return EXIT
        })
    }
}

function parseArguments(args: string[]): Args {
    // All boolean arguments
    const booleanArgs = ['help', 'draft']

    // All string arguments
    const stringArgs = [ 'source-file', 'output-file']

    // And a list of aliases
    const alias = {
        help: 'h',
        draft: 'd',
        'source-file': 'src',
        'output-file': 'out',
    }

    return parseArgs(args, {
        alias,
        boolean: booleanArgs,
        string: stringArgs,
        stopEarly: false,
        '--': true,
    })
}

function printHelp(): void {
    console.log(`Usage: jerensapp@cli [OPTIONS...]`)
    console.log('\nOptional flags:')
    console.log('  -h, --help                Display this help and exit')
    console.log('  -d, --draft               Are this article a draft')
}

async function main(inputArgs: string[]): Promise<void> {
    const args = parseArguments(inputArgs)

    // If help flag enabled, print help.
    if (args.help) {
        printHelp()
        Deno.exit(0)
    }

    const srcFile = await read(Deno.cwd()+"/"+args['source-file']).catch(() => {
        console.error("Source input File not exist")
        Deno.exit(0)
    })

    const title = prompt("What are your post title?")

    if ((title === null) ) {
        printHelp()
        Deno.exit(0)
    }
    

    const file = await unified()
        .use(remarkParse)
        .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
        .use(remarkReplaceYAML, { title: title })
        .use(remarkStringify)
        .process(srcFile)

    await Deno.writeTextFile(Deno.cwd()+"/"+args['output-file'], String(file))
}

main(Deno.args)
