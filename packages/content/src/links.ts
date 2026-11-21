export type BlogLanguage = 'en' | 'id'

export function detectLanguage(slug: string): BlogLanguage {
    return slug.startsWith('id-') ? 'id' : 'en'
}

export function oppositeLanguage(language: BlogLanguage): BlogLanguage {
    return language === 'en' ? 'id' : 'en'
}

export function stripLanguagePrefix(slug: string): string {
    return slug.replace(/^(en|id)-/, '')
}

export function counterpartSlug(slug: string): string | null {
    const base = stripLanguagePrefix(slug)

    if (!base) {
        return null
    }

    return `${oppositeLanguage(detectLanguage(slug))}-${base}`
}

export interface TranslationResolution {
    target?: string
    /** Explicit frontmatter value, when present. */
    explicit?: string
    derived?: string
    error?: string
    warning?: string
}

export function resolveTranslation(
    slug: string,
    explicit: string | undefined,
    existingSlugs: Set<string>
): TranslationResolution {
    const derived = counterpartSlug(slug) ?? undefined

    if (explicit) {
        if (!existingSlugs.has(explicit)) {
            return {
                target: explicit,
                explicit,
                derived,
                error: `translation "${explicit}" does not exist`,
            }
        }

        if (detectLanguage(explicit) === detectLanguage(slug)) {
            return {
                target: explicit,
                explicit,
                derived,
                error: `translation "${explicit}" has the same language prefix`,
            }
        }

        return { target: explicit, explicit, derived }
    }

    if (derived && existingSlugs.has(derived)) {
        return { target: derived, derived }
    }

    return { derived }
}

/**
 * Returns a translation path when the pair is reciprocal. A one-way link is a
 * configuration error, because the language switch would disappear on one side.
 */
export function checkReciprocity(
    slug: string,
    target: string,
    counterpartExplicit: string | undefined,
    counterpartDerived: string | undefined
): string | undefined {
    const back = counterpartExplicit ?? counterpartDerived

    if (back !== slug) {
        return `"${target}" points back to "${back ?? 'nothing'}" instead of "${slug}"`
    }

    return undefined
}
