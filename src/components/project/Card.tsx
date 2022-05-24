import Link from 'next/link'
import Image, { ImageLoader } from 'next/image'
import { ProjectMetadata } from '../../context/project'

const blobStorageIoImageLoader: ImageLoader = ({ src }) => {
    return `https://res.cloudinary.com/do9os7lxv/image/upload/v1637714730/personal/${src}`
}

export const Card = ({
    title,
    programming_languange,
    status,
    cover,
    slug,
    blurDataURL,
    description,
}: ProjectMetadata): React.ReactElement => {
    const captializeTitle = title
        .split(' ')
        .map((w) => w.substring(0, 1).toUpperCase() + w.substring(1))
        .join(' ')

    return (
        <article
            key={slug}
            className="col-span-full md:col-span-4 lg:col-span-4 rounded-md border border-gray-400"
        >
            <div className="relative overflow-auto">
                <Link href={`/project/${slug}`} passHref>
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
                            className="relative transition duration-250 ease-in-out scale-100 hover:scale-110 cursor-pointer"
                        />
                    </a>
                </Link>
            </div>
            <div className="flex flex-col justify-between gap-2 p-2">
                <div>
                    {programming_languange.map((value) => {
                        return (
                            <p
                                key={value}
                                className="inline-flex text-sm text-center text-gray-100 py-1 px-2 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out"
                            >
                                {value}
                            </p>
                        )
                    })}
                </div>
                <div className="flex flex-col gap-1">
                    <Link href={`/project/${slug}`} passHref>
                        <h1 className="text-2xl font-bold leading-8 tracking-tight cursor-pointer">
                            {captializeTitle}
                        </h1>
                    </Link>
                    <p>
                        <b> Status:</b> {status}
                    </p>
                    <p className="line-clamp-3">{description}</p>
                </div>
            </div>
        </article>
    )
}
