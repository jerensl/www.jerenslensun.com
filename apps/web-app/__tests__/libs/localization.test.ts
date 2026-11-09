import {
    DEFAULT_BLOG_LANGUAGE,
    detectLanguageFromSlug,
    formatPostDate,
    getLanguageFromLocale,
    getLanguageLabel,
    getLanguageLocale,
    getLanguageOgLocale,
    getLanguageSwitchLabel,
    getOppositeLanguage,
    getPostLanguage,
    isBlogLanguage,
} from '../../src/libs/localization'

describe('blog localization', () => {
    describe('language detection', () => {
        it('uses the filename prefix for older posts', () => {
            expect(detectLanguageFromSlug('id-algoritma-binary-search')).toBe(
                'id'
            )
            expect(detectLanguageFromSlug('en-fundamental-algorithm')).toBe(
                'en'
            )
            expect(detectLanguageFromSlug('legacy-post')).toBe(
                DEFAULT_BLOG_LANGUAGE
            )
            expect(detectLanguageFromSlug(undefined)).toBe(
                DEFAULT_BLOG_LANGUAGE
            )
        })

        it('lets explicit frontmatter override the filename prefix', () => {
            expect(
                getPostLanguage({
                    slug: 'id-post-with-english-frontmatter',
                    language: 'en',
                })
            ).toBe('en')
            expect(getPostLanguage({ slug: 'en-post', language: 'id' })).toBe(
                'id'
            )
        })

        it('ignores invalid language values', () => {
            expect(getPostLanguage({ slug: 'id-post', language: 'fr' })).toBe(
                'id'
            )
            expect(isBlogLanguage('id')).toBe(true)
            expect(isBlogLanguage('fr')).toBe(false)
        })
    })

    describe('language metadata', () => {
        it('maps languages to labels and locales', () => {
            expect(getLanguageLabel('en')).toBe('English')
            expect(getLanguageLabel('id')).toBe('Bahasa Indonesia')
            expect(getLanguageLocale('en')).toBe('en-US')
            expect(getLanguageLocale('id')).toBe('id-ID')
            expect(getLanguageOgLocale('en')).toBe('en_US')
            expect(getLanguageOgLocale('id')).toBe('id_ID')
        })

        it('converts locales back to a language', () => {
            expect(getLanguageFromLocale('id-ID')).toBe('id')
            expect(getLanguageFromLocale('en-US')).toBe('en')
        })

        it('describes switching to the other language', () => {
            expect(getOppositeLanguage('en')).toBe('id')
            expect(getOppositeLanguage('id')).toBe('en')
            expect(getLanguageSwitchLabel('en')).toBe(
                'Read in Bahasa Indonesia'
            )
            expect(getLanguageSwitchLabel('id')).toBe('Read in English')
        })
    })

    describe('formatPostDate', () => {
        it('formats dates with the matching locale', () => {
            expect(formatPostDate('2025-06-16', 'en')).toBe('June 16, 2025')
            expect(formatPostDate('2025-06-16', 'id')).toBe('16 Juni 2025')
        })

        it('returns an empty string for invalid dates', () => {
            expect(formatPostDate('not-a-date', 'en')).toBe('')
        })
    })
})
