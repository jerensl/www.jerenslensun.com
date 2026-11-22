import { ContactMe } from '@/components/sections/ContactMe.section'
import { DiscordCommunity } from '@/components/sections/DiscordCommunity.section'
import { Footer } from '@/components/Footer'
import { AboutSection } from '@/components/sections/About.section'
import { personSchema } from '@/libs/seo'
import { HeadComponent } from '@/components/Seo'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

export const getStaticProps: GetStaticProps = async () => {
    const getCurrentYear = new Date().getFullYear()

    return {
        props: { currentYear: getCurrentYear },
    }
}

export default function About({
    currentYear,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <HeadComponent
                path="/about"
                title="About"
                description="Jerens Lensun is a software engineer contributing to Servo, the Rust browser engine, with experience in web-platform features, developer tooling, CI, and Playwright E2E testing at CNCF’s Meshery project."
                jsonLd={personSchema()}
            />
            <div className="mx-auto flex w-full max-w-content flex-col gap-16 px-4 pt-24 sm:px-6 md:pt-28 lg:gap-24 lg:px-8">
                <AboutSection />
                <DiscordCommunity />
                <ContactMe />
            </div>
            <div className="h-20 lg:h-32" />
            <Footer currentYear={currentYear} />
        </>
    )
}
