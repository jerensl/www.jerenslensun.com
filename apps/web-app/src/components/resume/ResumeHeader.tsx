import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faDownload,
    faEnvelope,
    faGlobe,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { resumeProfile } from '@/constant/resume'
import { trackEvent } from '@/libs/gtm'

export const ResumeHeader: React.FC = () => {
    const handleDownload = () => {
        trackEvent('resume_download', { source: 'resume_header' })
    }

    const handleContact = () => {
        trackEvent('contact_click', { source: 'resume_header' })
    }

    return (
        <header className="border-b border-outline-variant pb-6 print:border-gray-300">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="font-sans text-4xl font-bold tracking-tight print:text-black">
                        {resumeProfile.name}
                    </h1>
                    <p className="mt-1 text-lg font-medium text-on-surface-variant print:text-gray-700">
                        {resumeProfile.headline}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 print:hidden">
                    <a
                        href="/resume.pdf"
                        download
                        onClick={handleDownload}
                        className="inline-flex items-center gap-2 rounded-full border border-outline bg-surface px-5 py-2.5 text-base font-normal font-mono text-primary shadow-elevation-0 transition hover:bg-surface-container-low"
                    >
                        <FontAwesomeIcon icon={faDownload} className="block" />
                        Download PDF
                    </a>
                    <a
                        href={`mailto:${resumeProfile.email}?subject=Opportunity for ${resumeProfile.name}`}
                        onClick={handleContact}
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-base font-normal font-mono text-on-primary shadow-elevation-0 transition hover:bg-primary-container"
                    >
                        <FontAwesomeIcon icon={faEnvelope} className="block" />
                        Email me
                    </a>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-on-surface-variant print:text-gray-700">
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600 print:bg-black" />
                    {resumeProfile.availability}
                </span>
                <span>{resumeProfile.location}</span>
                <a
                    href={`mailto:${resumeProfile.email}`}
                    onClick={handleContact}
                    className="hover:text-primary"
                >
                    <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
                    {resumeProfile.email}
                </a>
                <a
                    href={resumeProfile.website}
                    className="hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faGlobe} className="mr-1" />
                    {resumeProfile.website.replace(/^https?:\/\//, '')}
                </a>
                <a
                    href="https://github.com/jerensl"
                    className="hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faGithub} className="mr-1" />
                    github.com/jerensl
                </a>
                <a
                    href="https://www.linkedin.com/in/jerensl/"
                    className="hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faLinkedin} className="mr-1" />
                    linkedin.com/in/jerensl
                </a>
            </div>
        </header>
    )
}
