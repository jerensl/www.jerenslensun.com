import { parseArguments } from './cli.ts';
import { green, red } from '@std/fmt/colors';
import { markdownASTParse, markdownASTVisit } from "./ast.ts";
import { existsSync } from "@std/fs/exists";

interface IOptions {
    title: string
    published: boolean
    description: string
    tags: Array<string>
}

function printHelp(): void {
    console.log('Usage: jerensapp@cli [OPTIONS...]')
    console.log('\nOptional flags:')
    console.log('  -h, --help                       Display this help and exit')
    console.log('  --src=<path>, --source-file      Source of the mdx file template')
    console.log('  --out=<path>, --output-file      Output of the mdx file target')
    console.log('  -p, --published                  Are this article is published')
}

async function main(inputArgs: string[]): Promise<void> {
    const args = parseArguments(inputArgs)

    // If help flag enabled, print help.
    if (args.help) {
        printHelp()
        Deno.exit(0)
    }

    const title = prompt("What are your post title?")

    if (title === null || title.length < 3 ) {
        console.log(red("Title must have minimum 3 character"))
        Deno.exit(0)
    }

    const description = prompt("What are the description of the post?")

    if (description === null || description.length < 8 ) {
        console.log(red("Description must have minimum 8 character"))
        Deno.exit(0)
    }

    const tags = prompt("What are the tags of the post(seperate them by comma ex: web, ci, cd)?")

    if (tags === null || tags.length < 3 ) {
        console.log(red("Tags must have minimum 3 character"))
        Deno.exit(0)
    }

    const file = await markdownASTParse<IOptions>(
        `${Deno.cwd()}/${args['source-file']}`, 
        markdownASTVisit, 
        { title: title, published: args.published, description: description, tags: tags.split(",").map(w => w.trim()) }
)
    
    const fileOutputExist = existsSync(`${Deno.cwd()}/${args['output-file']}`);

    if (fileOutputExist) {
        console.log(red(`${args['output-file']} is already exist, please change your output file name`))
        Deno.exit(0)
    }

    await Deno.writeTextFile(`${Deno.cwd()}/${args['output-file']}`, String(file))

    console.log(green("Content successfully generated"))
}

main(Deno.args)
