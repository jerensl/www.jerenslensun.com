interface ImpactCounts {
    servoMergedPRs?: number | null
    mesheryMergedPRs?: number | null
}

export function buildImpactHighlights({
    servoMergedPRs,
    mesheryMergedPRs,
}: ImpactCounts = {}): string[] {
    const servo =
        typeof servoMergedPRs === 'number'
            ? `${servoMergedPRs} merged pull requests in servo/servo`
            : 'Merged pull requests in servo/servo'

    const meshery =
        typeof mesheryMergedPRs === 'number'
            ? `${mesheryMergedPRs} merged pull requests across the Meshery/Layer5 ecosystem`
            : 'Merged pull requests across the Meshery/Layer5 ecosystem'

    return [
        `${servo}, spanning script bindings, DOM, IndexedDB, and DevTools.`,
        `${meshery}, including Playwright E2E coverage and CI reporting.`,
        'Outreachy intern: rebuilt Servo’s lint and type-check pipeline with GitHub Actions annotations, mach, Ruff, and Pyrefly.',
        'LFX Mentee at CNCF’s Meshery: expanded the Playwright suite, added self-documenting CI reports, and documented the contributor workflow.',
    ]
}
