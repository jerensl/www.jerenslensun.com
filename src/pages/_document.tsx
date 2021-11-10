import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/github-dark.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css"
                    integrity="sha384-RZU/ijkSsFbcmivfdRBQDtwuwVqK7GMOw6IMvKyeWL2K5UAlyp6WonmB8m7Jd0Hn"
                    crossOrigin="anonymous"
                />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
