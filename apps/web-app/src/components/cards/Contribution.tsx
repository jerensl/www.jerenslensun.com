import { StandardLink } from '../links/StandardLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodePullRequest } from '@fortawesome/free-solid-svg-icons'
import { faCircleDot } from '@fortawesome/free-regular-svg-icons'
import clsx from 'clsx'
import { motion } from 'motion/react'
import { Contribution } from '@/types/contributions'
import React from 'react'

export const CareerCard: React.FC<Contribution> = ({
    organization,
    project,
    focus,
    pr_number,
    pr_name,
    pr_url,
    issue_name,
    issue_number,
    issue_url,
    date,
    status,
}): React.ReactElement => {
    return (
        <motion.article
            className="bg-surface-container-low shadow-elevation-1 rounded-medium hover:bg-on-surface/8 active:bg-on-surface/12 w-[450px] flex flex-col gap-2 p-4"
            initial={{ opacity: 0 }}
            whileInView={{
                opacity: 1,
            }}
            viewport={{
                margin: '-200px',
            }}
        >
            <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl font-sans font-bold">{organization}</h2>
                {focus ? (
                    <span className="mt-1 whitespace-nowrap rounded-full border border-outline-variant px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-on-surface-variant">
                        {focus}
                    </span>
                ) : null}
            </div>
            <h3 className="text-sm font-sans font-light mt-2">{project}</h3>
            {issue_name && issue_number && issue_url ? (
                <h4 className="text-sm font-normal">
                    <span>
                        <FontAwesomeIcon
                            className={clsx('block', {
                                'text-purple-600': status === 'merged',
                                'text-green-600': status === 'open',
                            })}
                            icon={faCircleDot}
                        />{' '}
                    </span>{' '}
                    {issue_name}{' '}
                    <StandardLink
                        href={issue_url}
                        isExternal
                        className="text-sm font-normal text-primary hover:cursor-pointer"
                    >
                        #{issue_number}
                    </StandardLink>
                </h4>
            ) : null}
            <h4 className="text-sm font-normal">
                <span>
                    <FontAwesomeIcon
                        className={clsx('block', {
                            'text-purple-600': status === 'merged',
                            'text-green-600': status === 'open',
                        })}
                        icon={faCodePullRequest}
                    />{' '}
                </span>
                {pr_name}{' '}
                <StandardLink
                    href={pr_url}
                    isExternal
                    className="text-sm font-normal"
                >
                    #{pr_number}
                </StandardLink>
            </h4>
            <span className="font-light mt-auto pt-8">{date}</span>
        </motion.article>
    )
}
