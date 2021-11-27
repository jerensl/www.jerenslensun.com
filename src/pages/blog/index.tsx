import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getAllPublishArticle, sortByLatestDate } from '../../domain/Blog'
import { Metadata } from '../../domain/Blog'
import Link from 'next/link'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Seo } from '../../components/Seo'

export const getStaticProps: GetStaticProps = async () => {
    const posts: Array<Metadata> = await getAllPublishArticle(
        'contents',
        sortByLatestDate
    )

    return {
        props: { posts },
    }
}

export default function Blog({
    posts,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    return (
        <>
            <Seo path="/blog" />
            <Navbar />
            <main className="min-h-9/10 flex px-10 flex-col gap-5">
                <h1 className=" pt-24 text-2xl font-bold">Blog</h1>
                {posts?.map(({ slug, date, title, summary }: any) => {
                    return (
                        <article
                            key={slug}
                            className="flex flex-col gap-1 max-w-3xl"
                        >
                            <h1 className="text-2xl font-bold leading-8 tracking-tight">
                                {title}
                            </h1>
                            <p className="text-gray-500">{date}</p>
                            <p>{summary}</p>
                            <p>
                                <Link passHref href={`/blog/${slug}`}>
                                    <span className="text-current cursor-pointer opacity-60 hover:opacity-100">
                                        Read More →
                                    </span>
                                </Link>
                            </p>
                        </article>
                    )
                })}
            </main>

            <Footer />
        </>
    )
}
