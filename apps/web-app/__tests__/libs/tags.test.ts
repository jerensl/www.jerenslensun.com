import {
    getTagGroups,
    getTagSummary,
    normalizeTag,
    normalizeTags,
    parseTagsParam,
} from '../../src/libs/tags'

describe('tag utilities', () => {
    describe('normalizeTag', () => {
        it('lower-cases, trims and turns spaces/underscores into hyphens', () => {
            expect(normalizeTag('  Open   Source ')).toBe('open-source')
            expect(normalizeTag('DATA_STRUCTURES')).toBe('data-structures')
        })

        it('fixes common historical spelling mistakes', () => {
            expect(normalizeTag('menthorship')).toBe('mentorship')
            expect(normalizeTag('menthorsip')).toBe('mentorship')
            expect(normalizeTag('ossummit')).toBe('oss-summit')
        })
    })

    describe('normalizeTags', () => {
        it('normalizes and de-duplicates tags while preserving order', () => {
            expect(
                normalizeTags([
                    'menthorship',
                    'Outreachy',
                    'mentorship',
                    ' open-source ',
                ])
            ).toEqual(['mentorship', 'outreachy', 'open-source'])
        })
    })

    describe('parseTagsParam', () => {
        it('parses repeated and comma separated URL parameters', () => {
            expect(parseTagsParam(['golang', 'open-source'])).toEqual([
                'golang',
                'open-source',
            ])
            expect(parseTagsParam('golang,open source')).toEqual([
                'golang',
                'open-source',
            ])
            expect(parseTagsParam(undefined)).toEqual([])
        })
    })

    describe('getTagSummary', () => {
        it('counts normalized tags and sorts by popularity then name', () => {
            const summary = getTagSummary([
                { tags: ['menthorship', 'outreachy'] },
                { tags: ['mentorship', 'golang'] },
                { tags: ['menthorsip', 'outreachy'] },
                { tags: ['outreachy', 'golang'] },
            ])

            expect(summary).toEqual([
                { name: 'mentorship', count: 3 },
                { name: 'outreachy', count: 3 },
                { name: 'golang', count: 2 },
            ])
        })
    })

    describe('getTagGroups', () => {
        it('groups known tags and puts unknown tags in Other', () => {
            const groups = getTagGroups([
                { name: 'golang', count: 4 },
                { name: 'algorithm', count: 3 },
                { name: 'outreachy', count: 2 },
                { name: 'life', count: 1 },
                { name: 'brand-new-tag', count: 1 },
            ])

            expect(
                groups.map((group) => ({
                    id: group.id,
                    label: group.label,
                    tags: group.tags.map((tag) => tag.name),
                }))
            ).toEqual([
                {
                    id: 'open-source',
                    label: 'Open Source & Community',
                    tags: ['outreachy'],
                },
                {
                    id: 'engineering',
                    label: 'Engineering & Tooling',
                    tags: ['golang'],
                },
                {
                    id: 'algorithms',
                    label: 'Algorithms & Data',
                    tags: ['algorithm'],
                },
                {
                    id: 'career',
                    label: 'Career & Life',
                    tags: ['life'],
                },
                {
                    id: 'other',
                    label: 'Other',
                    tags: ['brand-new-tag'],
                },
            ])
        })

        it('omits groups without matching tags', () => {
            const groups = getTagGroups([{ name: 'golang', count: 1 }])

            expect(groups.map((group) => group.id)).toEqual(['engineering'])
        })
    })
})
