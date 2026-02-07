import { parseArgs, Args } from '@std/cli'
import { existsSync } from '@std/fs/exists';
import { red } from '@std/fmt/colors';
import { markdownASTParse, markdownASTVisit } from "./ast.ts";

interface IOptions {
    title: string
    published: boolean
    description: string
    tags: Array<string>
}

export function parseArguments(args: string[]): Args {
    // All boolean arguments
    const booleanArgs = ['help', 'published', 'generator']

    // All string arguments
    const stringArgs = [ 'template', 'output-file']

    // And a list of aliases
    const alias = {
        "help": 'h',
        'generator': 'g',
        'template': 'tmpl',
        'output-file': 'out',
        "published": 'p',
    }

    return parseArgs(args, {
        alias,
        boolean: booleanArgs,
        string: stringArgs,
        stopEarly: false,
        '--': true,
    })
}

export async function contentGenerator(args: Args): Promise<void> {
    const title = prompt("What are your post title?")

    if (title === null || title.length < 3 ) {
        console.log("Title must have minimum 3 character")
        Deno.exit(0)
    }

    const description = prompt("What are the description of the post?")

    if (description === null || description.length < 8 ) {
        console.log("Description must have minimum 8 character")
        Deno.exit(0)
    }

    const tags = prompt("What are the tags of the post(seperate them by comma ex: web, ci, cd)?")

    if (tags === null || tags.length < 3 ) {
        console.log("Tags must have minimum 3 character")
        Deno.exit(0)
    }

    const file = await markdownASTParse<IOptions>(
        `${Deno.cwd()}/${args['template']}`, 
        markdownASTVisit, 
        { title: title, published: args.published, description: description, tags: tags.split(",").map(w => w.trim()) }
)
    
    const fileOutputExist = existsSync(`${Deno.cwd()}/${args['output-file']}`);

    if (fileOutputExist) {
        console.log(`${args['output-file']} is already exist, please change your output file name`)
        Deno.exit(0)
    }

    await Deno.writeTextFile(`${Deno.cwd()}/${args['output-file']}`, String(file))
}