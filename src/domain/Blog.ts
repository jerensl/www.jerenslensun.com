import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import countBy from 'lodash/countBy'
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import toPairs from 'lodash/toPairs'

const rootDirectory = process.cwd()

export interface Metadata {
    title: string
    date: string
    isPublished: boolean
    description: string
    slug?: string
    cover: string
    fileName: string
    tags?: string
    blurDataURL: string
}

type Sort = (listOfContent: Array<Metadata>) => Array<Metadata>

export function getListOfArticle(directory: string) {
    const dir = path.join(rootDirectory, directory)
    if (!fs.existsSync(dir)) {
        throw new Error('You are using the wrong directory')
    }

    const listofArticle = fs.readdirSync(dir)

    return listofArticle.map((file) => file.replace(/\.mdx/, ''))
}

export function sortByLatestDate(
    listOfContent: Array<Metadata>
): Array<Metadata> {
    return listOfContent.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}

export function getArticleByName(directory: string, fileName: string) {
    const source = path.join(rootDirectory, directory, fileName)

    if (!fs.existsSync(source)) {
        throw new Error('File markdown not found')
    }

    return fs.readFileSync(source, 'utf8')
}

export async function getAllPublishArticle(
    directory: string,
    sort: Sort
): Promise<Array<Metadata>> {
    const files = getListOfArticle(directory)

    const allMetadata: Array<any> = []

    files.map(async (fileName) => {
        const source = getArticleByName(directory, `${fileName}.mdx`)
        const { data } = matter(source)
        if (data.isPublished) {
            allMetadata.push({ ...data, slug: fileName })
        }
    })

    sort(allMetadata)

    return allMetadata
}

export function getAllTags(contents) {
    const tags = contents.reduce(
        (accTags: string[], content) => [...accTags, ...content.tags],
        []
    )

    return map(sortBy(toPairs(countBy(tags)), 1), 0).reverse()
}
