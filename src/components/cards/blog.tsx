import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { imageLoader } from '../../constant/images'
import type { IBlogMetadata } from '../../types/blog'

export const Card = ({
    cover,
    date,
    description,
    slug,
    title,
    blurDataURL,
    tags,
    readTime,
}: IBlogMetadata): React.ReactElement => {
    const captializeTitle = title
        .split(' ')
        .map((w) => w.substring(0, 1).toUpperCase() + w.substring(1))
        .join(' ')

    return (
        <article
            key={slug}
            className="col-span-full md:col-span-4 lg:col-span-4 rounded-md border border-gray-400"
        >
            <div className="relative overflow-hidden rounded-t-md max-h-48">
                <Link href={`/blog/${slug}`}>
                    <Image
                        loader={imageLoader}
                        src={cover}
                        alt="Person"
                        blurDataURL={blurDataURL}
                        placeholder="blur"
                        height="800"
                        width="1000"
                        object-fit="cover"
                        className="cursor-pointer max-w-full h-auto"
                    />
                </Link>
            </div>
            <div className="flex flex-col p-2 justify-between">
                <Link href={`/blog/${slug}`}>
                    <h1 className="text-2xl font-bold leading-8 tracking-tight cursor-pointer">
                        {captializeTitle}
                    </h1>
                </Link>
                <p className="text-gray-500 dark:text-gray-300 pb-2">
                    {format(new Date(date), 'MMMM dd, yyyy')} •{' '}
                    <span>{readTime?.text}</span>
                </p>
                <p className="line-clamp-3">{description}</p>
            </div>
        </article>
    )
}