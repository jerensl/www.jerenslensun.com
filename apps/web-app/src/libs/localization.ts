import { format } from 'date-fns/format'
import { enUS, id as idLocale } from 'date-fns/locale'
import { BlogLanguage } from '@/types/content'

export const BLOG_LANGUAGES: BlogLanguage[] = ['en', 'id']

export const DEFAULT_BLOG_LANGUAGE: BlogLanguage = 'en'

interface LanguageConfig {
    /** Human readable name used in UI copy. */
    label: string
    /** BCP 47 locale used for `<html lang>`, `hreflang`, and schema.org. */
    locale: string
    /** Open Graph locale format, which uses underscores instead of hyphens. */
    ogLocale: string
    dateLocale: typeof enUS
}

const LANGUAGE_CONFIG: Record<BlogLanguage, LanguageConfig> = {
    en: {
        label: 'English',
        locale: 'en-US',
        ogLocale: 'en_US',
        dateLocale: enUS,
    },
    id: {
        label: 'Bahasa Indonesia',
        locale: 'id-ID',
        ogLocale: 'id_ID',
        dateLocale: idLocale,
    },
}

export function isBlogLanguage(value: unknown): value is BlogLanguage {
    return value === 'en' || value === 'id'
}

/**
 * Older posts only encode their language in the filename, so keep supporting
 * that convention while allowing frontmatter to override it in the future.
 */
export function detectLanguageFromSlug(slug?: string | null): BlogLanguage {
    return slug?.startsWith('id-') ? 'id' : DEFAULT_BLOG_LANGUAGE
}

export function getPostLanguage(post: {
    slug?: string | null
    language?: string | null
}): BlogLanguage {
    if (isBlogLanguage(post.language)) {
        return post.language
    }

    return detectLanguageFromSlug(post.slug)
}

export function getOppositeLanguage(language: BlogLanguage): BlogLanguage {
    return language === 'en' ? 'id' : 'en'
}

export function getLanguageLabel(language: BlogLanguage): string {
    return LANGUAGE_CONFIG[language].label
}

export function getLanguageLocale(language: BlogLanguage): string {
    return LANGUAGE_CONFIG[language].locale
}

export function getLanguageOgLocale(language: BlogLanguage): string {
    return LANGUAGE_CONFIG[language].ogLocale
}

export function getLanguageFromLocale(locale: string): BlogLanguage {
    return locale.toLowerCase().startsWith('id') ? 'id' : 'en'
}

/** Copy for the button that switches to the other available language. */
export function getLanguageSwitchLabel(language: BlogLanguage): string {
    return `Read in ${getLanguageLabel(getOppositeLanguage(language))}`
}

/**
 * Formats a post date using the reader's article language. Indonesian dates
 * are ordered day-first, which `date-fns` does not do automatically when a
 * literal pattern is used. Invalid dates fall back to an empty string instead
 * of rendering "Invalid Date".
 */
export function formatPostDate(
    date: string | number | Date,
    language: BlogLanguage,
    pattern?: string
): string {
    const value = date instanceof Date ? date : new Date(date)

    if (Number.isNaN(value.getTime())) {
        return ''
    }

    const resolvedPattern =
        pattern ?? (language === 'id' ? 'd MMMM yyyy' : 'MMMM d, yyyy')

    return format(value, resolvedPattern, {
        locale: LANGUAGE_CONFIG[language].dateLocale,
    })
}
