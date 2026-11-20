import * as React from 'react'
import Link from 'next/link'
import type { IResumeProject } from '@/constant/resume'

interface ResumeProjectsProps {
    projects: IResumeProject[]
}

export const ResumeProjects: React.FC<ResumeProjectsProps> = ({ projects }) => {
    if (projects.length === 0) {
        return (
            <p className="text-sm text-on-surface-variant">
                Selected case studies are available on the project page.
            </p>
        )
    }

    return (
        <ul className="space-y-4">
            {projects.map((project) => (
                <li key={project.slug}>
                    <Link
                        href={`/project/${project.slug}`}
                        className="font-sans text-base font-semibold text-primary hover:underline"
                    >
                        {project.title}
                    </Link>
                    <p className="mt-0.5 text-sm text-on-background print:text-gray-900">
                        {project.description}
                    </p>
                    {project.tags.length > 0 ? (
                        <p className="mt-1 font-mono text-xs text-on-surface-variant print:text-gray-700">
                            {project.tags.join(' · ')}
                        </p>
                    ) : null}
                </li>
            ))}
        </ul>
    )
}
