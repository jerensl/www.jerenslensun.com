import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from 'next/document'

const APP_NAME = 'Jerens App'
const APP_DESCRIPTION =
    "Hi I'm Jerens Lensun this web app will cover topics such as designing good software especially on web development and backend"

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="en-US">
                <Head>
                    <meta name="application-name" content={APP_NAME} />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta
                        name="apple-mobile-web-app-status-bar-style"
                        content="default"
                    />
                    <meta
                        name="apple-mobile-web-app-title"
                        content={APP_NAME}
                    />
                    <meta name="description" content={APP_DESCRIPTION} />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="theme-color" content="#FFFFFF" />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/icons/apple-touch-icon.png"
                    />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <link rel="manifest" href="/manifest.json" />
                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css"
                        integrity="sha384-RZU/ijkSsFbcmivfdRBQDtwuwVqK7GMOw6IMvKyeWL2K5UAlyp6WonmB8m7Jd0Hn"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="anonymous"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
