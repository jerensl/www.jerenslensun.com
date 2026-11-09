import { IBlogMetadata } from '@/types/blog'

export interface ITagSummary {
    name: string
    count: number
}

export interface ITagGroupDefinition {
    id: string
    label: string
    tags: string[]
}

export interface ITagGroup {
    id: string
    label: string
    tags: ITagSummary[]
}

/**
 * Topic groups used by the expanded tag panel. Tags that are not listed here
 * automatically fall back to the "Other" group, so adding a new tag never
 * breaks the UI.
 */
export const TAG_GROUP_DEFINITIONS: ITagGroupDefinition[] = [
    {
        id: 'open-source',
        label: 'Open Source & Community',
        tags: [
            'mentorship',
            'outreachy',
            'open-source',
            'meshery',
            'lfx',
            'servo',
            'contribution',
        ],
    },
    {
        id: 'engineering',
        label: 'Engineering & Tooling',
        tags: [
            'golang',
            'gateway',
            'time',
            'parse',
            'rust',
            'playwright',
            'testing',
            'ci-cd',
            'docker',
            'kubernetes',
            'http',
            'networking',
            'load-balancer',
            'reverse-proxy',
            'web',
        ],
    },
    {
        id: 'algorithms',
        label: 'Algorithms & Data',
        tags: [
            'algorithm',
            'algoritma',
            'data',
            'structures',
            'data-structures',
            'sorting',
            'binary-search',
            'heap',
        ],
    },
    {
        id: 'career',
        label: 'Career & Life',
        tags: [
            'career',
            'strategy',
            'tactics',
            'life',
            'writing',
            'productivity',
        ],
    },
    {
        id: 'events',
        label: 'Events',
        tags: ['conference', 'oss-summit', 'summit'],
    },
]

const OTHER_TAG_GROUP: ITagGroupDefinition = {
    id: 'other',
    label: 'Other',
    tags: [],
}

/**
 * Tags used to be typed by hand in the frontmatter, which made it easy to end
 * up with different spellings for the same topic. Keep the aliases here so old
 * posts and existing links keep working even if the frontmatter is not updated.
 */
const TAG_ALIASES: Record<string, string> = {
    menthorship: 'mentorship',
    menthorsip: 'mentorship',
    ossummit: 'oss-summit',
    open_source: 'open-source',
}

/**
 * Turns a raw tag into the canonical value used for filtering and links.
 *
 * Examples:
 * - "Open Source" -> "open-source"
 * - " menthorsip " -> "mentorship"
 * - "data__structures" -> "data-structures"
 */
export function normalizeTag(tag: string): string {
    const normalized = tag
        .trim()
        .toLowerCase()
        .replace(/[_\s]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')

    return TAG_ALIASES[normalized] ?? normalized
}

/**
 * Normalize and de-duplicate a list of tags while preserving their order.
 */
export function normalizeTags(tags: Array<string> | undefined): string[] {
    return Array.from(
        new Set(
            (tags ?? [])
                .map((tag) => normalizeTag(tag))
                .filter((tag) => tag.length > 0)
        )
    )
}

/**
 * Parses the `tags` URL query parameter. Supports both repeated parameters
 * (`?tags=go&tags=rust`) and comma separated values (`?tags=go,rust`).
 */
export function parseTagsParam(value: string | string[] | undefined): string[] {
    if (!value) return []

    const values = Array.isArray(value) ? value : [value]

    return normalizeTags(values.flatMap((tag) => tag.split(',')))
}

/**
 * Returns the number of posts for each tag, sorted by popularity first and
 * alphabetically as a tie-breaker.
 */
export function getTagSummary(
    contents: Array<Pick<IBlogMetadata, 'tags'>>
): ITagSummary[] {
    const counts = new Map<string, number>()

    for (const content of contents) {
        for (const tag of normalizeTags(content.tags)) {
            counts.set(tag, (counts.get(tag) ?? 0) + 1)
        }
    }

    return Array.from(counts, ([name, count]) => ({ name, count })).sort(
        (a, b) => b.count - a.count || a.name.localeCompare(b.name)
    )
}

/**
 * Groups tag summaries into the predefined topic groups. Groups without any
 * tags are omitted, and unknown tags are placed in the "Other" group.
 */
export function getTagGroups(summaries: ITagSummary[]): ITagGroup[] {
    const groups = new Map<string, ITagGroup>()

    for (const definition of [...TAG_GROUP_DEFINITIONS, OTHER_TAG_GROUP]) {
        groups.set(definition.id, {
            id: definition.id,
            label: definition.label,
            tags: [],
        })
    }

    const groupByTag = new Map<string, string>()

    for (const definition of TAG_GROUP_DEFINITIONS) {
        for (const tag of definition.tags) {
            groupByTag.set(normalizeTag(tag), definition.id)
        }
    }

    for (const summary of summaries) {
        const groupId = groupByTag.get(summary.name) ?? OTHER_TAG_GROUP.id
        groups.get(groupId)?.tags.push(summary)
    }

    return Array.from(groups.values()).filter((group) => group.tags.length > 0)
}
