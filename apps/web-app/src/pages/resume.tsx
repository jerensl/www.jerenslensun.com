import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Footer } from '@/components/Footer'
import { HeadComponent } from '@/components/Seo'
import { ResumeHeader } from '@/components/resume/ResumeHeader'
import { ResumeSection } from '@/components/resume/ResumeSection'
import { ResumeExperience } from '@/components/resume/ResumeExperience'
import { ResumeSkills } from '@/components/resume/ResumeSkills'
import { ResumeProjects } from '@/components/resume/ResumeProjects'
import { ContactMe } from '@/components/sections/ContactMe.section'
import { getContents } from '@/libs/content'
import {
    getMergedServoPRCount,
    getMergedMesheryEcosystemPRCount,
} from '@/libs/github'
import { buildImpactHighlights } from '@/libs/resume'
import { profilePageSchema } from '@/libs/seo'
import {
    resumeProfile,
    resumeSummary,
    featuredProjectSlugs,
    education,
    resumeLastUpdated,
    type IResumeProject,
} from '@/constant/resume'
import type { IProjectMetadata } from '@/types/content'

interface ResumePageProps {
    projects: IResumeProject[]
    highlights: string[]
    currentYear: number
}

export const getStaticProps: GetStaticProps<ResumePageProps> = async () => {
    const [projects, servoMergedPRs, mesheryMergedPRs] = await Promise.all([
        getContents<IProjectMetadata>('project'),
        getMergedServoPRCount(),
        getMergedMesheryEcosystemPRCount(),
    ])

    const projectBySlug = new Map(
        projects
            .filter(
                (project): project is IProjectMetadata & { slug: string } =>
                    typeof project.slug === 'string'
            )
            .map((project) => [project.slug, project])
    )

    const featuredProjects: IResumeProject[] = featuredProjectSlugs
        .map((slug) => projectBySlug.get(slug))
        .filter(
            (project): project is IProjectMetadata & { slug: string } =>
                typeof project?.slug === 'string'
        )
        .map((project) => ({
            slug: project.slug,
            title: project.title,
            description: project.description,
            tags: Array.isArray(project.programming_languange)
                ? project.programming_languange
                : [],
        }))

    const highlights = buildImpactHighlights({
        servoMergedPRs,
        mesheryMergedPRs,
    })

    return {
        props: {
            projects: featuredProjects,
            highlights,
            currentYear: new Date().getFullYear(),
        },
    }
}

export default function Resume({
    projects,
    highlights,
    currentYear,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <HeadComponent
                path="/resume"
                title="Resume"
                description="Resume of Jerens Lensun, a software engineer contributing to Servo, the Rust browser engine, with experience in browser internals, developer tooling, CI, and Playwright end-to-end testing."
                jsonLd={profilePageSchema()}
            />
            <article className="mx-auto w-full max-w-3xl px-6 pt-28 pb-16 font-sans print:max-w-none print:px-0 print:pt-0 print:pb-0">
                <ResumeHeader />
                <ResumeSection title="Summary">
                    <p className="text-base leading-relaxed text-on-background print:text-gray-900">
                        {resumeSummary}
                    </p>
                </ResumeSection>
                <ResumeSection title="Impact">
                    <ul className="list-disc space-y-1.5 pl-5 text-sm text-on-background print:text-gray-900">
                        {highlights.map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                        ))}
                    </ul>
                </ResumeSection>
                <ResumeSection title="Experience">
                    <ResumeExperience />
                </ResumeSection>
                <ResumeSection title="Skills">
                    <ResumeSkills />
                </ResumeSection>
                <ResumeSection title="Selected work">
                    <ResumeProjects projects={projects} />
                </ResumeSection>
                {education.length > 0 ? (
                    <ResumeSection title="Education">
                        <ul className="space-y-3">
                            {education.map((item, index) => (
                                <li key={index}>
                                    <h3 className="font-sans font-semibold print:text-black">
                                        {item.credential}
                                    </h3>
                                    <p className="text-sm text-on-surface-variant print:text-gray-700">
                                        {item.institution}
                                        {item.location
                                            ? ` · ${item.location}`
                                            : ''}
                                        {' · '}
                                        {item.period}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </ResumeSection>
                ) : null}
                <ResumeSection title="Community">
                    <ul className="list-disc space-y-1.5 pl-5 text-sm text-on-background print:text-gray-900">
                        <li>
                            Outreachy alum — improved Servo’s lint and
                            type-check pipeline.
                        </li>
                        <li>
                            LFX Mentee (CNCF) — Meshery Playwright end-to-end
                            testing, 2024 Term 3.
                        </li>
                        <li>
                            Open-source contributor to Servo, Meshery, and
                            AsyncAPI.
                        </li>
                    </ul>
                </ResumeSection>
                <div className="mt-10 flex flex-wrap gap-2 print:hidden">
                    <a
                        href="/resume.pdf"
                        download
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-base font-normal font-mono text-on-primary shadow-elevation-0 transition hover:bg-primary-container"
                    >
                        Download PDF
                    </a>
                    <a
                        href={`mailto:${resumeProfile.email}?subject=Opportunity for ${resumeProfile.name}`}
                        className="inline-flex items-center gap-2 rounded-full border border-outline bg-surface px-5 py-2.5 text-base font-normal font-mono text-primary shadow-elevation-0 transition hover:bg-surface-container-low"
                    >
                        Email me
                    </a>
                </div>
                <p className="mt-6 font-mono text-xs text-on-surface-variant print:text-gray-700">
                    Last updated {resumeLastUpdated}
                </p>
            </article>
            <div className="print:hidden">
                <ContactMe />
                <div className="h-36 lg:h-44" />
                <Footer currentYear={String(currentYear)} />
            </div>
        </>
    )
}
