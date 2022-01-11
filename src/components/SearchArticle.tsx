import React from 'react'
import { format } from 'date-fns'
import { Metadata } from '../domain/Blog'
import Link from 'next/link'
import Image from 'next/image'

const blobStorageIoImageLoader = ({ src }) => {
    return `https://res.cloudinary.com/do9os7lxv/image/upload/v1637714730/personal/${src}`
}

export const SearchArticle = ({
    posts,
}: {
    posts: Metadata[]
}): React.ReactElement => {
    const [searchArticles, setSearchArticles] = React.useState<string>('')
    const [filteredPost, setFilteredPost] = React.useState<Array<Metadata>>([
        ...posts,
    ])

    React.useEffect(() => {
        const articles = posts.filter((post) =>
            post.title.toLowerCase().includes(searchArticles.toLowerCase())
        )

        articles.map(({ title, ...allArticle }) => {
            title
                .split(' ')
                .map((w) => w.substring(0, 1).toUpperCase() + w.substring(1))
                .join(' ')

            return {
                title,
                ...allArticle,
            }
        })

        setFilteredPost(articles)
    }, [searchArticles, posts])

    return (
        <section className="grid grid-cols-auto-fill lg:grid-cols-auto-fill-lg gap-5">
            <div className="col-span-full w-full max-w-sm m-auto bg-transparent border rounded-md focus-within:border-red-500 focus-within:ring focus-within:ring-red-400 focus-within:ring-opacity-40">
                <input
                    className="text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none focus:outline-none focus:placeholder-transparent focus:ring-0 p-2 w-full"
                    placeholder="Search Articles..."
                    aria-label="Search Articles"
                    onChange={(event) => {
                        setSearchArticles(event.target.value)
                    }}
                />
            </div>
            {filteredPost.length ? null : <p>No articles found.</p>}
            {filteredPost?.map(
                ({ cover, date, description, slug, title }: Metadata) => {
                    const captializeTitle = title
                        .split(' ')
                        .map(
                            (w) =>
                                w.substring(0, 1).toUpperCase() + w.substring(1)
                        )
                        .join(' ')

                    return (
                        <article key={slug} className="min-h-full">
                            <div className="overflow-auto">
                                <Link href={`/blog/${slug}`} passHref>
                                    <a>
                                        <Image
                                            loader={blobStorageIoImageLoader}
                                            src={cover}
                                            alt="Person"
                                            objectFit="cover"
                                            height="200px"
                                            width="450px"
                                            className="transition duration-250 ease-in-out scale-100 hover:scale-110 cursor-pointer"
                                        />
                                    </a>
                                </Link>
                            </div>
                            <h1 className="text-2xl font-bold leading-8 tracking-tight">
                                {captializeTitle}
                            </h1>
                            <p className="text-gray-500">
                                {format(new Date(date), 'MMMM dd, yyyy')}
                            </p>
                            <p className="line-clamp-3">{description}</p>
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
    )
}
