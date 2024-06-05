import { ContactMe } from '@/components/sections/ContactMe.section'
import { Footer } from '@/components/Footer'
import { AboutSection } from '@/components/sections/About.section'
import { Seo } from '@/components/Seo'

export default function About() {
    return (
        <>
            <Seo path="/about" title="About" />
            <div className="h-36 lg:h-44" />
            <AboutSection />
            <div className="h-36 lg:h-44" />
            <ContactMe />
            <div className="h-36 lg:h-44" />
            <Footer />
        </>
    )
}
