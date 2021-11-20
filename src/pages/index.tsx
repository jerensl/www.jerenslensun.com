import type { NextPage } from 'next'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { Seo } from '../components/Seo'

const Home: NextPage = () => {
    return (
        <>
            <Seo path="/" />
            <div className="min-h-screen w-full">
                <Navbar />
                <main className="h-screen w-full">
                    <div className="flex items-center justify-center pt-60">
                        <div className="relative w-full max-w-sm text-center">
                            <h1 className="font-bold text-5xl">
                                Jerens Lensun
                            </h1>
                            <p className="font-medium text-4xl">
                                Software Engineer
                            </p>
                            <div className="absolute top-0 -left-6 w-52 h-52 bg-purple-300 blur-2xl rounded-full mix-blend-multiply filter opacity-70 animate-blob"></div>
                            <div className="absolute top-0 -right-20 w-52 h-52 bg-yellow-300 blur-2xl rounded-full mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000"></div>
                            <div className="absolute -bottom-10 left-28 w-52 h-52 bg-pink-300 blur-2xl rounded-full mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000"></div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    )
}

export default Home
