import Link from 'next/link'
import Image from 'next/image'
import { ProjectMetadata } from '../../context/project'
import { imageLoader } from '../../lib/images'

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
                <Link href={`/project/${slug}`}>
                    <Image
                        loader={imageLoader}
                        src={cover}
                        alt="Person"
                        blurDataURL={blurDataURL}
                        placeholder="blur"
                        height="200"
                        width="450"
                        className="object-cover relative cursor-pointer"
                    />
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
                    <Link href={`/project/${slug}`} passHref legacyBehavior>
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
