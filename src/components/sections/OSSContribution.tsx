import React, { useRef } from 'react'
import { CareerCard } from '../cards/Contribution'
import { useScroll, useTransform, motion } from 'motion/react'

const careers = [
    {
        organization: 'AsyncApi',
        project: 'Website',
        issue_name: 'v3 specification reference section not loading',
        issue_number: '3002',
        issue_url: 'https://github.com/asyncapi/website/issues/3002',
        pr_name:
            'fix: v3 specification reference section not loading during dev mode',
        pr_number: '3004',
        pr_url: 'https://github.com/asyncapi/website/pull/3004',
        date: '31 May 2024',
        status: 'merged',
    },
    {
        organization: 'AsyncApi',
        project: 'Modelina',
        issue_name: 'Make Playground Mobile Responsive',
        issue_number: '1715',
        issue_url: 'https://github.com/asyncapi/modelina/issues/1715',
        pr_name: 'style(website): make Playground Mobile Responsive',
        pr_number: '2028',
        pr_url: 'https://github.com/asyncapi/modelina/pull/2028',
        date: '7 June 2024',
        status: 'merged',
    },
    {
        organization: 'AsyncApi',
        issue_name: 'Make Playground Mobile Responsive',
        issue_number: '1715',
        project: 'Modelina',
        issue_url:
            'https://github.com/asyncapi/modelina/pull/2028#discussion_r1632703345',
        pr_name:
            'chore(website): configure eslint config similiar to asyncapi website',
        pr_number: '2031',
        pr_url: 'https://github.com/asyncapi/modelina/pull/2031',
        date: '10 June 2024',
        status: 'merged',
    },
    {
        organization: 'AsyncApi',
        project: 'Modelina',
        issue_name: '[Website] Broken OG images',
        issue_number: '1165',
        issue_url: 'https://github.com/asyncapi/modelina/issues/1165',
        pr_name: 'fix(website): fix broken open graph images',
        pr_number: '2065',
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
                            issue_name,
                            issue_number,
                            issue_url,
                            pr_name,
                            pr_number,
                            pr_url,
                            status,
                            date,
                        }) => {
                            return (
                                <CareerCard
                                    key={pr_name}
                                    organization={organization}
                                    project={project}
                                    issue_name={issue_name}
                                    issue_number={issue_number}
                                    issue_url={issue_url}
                                    pr_name={pr_name}
                                    pr_number={pr_number}
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
