import Link from 'next/link'
import Image, { ImageLoader } from 'next/image'
import { Metadata } from '../domain/Blog'
import { format } from 'date-fns'

const blobStorageIoImageLoader: ImageLoader = ({ src }) => {
    return `https://res.cloudinary.com/do9os7lxv/image/upload/v1637714730/personal/${src}`
}

export const Articles = ({
    cover,
    date,
    description,
    slug,
    title,
    blurDataURL,
    tags,
    readTime,
}: Metadata): React.ReactElement => {
    const captializeTitle = title
        .split(' ')
        .map((w) => w.substring(0, 1).toUpperCase() + w.substring(1))
        .join(' ')

    return (
        <Link href={`/blog/${slug}`} passHref>
            <a>
                <article
                    key={slug}
                    className="cursor-pointer min-h-full rounded-md overflow-auto border border-gray-400 grid grid-rows-2"
                >
                    <div className="relative overflow-auto">
                        <Image
                            loader={blobStorageIoImageLoader}
                            src={cover}
                            alt="Person"
                            objectFit="cover"
                            blurDataURL={blurDataURL}
                            placeholder="blur"
                            height="200px"
                            width="450px"
                            className="relative transition duration-250 ease-in-out scale-100 hover:scale-110 "
                        />
                        <div className="absolute left-1 bottom-3 text-red-400 font-bold bg-white opacity-70 rounded-md"></div>
                    </div>
                    <div className="flex flex-col p-2 justify-between">
                        <h1 className="text-2xl font-bold leading-8 tracking-tight">
                            {captializeTitle}
                        </h1>
                        <p className="line-clamp-3">{description}</p>
                        <p className="text-gray-500">
                            {format(new Date(date), 'MMMM dd, yyyy')} •{' '}
                            <span>{readTime.text}</span>
                        </p>
                    </div>
                </article>
            </a>
        </Link>
    )
}
