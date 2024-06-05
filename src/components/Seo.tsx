import { app, siteMetadata } from '@/constant/seo'
import Head from 'next/head'
import Script from 'next/script'

export const ArticleSeo = ({
    title,
    description,
    path,
    image,
}: BlogPostSeoProps) => {
    return (
        <>
            <Head>
                <title>{`${title}`}</title>
                <meta name="robots" content="follow, index" />
                <meta name="description" content={description} />
                <meta
                    property="og:url"
                    content={`${siteMetadata.url}${path}`}
                />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:site_name" content={app.name} />
                <meta property="og:type" content="website" />
                <meta name="image" property="og:image" content={image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content={siteMetadata.twitter} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />
            </Head>
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
        </>
    )
}

interface PageSeo {
    path: string
}

export const Seo = ({ path }: PageSeo) => {
    return (
        <>
            <Head>
                <title>{`${app.title}`}</title>
                <meta name="robots" content="follow, index" />
                <meta name="description" content={app.description} />
                <meta
                    property="og:url"
                    content={`${siteMetadata.url}${path}`}
                />
                <meta property="og:title" content={app.title} />
                <meta property="og:description" content={app.description} />
                <meta property="og:site_name" content={app.name} />
                <meta property="og:type" content="website" />
                <meta name="image" property="og:image" content={app.image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content={siteMetadata.twitter} />
                <meta name="twitter:title" content={app.title} />
                <meta name="twitter:description" content={app.description} />
                <meta name="twitter:image" content={app.image} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
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
        </>
    )
}
