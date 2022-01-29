import { GetStaticProps, InferGetStaticPropsType } from 'next'
import {
    getAllPublishArticle,
    sortByLatestDate,
    Metadata,
    getAllTags,
} from '@/domain/Blog'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Seo } from '@/components/Seo'
import { SearchArticle } from '@/components/SearchArticle'
import { getPlaiceholder } from 'plaiceholder'

export const getStaticProps: GetStaticProps = async () => {
    const articles: Array<Metadata> = await getAllPublishArticle(
        'contents',
        sortByLatestDate
    )
    const tags = getAllTags(articles)

    const posts = await Promise.all(
        articles.map(async ({ cover, ...data }) => {
            const { base64 } = await getPlaiceholder(
                `https://res.cloudinary.com/do9os7lxv/image/upload/v1637714730/personal/${cover}`,
                { size: 10 }
            )
            return {
                cover,
                blurDataURL: base64,
                ...data,
            }
        })
    )

    return {
        props: { posts, tags },
    }
}

export default function Blog({
    posts,
    tags,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    return (
        <>
            <Seo path="/blog" />
            <Navbar />
            <main className="min-h-9/10 flex px-4 md:px-10 flex-col gap-5">
                <div className="flex flex-col text-center gap-3">
                    <h1 className="pt-24 text-3xl font-semibold">Blog</h1>
                    <p className="mb-4">Our latest articles for developers</p>
                </div>
                <SearchArticle posts={posts} tags={tags} />
            </main>
            <Footer />
        </>
    )
}
