import { parseArguments } from './cli.ts';
import { green } from '@std/fmt/colors';
import { markdownASTParse, markdownASTVisit } from "./ast.ts";


interface IOptions {
    title: string
    published: boolean
    description: string
    tags: Array<string>
}

function printHelp(): void {
    console.log('Usage: jerensapp@cli [OPTIONS...]')
    console.log('\nOptional flags:')
    console.log('  -h, --help                Display this help and exit')
    console.log('  -p, --published               Are this article a draft')
}

async function main(inputArgs: string[]): Promise<void> {
    const args = parseArguments(inputArgs)

    // If help flag enabled, print help.
    if (args.help) {
        printHelp()
        Deno.exit(0)
    }

    const title = prompt("What are your post title?")

    if (title === "" || title === null || title.length <= 3 ) {
        printHelp()
        Deno.exit(0)
    }

    const description = prompt("What are the description of the post?")

    if (description === "" || description === null || description.length <= 3 ) {
        printHelp()
        Deno.exit(0)
    }

    const tags = prompt("What are the tags of the post(seperate them by comma ex: web, ci, cd)?")

    if (tags === "" || tags === null || tags.length <= 3 ) {
        printHelp()
        Deno.exit(0)
    }

    const file = await markdownASTParse<IOptions>(`${Deno.cwd()}/${args['source-file']}`, markdownASTVisit, { title: title, published: args.published, description: description, tags: tags.split(",").map(w => w.trim()) })

    
    await Deno.writeTextFile(`${Deno.cwd()}/${args['output-file']}`, String(file))

    console.log(green("Content successfully generated"))
}

main(Deno.args)
