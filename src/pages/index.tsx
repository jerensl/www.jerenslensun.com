import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Footer } from '../components/Footer'
import { Seo } from '../components/Seo'
import { generateRss } from '../lib/rss'
import { getPlaiceholder } from 'plaiceholder'
import { Header } from '../components/Header'
import { IntroductionSection } from '../components/sections/introduction-section'
import { CareerSection } from '../components/sections/career-section'

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
            <Header blurDataURL={blurDataURL} />
            <div className="h-56 lg:h-64" />
            <IntroductionSection />
            <div className="h-56 lg:h-64" />
            <CareerSection />
            <div className="h-56 lg:h-64" />
            <Footer />
        </>
    )
}
