import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from '../domain/Blog'
import { format } from 'date-fns'

const blobStorageIoImageLoader = ({ src }) => {
    return `https://res.cloudinary.com/do9os7lxv/image/upload/v1637714730/personal/${src}`
}

export const Articles = ({
    cover,
    date,
    description,
    slug,
    title,
    blurDataURL,
}: Metadata): React.ReactElement => {
    const captializeTitle = title
        .split(' ')
        .map((w) => w.substring(0, 1).toUpperCase() + w.substring(1))
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
                            blurDataURL={blurDataURL}
                            placeholder="blur"
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
