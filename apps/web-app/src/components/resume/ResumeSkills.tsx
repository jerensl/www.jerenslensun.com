import * as React from 'react'
import { skillGroups } from '@/constant/resume'

export const ResumeSkills: React.FC = () => {
    return (
        <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {skillGroups.map((group) => (
                <div key={group.label}>
                    <dt className="font-mono text-xs font-semibold uppercase tracking-wide text-on-surface-variant print:text-gray-700">
                        {group.label}
                    </dt>
                    <dd className="mt-0.5 text-sm text-on-background print:text-gray-900">
                        {group.skills.join(' · ')}
                    </dd>
                </div>
            ))}
        </dl>
    )
}
