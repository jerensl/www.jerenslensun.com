import { HeadComponent } from '@/components/Seo'

export default function Custom404() {
    return (
        <>
            <HeadComponent path="/" title="Not Found" />
            <div className="min-h-full-screen">
                <h1 className="pt-40 font-bold text-3xl text-center">
                    404 - Page Not Found
                </h1>
            </div>
        </>
    )
}
