import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getAllPublishArticle, sortByLatestDate } from '../../domain/Blog'
import { Metadata } from '../../domain/Blog'
import Link from 'next/link'
import { Navbar } from '../../components/Navbar'

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
        <div>
            <Navbar />
            {posts.map(({ slug, date, title, summary }: any) => {
                return (
                    <article
                        key={slug}
                        className="flex p-10 pt-20 flex-col gap-1 max-w-3xl"
                    >
                        <h1 className="text-2xl font-bold leading-8 tracking-tight">
                            {title}
                        </h1>
                        <p className="text-gray-500">{date}</p>

                        <p>{summary}</p>

                        <p>
                            <Link href={`/blog/${slug}`}>
                                <span className="text-current cursor-pointer opacity-60 hover:opacity-100">
                                    Read More →
                                </span>
                            </Link>
                        </p>
                    </article>
                )
            })}
            {!posts.length && 'No articles found.'}
        </div>
    )
}
