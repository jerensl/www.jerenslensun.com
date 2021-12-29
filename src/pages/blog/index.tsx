import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getAllPublishArticle, sortByLatestDate } from '../../domain/Blog'
import { Metadata } from '../../domain/Blog'
import Link from 'next/link'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Seo } from '../../components/Seo'
import Image from 'next/image'

export const getStaticProps: GetStaticProps = async () => {
    const posts: Array<Metadata> = await getAllPublishArticle(
        'contents',
        sortByLatestDate
    )

    return {
        props: { posts },
    }
}

const blobStorageIoImageLoader = ({ src }) => {
    return `https://res.cloudinary.com/do9os7lxv/image/upload/v1637714730/personal/${src}`
}

export default function Blog({
    posts,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    return (
        <>
            <Seo path="/blog" />
            <Navbar />
            <main className="min-h-9/10 flex px-4 md:px-10 flex-col gap-5">
                <h1 className=" pt-24 text-2xl font-bold">Blog</h1>
                <section className="grid grid-cols-auto-fill gap-5">
                    {posts?.map(
                        ({ cover, slug, date, title, summary }: any) => {
                            return (
                                <article key={slug} className="max-w-md">
                                    <div className="overflow-hidden">
                                        <Link passHref href={`/blog/${slug}`}>
                                            <Image
                                                loader={
                                                    blobStorageIoImageLoader
                                                }
                                                src={cover}
                                                alt="Person"
                                                objectFit="cover"
                                                height="200px"
                                                width="450px"
                                                className="transition duration-250 ease-in-out scale-100 hover:scale-110 cursor-pointer"
                                            />
                                        </Link>
                                    </div>

                                    <h1 className="text-2xl font-bold leading-8 tracking-tight">
                                        {title}
                                    </h1>
                                    <p className="text-gray-500">{date}</p>
                                    <p className="line-clamp-3">{summary}</p>
                                    <Link passHref href={`/blog/${slug}`}>
                                        <a className="text-current cursor-pointer opacity-60 hover:opacity-100">
                                            Read More →
                                        </a>
                                    </Link>
                                </article>
                            )
                        }
                    )}
                </section>
            </main>

            <Footer />
        </>
    )
}
