import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Footer } from '../components/footer'
import { Seo } from '../components/seo'
import { generateRss } from '../lib/rss'
import { getPlaiceholder } from 'plaiceholder'
import { Header } from '../components/header'
import { IntroductionSection } from '../components/sections/introduction-section'
import { CareerSection } from '../components/sections/career-section'
import Script from 'next/script'

export const getStaticProps: GetStaticProps = async () => {
    generateRss()

    const { base64 } = await getPlaiceholder(
        'https://ik.imagekit.io/jerensl/illustration-landing-page.png',
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
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=GTM-PKW49NT"
                strategy="afterInteractive"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PKW49NT');`,
                }}
            />
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
