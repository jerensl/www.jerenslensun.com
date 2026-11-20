import { computeReadingProgress } from '../../src/hooks/useReadingProgress'

describe('computeReadingProgress', () => {
    const article = {
        articleTop: 1000,
        articleHeight: 3000,
        viewportHeight: 1000,
    }

    it('is 0 before the article starts', () => {
        expect(computeReadingProgress({ ...article, scrollY: 0 })).toBe(0)
    })

    it('tracks progress through a long article', () => {
        expect(computeReadingProgress({ ...article, scrollY: 1500 })).toBe(0.25)
    })

    it('is 1 when the article end reaches the viewport bottom', () => {
        expect(computeReadingProgress({ ...article, scrollY: 3000 })).toBe(1)
    })

    it('clamps overscroll past the article', () => {
        expect(computeReadingProgress({ ...article, scrollY: 5000 })).toBe(1)
    })

    it('marks a short article as read once its top passes the viewport', () => {
        const shortArticle = {
            articleTop: 500,
            articleHeight: 400,
            viewportHeight: 900,
        }

        expect(
            computeReadingProgress({ ...shortArticle, scrollY: 400 })
        ).toBe(0)
        expect(
            computeReadingProgress({ ...shortArticle, scrollY: 600 })
        ).toBe(1)
    })
})
