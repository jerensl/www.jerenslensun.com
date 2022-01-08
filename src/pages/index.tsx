import type { NextPage } from 'next'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { Seo } from '../components/Seo'
import Image from 'next/image'
import { LinkURL } from '../components/LinkURL'

const blobStorageIoImageLoader = ({ src, width, quality }) => {
    return `https://res.cloudinary.com/do9os7lxv/image/upload/v1641437560/personal/${src}`
}

const Home: NextPage = () => {
    return (
        <>
            <Seo path="/" />
            <div className="min-h-screen w-full">
                <Navbar />
                <main className="min-h-9/10 w-full">
                    <div className="grid grid-cols-4 gap-2 md:grid-cols-8 lg:grid-cols-12 items-center justify-center pt-20 md:pt-10 2xl:pt-28">
                        <div className="col-span-full pt-10 lg:col-start-6 lg:col-span-7 m-auto">
                            <Image
                                src="illustration-landing-page_y5qo69.avif"
                                loader={blobStorageIoImageLoader}
                                alt="Person"
                                objectFit="contain"
                                width="1000px"
                                height="667px"
                            />
                        </div>
                        <div className="col-span-full items-center grid gap-5 lg:col-start-1 lg:row-start-1 lg:col-span-5 w-full max-w-sm m-auto text-center">
                            <div>
                                <h1 className="font-bold text-4xl md:text-5xl">
                                    Jerens Lensun
                                </h1>
                                <p className="font-medium text-3xl md:text-4xl">
                                    Software Engineer
                                </p>
                            </div>
                            <div className="grid gap-1 md:gap-0 md:grid-cols-2 px-10">
                                <LinkURL href="/blog">
                                    <a className="rounded-md text-white bg-red-500 font-semibold text-xl hover:bg-red-700 px-4 py-2 block md:mx-auto">
                                        Read Articles
                                    </a>
                                </LinkURL>
                                <LinkURL href="/about">
                                    <a className="rounded-md bg-gray-300 font-semibold text-xl hover:bg-gray-400 px-4 py-2 block md:mx-auto">
                                        About Me
                                    </a>
                                </LinkURL>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    )
}

export default Home
