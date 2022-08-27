import { ContactMe } from '../components/sections/contact-me'
import { Footer } from '../components/footer'
import { AboutSection } from '../components/sections/about-section'
import { Seo } from '../components/seo'

export default function About() {
    return (
        <>
            <Seo path="/about" />
            <div className="h-36 lg:h-44" />
            <AboutSection />
            <div className="h-36 lg:h-44" />
            <ContactMe />
            <div className="h-36 lg:h-44" />
            <Footer />
        </>
    )
}
