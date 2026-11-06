import { ContactMe } from '@/components/sections/ContactMe.section'
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
                description="Jerens Lensun is a software engineer working in the open source ecosystem, focused on developer tooling, CI/CD, and building systems that last."
                jsonLd={personSchema()}
            />
            <div className="h-36 lg:h-44" />
            <AboutSection />
            <div className="h-36 lg:h-44" />
            <ContactMe />
            <div className="h-36 lg:h-44" />
            <Footer currentYear={currentYear} />
        </>
    )
}
