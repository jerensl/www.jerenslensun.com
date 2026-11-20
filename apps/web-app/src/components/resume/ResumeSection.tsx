import * as React from 'react'
import clsx from 'clsx'

interface ResumeSectionProps {
    title: string
    children: React.ReactNode
    className?: string
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
    title,
    children,
    className,
}) => {
    return (
        <section className={clsx('mt-8 first:mt-0 print:mt-5', className)}>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-primary print:text-black">
                {title}
            </h2>
            <div className="mt-3">{children}</div>
        </section>
    )
}
