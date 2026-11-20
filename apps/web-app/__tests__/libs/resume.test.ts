import { buildImpactHighlights } from '@/libs/resume'

describe('buildImpactHighlights', () => {
    it('uses live counts when both are provided', () => {
        const highlights = buildImpactHighlights({
            servoMergedPRs: 12,
            mesheryMergedPRs: 34,
        })

        expect(highlights[0]).toContain('12 merged pull requests in servo/servo')
        expect(highlights[1]).toContain(
            '34 merged pull requests across the Meshery/Layer5 ecosystem'
        )
        expect(highlights).toHaveLength(4)
    })

    it('falls back to generic text when counts are missing', () => {
        const highlights = buildImpactHighlights({
            servoMergedPRs: null,
            mesheryMergedPRs: undefined,
        })

        expect(highlights[0]).toContain('Merged pull requests in servo/servo')
        expect(highlights[1]).toContain(
            'Merged pull requests across the Meshery/Layer5 ecosystem'
        )
    })
})
