import React, { useRef } from 'react'
import { CareerCard } from '../cards/Contribution'
import { useScroll, useTransform, motion } from 'motion/react'
import { Contributions } from '@/constant/contributions'

export default function HorizontalScroll() {
    const targetRef = useRef<HTMLDivElement | null>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    const x = useTransform(scrollYProgress, [0, 1], ['35%', '-95%'])

    return (
        <section ref={targetRef} className="relative h-[300vh]">
            <div className="sticky top-10 bottom-20 flex h-[450px] items-center flex-col overflow-hidden">
                <h2 className="mt-20 text-center m-auto font-bold text-3xl">
                    Open Source Contribution
                </h2>
                <motion.div style={{ x }} className="flex gap-28 h-80 mt-14">
                    {Contributions?.map(
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
