import clsx from 'clsx'
import Image, { ImageLoader } from 'next/image'
import { LinkURL } from '../components/LinkURL'
import { InView } from 'react-intersection-observer'
import { Grid } from './Grid'

const blobStorageIoImageLoader: ImageLoader = ({ src, width, quality }) => {
    return `https://res.cloudinary.com/do9os7lxv/image/upload/v1641437560/personal/${src}`
}

export const Header = ({
    blurDataURL,
}: {
    blurDataURL: string
}): React.ReactElement => {
    return (
        <InView triggerOnce rootMargin="-30% 0px">
            {({ inView, ref }) => (
                <Grid
                    as="header"
                    ref={ref}
                    className={clsx('pt-20', inView && 'fade-in-start')}
                >
                    <div className="col-span-full pt-10 lg:col-start-6 lg:col-span-7 m-auto">
                        <Image
                            data-fade="1"
                            src="illustration-landing-page_drzr7q.webp"
                            loader={blobStorageIoImageLoader}
                            placeholder="blur"
                            blurDataURL={blurDataURL}
                            alt="Person"
                            objectFit="contain"
                            width="1000px"
                            height="667px"
                            className="transition duration-300 ease-in-out"
                        />
                    </div>
                    <div className="col-span-full items-center grid gap-10 pt-10 lg:gap-5 lg:pt-0 lg:col-start-1 lg:row-start-1 lg:col-span-5 w-full max-w-sm m-auto text-center">
                        <div className="flex flex-auto flex-col gap-6 items-start">
                            <div
                                className="flex self-center flex-auto flex-col gap-1"
                                data-fade="0"
                            >
                                <h1 className="font-bold text-4xl md:text-5xl">
                                    Jerens Lensun
                                </h1>
                                <p className="font-medium text-3xl md:text-4xl">
                                    Software Engineer
                                </p>
                            </div>
                            <div
                                className="flex self-center flex-col gap-2"
                                data-fade="2"
                            >
                                <LinkURL
                                    className="rounded-md text-white bg-red-600 font-semibold text-xl hover:bg-red-500 w-36 py-2"
                                    href="/blog"
                                >
                                    Read Articles
                                </LinkURL>
                                <LinkURL
                                    className="rounded-md bg-gray-200 font-semibold text-xl hover:bg-gray-300 w-36 py-2"
                                    href="/about"
                                >
                                    About Me
                                </LinkURL>
                            </div>
                        </div>
                    </div>
                </Grid>
            )}
        </InView>
    )
}
