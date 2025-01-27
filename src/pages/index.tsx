import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Footer } from '@/components/Footer'
import { HeadComponent } from '@/components/Seo'
import { generateRss } from '@/libs/rss'
import { getPlaiceholder } from 'plaiceholder'
import { Header } from '@/components/Header'
import { IntroductionSection } from '@/components/sections/Introduction.section'
import { CareerSection } from '@/components/sections/Career.section'
import HorizontalScroll from '@/components/sections/OSSContribution'

export const getStaticProps: GetStaticProps = async () => {
    generateRss()

    const src = `${process.env.NEXT_PUBLIC_IMAGES_CDN}/illustration-landing-page.webp`

    const buffer = await fetch(src).then(async (res) =>
        Buffer.from(await res.arrayBuffer())
    )

    const { base64 } = await getPlaiceholder(buffer, { size: 10 })

    return {
        props: { blurDataURL: base64 },
    }
}

export default function Home({
    blurDataURL,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    return (
        <>
            <HeadComponent path="/" title="" />
            <Header blurDataURL={blurDataURL} />
            <div className="h-56 lg:h-64" />
            <IntroductionSection />
            <div className="h-56 lg:h-64" />
            <CareerSection />
            <div className="h-56 lg:h-64" />
            <HorizontalScroll />
            <div className="h-56 lg:h-64" />
            <Footer />
        </>
    )
}
