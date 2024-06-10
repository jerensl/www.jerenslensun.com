import { ContactMe } from '@/components/sections/ContactMe.section'
import { Footer } from '@/components/Footer'
import { AboutSection } from '@/components/sections/About.section'
import { HeadComponent } from '@/components/Seo'

export default function About() {
    return (
        <>
            <HeadComponent path="/about" title="About" />
            <div className="h-36 lg:h-44" />
            <AboutSection />
            <div className="h-36 lg:h-44" />
            <ContactMe />
            <div className="h-36 lg:h-44" />
            <Footer />
        </>
    )
}
