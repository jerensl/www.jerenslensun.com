import {
    absoluteUrl,
    articleSchema,
    breadcrumbSchema,
    buildSeo,
    personSchema,
} from '@/libs/seo'

describe('absoluteUrl', () => {
    it('returns the site root with a single trailing slash', () => {
        expect(absoluteUrl('/')).toBe('https://jerensl.dev/')
    })

    it('normalizes missing and duplicate slashes', () => {
        expect(absoluteUrl('blog')).toBe('https://jerensl.dev/blog/')
        expect(absoluteUrl('/blog')).toBe('https://jerensl.dev/blog/')
        expect(absoluteUrl('//blog')).toBe('https://jerensl.dev/blog/')
        expect(absoluteUrl('/blog/')).toBe('https://jerensl.dev/blog/')
    })

    it('leaves absolute URLs untouched', () => {
        expect(absoluteUrl('https://example.com/article')).toBe(
            'https://example.com/article'
        )
    })
})

describe('buildSeo', () => {
    it('builds a canonical URL and website metadata by default', () => {
        const seo = buildSeo({
            title: 'Blog',
            description: 'Articles',
            path: '/blog',
        })

        expect(seo.title).toBe('Blog | Jerens Lensun')
        expect(seo.canonical).toBe('https://jerensl.dev/blog/')
        expect(seo.type).toBe('website')
        expect(seo.noIndex).toBe(false)
    })

    it('carries article metadata when requested', () => {
        const seo = buildSeo({
            title: 'A post',
            description: 'A description',
            path: '/blog/a-post',
            type: 'article',
            publishedTime: '2025-06-02',
            tags: ['outreachy'],
        })

        expect(seo.canonical).toBe('https://jerensl.dev/blog/a-post/')
        expect(seo.type).toBe('article')
        expect(seo.publishedTime).toBe('2025-06-02')
        expect(seo.modifiedTime).toBe('2025-06-02')
        expect(seo.tags).toEqual(['outreachy'])
    })

    it('emits the page language and alternate translations', () => {
        const seo = buildSeo({
            title: 'Algoritma',
            description: 'Deskripsi',
            path: '/blog/id-fundamental-algoritma',
            type: 'article',
            language: 'id-ID',
            alternates: [
                {
                    hrefLang: 'id-ID',
                    href: 'https://jerensl.dev/blog/id-fundamental-algoritma/',
                },
                {
                    hrefLang: 'en-US',
                    href: 'https://jerensl.dev/blog/en-fundamental-algorithm/',
                },
                {
                    hrefLang: 'x-default',
                    href: 'https://jerensl.dev/blog/en-fundamental-algorithm/',
                },
            ],
        })

        expect(seo.language).toBe('id-ID')
        expect(seo.ogLocale).toBe('id_ID')
        expect(seo.alternates).toHaveLength(3)
    })
})

describe('articleSchema', () => {
    it('uses the provided language for the article body', () => {
        const schema = articleSchema({
            title: 'Algoritma',
            description: 'Deskripsi',
            image: 'https://example.com/image.jpg',
            canonical: 'https://jerensl.dev/blog/id-fundamental-algoritma/',
            date: '2023-03-20',
            tags: ['algoritma'],
            language: 'id-ID',
        })

        expect(schema).toMatchObject({
            '@type': 'BlogPosting',
            inLanguage: 'id-ID',
            keywords: 'algoritma',
        })
    })
})

describe('breadcrumbSchema', () => {
    it('omits the breadcrumb on the home page', () => {
        expect(breadcrumbSchema('/')).toBeNull()
    })

    it('builds a crawlable breadcrumb trail', () => {
        const schema = breadcrumbSchema('/blog/a-post', 'A post')

        expect(schema).toMatchObject({
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://jerensl.dev/',
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Blog',
                    item: 'https://jerensl.dev/blog/',
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: 'A post',
                    item: 'https://jerensl.dev/blog/a-post/',
                },
            ],
        })
    })
})

describe('personSchema', () => {
    it('links the profile to social accounts on the new domain', () => {
        expect(personSchema()).toMatchObject({
            '@type': 'Person',
            url: 'https://jerensl.dev/',
            sameAs: [
                'https://github.com/jerensl',
                'https://www.linkedin.com/in/jerensl/',
                'https://twitter.com/jerensl22',
            ],
        })
    })
})
