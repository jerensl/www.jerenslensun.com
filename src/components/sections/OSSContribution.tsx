import React, { useRef } from 'react'
import { CareerCard } from '../cards/Contribution'
import { useScroll, useTransform, motion } from 'framer-motion'

const careers = [
    {
        organization: 'AsyncApi',
        project: 'Website',
        issue: 'v3 specification reference section not loading #3002',
        issue_url: 'https://github.com/asyncapi/website/issues/3002',
        pr: 'fix: v3 specification reference section not loading during dev mode #3004',
        pr_url: 'https://github.com/asyncapi/website/pull/3004',
        date: '31 May 2024',
        status: 'merged',
    },
    {
        organization: 'AsyncApi',
        project: 'Modelina',
        issue: 'Make Playground Mobile Responsive #1715',
        issue_url: 'https://github.com/asyncapi/modelina/issues/1715',
        pr: 'style(website): make Playground Mobile Responsive #2028',
        pr_url: 'https://github.com/asyncapi/modelina/pull/2028',
        date: '7 June 2024',
        status: 'merged',
    },
    {
        organization: 'AsyncApi',
        issue: 'Make Playground Mobile Responsive #1715',
        project: 'Modelina',
        issue_url:
            'https://github.com/asyncapi/modelina/pull/2028#discussion_r1632703345',
        pr: 'chore(website): configure eslint config similiar to asyncapi website #2031',
        pr_url: 'https://github.com/asyncapi/modelina/pull/2031',
        date: '10 June 2024',
        status: 'merged',
    },
    {
        organization: 'AsyncApi',
        project: 'Modelina',
        issue: '[Website] Broken OG images #1165',
        issue_url: 'https://github.com/asyncapi/modelina/issues/1165',
        pr: 'fix(website): fix broken open graph images #2065',
        pr_url: 'https://github.com/asyncapi/modelina/pull/2065',
        date: '1 July 2024',
        status: 'merged',
    },
]

export default function HorizontalScroll() {
    const targetRef = useRef<HTMLDivElement | null>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    const x = useTransform(scrollYProgress, [0, 1], ['40%', '-95%'])

    return (
        <section ref={targetRef} className="relative h-[300vh]">
            <div className="sticky top-10 bottom-20 flex h-[450px] items-center flex-col overflow-hidden">
                <h2 className="mt-20 text-center m-auto font-bold text-3xl">
                    Open Source Contribution
                </h2>
                <motion.div style={{ x }} className="flex gap-28 h-80 mt-14">
                    {careers?.map(
                        ({
                            organization,
                            project,
                            issue,
                            issue_url,
                            pr,
                            pr_url,
                            status,
                            date,
                        }) => {
                            return (
                                <CareerCard
                                    key={pr}
                                    organization={organization}
                                    project={project}
                                    issue={issue}
                                    issue_url={issue_url}
                                    pr={pr}
                                    pr_url={pr_url}
                                    status={status}
                                    date={date}
                                />
                            )
                        }
                    )}
                </motion.div>
            </div>
        </section>
    )
}
