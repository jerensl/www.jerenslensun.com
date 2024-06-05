import { app, siteMetadata } from '@/constant/seo'
import Head from 'next/head'

interface IArticleSeo {
    title: string
    description: string
    path: string
    image: string
}

export const ArticleSeo: React.FC<IArticleSeo> = ({
    title,
    description,
    path,
    image,
}) => {
    const currTitle = title ? `${title} | ${app.title}` : app.title

    return (
        <>
            <Head>
                <title>{`${currTitle}`}</title>
                <meta name="robots" content="follow, index" />
                <meta name="description" content={description} />
                <meta
                    property="og:url"
                    content={`${siteMetadata.url}${path}`}
                />
                <meta property="og:title" content={currTitle} />
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
        </>
    )
}

interface PageSeo {
    title: string
    path: string
}

export const Seo: React.FC<PageSeo> = ({ title, path }) => {
    const currTitle = title ? `${title} | ${app.title}` : app.title

    return (
        <>
            <Head>
                <title>{`${currTitle}`}</title>
                <meta name="robots" content="follow, index" />
                <meta name="description" content={app.description} />
                <meta
                    property="og:url"
                    content={`${siteMetadata.url}${path}`}
                />
                <meta property="og:title" content={currTitle} />
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
        </>
    )
}
