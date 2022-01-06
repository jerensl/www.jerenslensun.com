import type { NextPage } from 'next'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { Seo } from '../components/Seo'
import Image from 'next/image'

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
                    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 items-center justify-center pt-20 md:pt-10 2xl:pt-28">
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
                        <div className="col-span-full lg:col-start-1 lg:row-start-1 lg:col-span-5 relative w-full max-w-sm m-auto text-center pt-10 md:pb-16">
                            <h1 className="font-bold text-4xl md:text-5xl">
                                Jerens Lensun
                            </h1>
                            <p className="font-medium text-3xl md:text-4xl">
                                Software Engineer
                            </p>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    )
}

export default Home
