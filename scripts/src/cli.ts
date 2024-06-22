import { parseArgs, Args } from '@std/cli'

export function parseArguments(args: string[]): Args {
    // All boolean arguments
    const booleanArgs = ['help', 'published']

    // All string arguments
    const stringArgs = [ 'source-file', 'output-file']

    // And a list of aliases
    const alias = {
        "help": 'h',
        "published": 'p',
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
