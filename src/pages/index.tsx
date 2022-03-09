import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image, { ImageLoader } from 'next/image'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { Seo } from '@/components/Seo'
import { LinkURL } from '@/components/LinkURL'
import { generateRss } from '@/lib/rss'
import { getPlaiceholder } from 'plaiceholder'

const blobStorageIoImageLoader: ImageLoader = ({ src, width, quality }) => {
    return `https://res.cloudinary.com/do9os7lxv/image/upload/v1641437560/personal/${src}`
}

export const getStaticProps: GetStaticProps = async () => {
    generateRss()

    const { base64 } = await getPlaiceholder(
        'https://res.cloudinary.com/do9os7lxv/image/upload/v1637714730/personal/illustration-landing-page_drzr7q.webp',
        { size: 10 }
    )

    return {
        props: { blurDataURL: base64 },
    }
}

export default function Home({
    blurDataURL,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    return (
        <>
            <Seo path="/" />
            <div className="min-h-screen w-full">
                <Navbar />
                <main className="min-h-9/10 w-full">
                    <div className="grid grid-cols-4 gap-2 md:grid-cols-8 lg:grid-cols-12 items-center justify-center pt-20 md:pt-10 2xl:pt-28">
                        <div className="col-span-full pt-10 lg:col-start-6 lg:col-span-7 m-auto">
                            <Image
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
                                <div className="flex self-center flex-auto flex-col gap-1">
                                    <h1 className="font-bold text-4xl md:text-5xl">
                                        Jerens Lensun
                                    </h1>
                                    <p className="font-medium text-3xl md:text-4xl">
                                        Software Engineer
                                    </p>
                                </div>
                                <div className="flex self-center flex-col gap-2">
                                    <LinkURL href="/blog">
                                        <a className="rounded-md text-white bg-red-600 font-semibold text-xl hover:bg-red-500 w-36 py-2">
                                            Read Articles
                                        </a>
                                    </LinkURL>
                                    <LinkURL href="/about">
                                        <a className="rounded-md bg-gray-200 font-semibold text-xl hover:bg-gray-300 w-36 py-2">
                                            About Me
                                        </a>
                                    </LinkURL>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    )
}
