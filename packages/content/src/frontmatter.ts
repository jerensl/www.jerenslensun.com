import fs from 'node:fs'
import matter from 'gray-matter'

const FRONTMATTER_LINE = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/

export interface ParsedPost {
    data: Record<string, unknown>
    content: string
    raw: string
}

export function parsePost(raw: string): ParsedPost {
    const { data, content } = matter(raw)

    return {
        data: data as Record<string, unknown>,
        content,
        raw,
    }
}

export function readPost(file: string): ParsedPost {
    const raw = fs.readFileSync(file, 'utf8')

    return parsePost(raw)
}

export function readRaw(file: string): string {
    return fs.readFileSync(file, 'utf8')
}

export function writeRaw(file: string, raw: string): void {
    fs.writeFileSync(file, raw, 'utf8')
}

export function hasFrontmatterKey(raw: string, key: string): boolean {
    return findKeyLine(raw, key) !== -1
}

export function getFrontmatterValue(
    raw: string,
    key: string
): string | undefined {
    const index = findKeyLine(raw, key)

    if (index === -1) {
        return undefined
    }

    const value = raw.split('\n')[index]?.replace(FRONTMATTER_LINE, '$2') ?? ''

    return unquote(value.trim())
}

export function setFrontmatterValue(
    raw: string,
    key: string,
    value: string
): string {
    const lines = raw.split('\n')
    const index = findKeyLine(raw, key)
    const line = `${key}: ${serializeScalar(value)}`

    if (index !== -1) {
        lines[index] = line

        return lines.join('\n')
    }

    const closing = findClosingDelimiter(lines)

    if (closing === -1) {
        throw new Error('Could not find the closing frontmatter delimiter')
    }

    lines.splice(closing, 0, line)

    return lines.join('\n')
}

export function removeFrontmatterValue(raw: string, key: string): string {
    const index = findKeyLine(raw, key)

    if (index === -1) {
        return raw
    }

    const lines = raw.split('\n')
    lines.splice(index, 1)

    return lines.join('\n')
}

export function scalarKeys(raw: string): string[] {
    const lines = raw.split('\n')
    const start = lines[0]?.trim() === '---' ? 1 : -1

    if (start === -1) {
        return []
    }

    const keys: string[] = []

    for (let index = start; index < lines.length; index += 1) {
        const line = lines[index]

        if (line.trim() === '---') {
            break
        }

        const match = line.match(FRONTMATTER_LINE)

        if (match?.[1]) {
            keys.push(match[1])
        }
    }

    return keys
}

function findKeyLine(raw: string, key: string): number {
    const lines = raw.split('\n')

    if (lines[0]?.trim() !== '---') {
        return -1
    }

    for (let index = 1; index < lines.length; index += 1) {
        const line = lines[index]

        if (line.trim() === '---') {
            return -1
        }

        const match = line.match(FRONTMATTER_LINE)

        if (match?.[1] === key) {
            return index
        }
    }

    return -1
}

function findClosingDelimiter(lines: string[]): number {
    if (lines[0]?.trim() !== '---') {
        return -1
    }

    for (let index = 1; index < lines.length; index += 1) {
        if (lines[index]?.trim() === '---') {
            return index
        }
    }

    return -1
}

function unquote(value: string): string {
    if (
        (value.startsWith("'") && value.endsWith("'")) ||
        (value.startsWith('"') && value.endsWith('"'))
    ) {
        return value.slice(1, -1)
    }

    return value
}

function serializeScalar(value: string): string {
    if (/^[A-Za-z0-9_./-]+$/.test(value)) {
        return value
    }

    return `'${value.replaceAll("'", "''")}'`
}
