import { parseArguments, contentGenerator } from './cli.ts';
import { green } from '@std/fmt/colors';


function printHelp(): void {
    console.log('USAGE:')
    console.log('  $ jerensapp@cli [SUBCOMMAND] [OPTIONS]')
    console.log('\n')
    console.log('Subcommand:')
    console.log('  -g, --generator                  For generating new content')
    console.log('  -h, --help                       Display this help and exit')
    console.log('\n')
    console.log('Options for generator:')
    console.log('  --templ=<path>, --template       Source of the mdx file template')
    console.log('  --out=<path>, --output-file      Output of the mdx file target')
    console.log('  -p, --published                  Are this article is published')
    console.log('\n')
    console.log('Examples')
    console.log('  $ jerensapp@cli -g --templ="./template.md" --out="post.mdx"')
}

async function main(inputArgs: string[]): Promise<void> {
    const args = parseArguments(inputArgs)

    // If help flag enabled, print help.
    if (args.help) {
        printHelp()
        Deno.exit(0)
    }

    if (args.generator) {
        await contentGenerator(args)
        console.log(green("Content successfully generated"))
    }
}

main(Deno.args)
