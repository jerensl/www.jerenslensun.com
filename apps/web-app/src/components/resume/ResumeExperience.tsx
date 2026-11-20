import * as React from 'react'
import { Careers } from '@/constant/career'

export const ResumeExperience: React.FC = () => {
    return (
        <ol className="space-y-5">
            {Careers.map((career) => {
                const bullets =
                    career.highlights && career.highlights.length > 0
                        ? career.highlights
                        : [career.summary]

                return (
                    <li key={career.organization}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                            <h3 className="font-sans text-lg font-semibold print:text-black">
                                {career.role}
                            </h3>
                            <p className="font-mono text-xs text-on-surface-variant print:text-gray-700">
                                {career.startDate} – {career.endDate}
                            </p>
                        </div>
                        <p className="mt-0.5 text-sm font-medium text-on-surface-variant print:text-gray-700">
                            {career.organization}
                            {career.location ? ` · ${career.location}` : ''}
                        </p>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-on-background print:text-gray-900">
                            {bullets.map((bullet, index) => (
                                <li key={index}>{bullet}</li>
                            ))}
                        </ul>
                        {career.tech && career.tech.length > 0 ? (
                            <p className="mt-2 font-mono text-xs text-on-surface-variant print:text-gray-700">
                                Tech: {career.tech.join(' · ')}
                            </p>
                        ) : null}
                    </li>
                )
            })}
        </ol>
    )
}
