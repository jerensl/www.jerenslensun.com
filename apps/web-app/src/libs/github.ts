const GITHUB_SEARCH_URL = 'https://api.github.com/search/issues'

async function getMergedPRCount(
    scope: string,
    author = 'jerensl'
): Promise<number | null> {
    try {
        const params = new URLSearchParams({
            q: `${scope} is:pr is:merged author:${author}`,
            per_page: '1',
        })

        const response = await fetch(`${GITHUB_SEARCH_URL}?${params}`, {
            headers: {
                Accept: 'application/vnd.github+json',
                'User-Agent': 'jerensl.dev',
            },
            cache: 'no-store',
            signal: AbortSignal.timeout(10_000),
        })

        if (!response.ok) {
            return null
        }

        const data: unknown = await response.json()

        if (
            typeof data === 'object' &&
            data !== null &&
            'total_count' in data &&
            typeof data.total_count === 'number'
        ) {
            return data.total_count
        }

        return null
    } catch {
        return null
    }
}

/**
 * Fetches merged pull request counts at build time. Returns null when GitHub
 * is unavailable or rate-limited so the site can still build without a stale
 * hardcoded count.
 */
export function getMergedServoPRCount(): Promise<number | null> {
    return getMergedPRCount('repo:servo/servo')
}

/**
 * Counts merged PRs across the Meshery/Layer5 GitHub organizations, including
 * Meshery extensions and Kanvas tooling.
 */
export function getMergedMesheryEcosystemPRCount(): Promise<number | null> {
    return getMergedPRCount('org:meshery org:layer5io org:meshery-extensions')
}
