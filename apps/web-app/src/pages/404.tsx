import Link from 'next/link'
import { HeadComponent } from '@/components/Seo'
import { Grid } from '@/components/Grid'
import { Navigation } from '@/components/links/Navigation'

export default function Custom404() {
    return (
        <>
            <HeadComponent path="/404" title="Not Found" noIndex />
            <Grid as="main" className="min-h-svh items-center py-24">
                <div className="col-span-full flex flex-col items-center gap-6 text-center">
                    <p
                        aria-hidden="true"
                        className="text-[clamp(5rem,18vw,10rem)] font-medium leading-none tracking-[-0.04em] text-primary-container"
                    >
                        404
                    </p>
                    <h1 className="text-display-small font-medium md:text-display-medium">
                        404 - Page Not Found
                    </h1>
                    <p className="max-w-md text-body-large text-on-surface-variant">
                        The page you&apos;re looking for doesn&apos;t exist or
                        has moved.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <Navigation
                            href="/"
                            variant="filled"
                            label="Back to home"
                            size="large"
                        />
                        <Link
                            href="/blog"
                            className="md-state-layer inline-flex h-12 items-center rounded-full border border-outline px-6 text-label-large text-primary no-underline"
                        >
                            Read the blog
                        </Link>
                    </div>
                </div>
            </Grid>
        </>
    )
}
