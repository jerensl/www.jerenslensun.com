import {
    getListOfArticle,
    getAllPublishArticle,
    sortByLatestDate,
} from '../../src/domain/Blog'

const metadata = [
    {
        title: 'Testing 101',
        date: '2020-04-24',
        draft: false,
        summary: 'Testing code',
        slug: 'test-markdown',
    },
]

describe('check blog working correctly', () => {
    test('should parse one post from content directory', () => {
        const post = getListOfArticle('__mocks__/contents')
        expect(post).toEqual(['test-draft', 'test-markdown'])
    })

    test('should fail when pass wrong directory', () => {
        expect(() => getListOfArticle('__mocks__/content')).toThrow(
            'You are using the wrong directory'
        )
    })

    test('should parse metadata', async () => {
        const data = await getAllPublishArticle(
            '__mocks__/contents',
            sortByLatestDate
        )

        expect(data).toMatchObject(metadata)
    })
})
