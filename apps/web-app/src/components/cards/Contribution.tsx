import { StandardLink } from '../links/StandardLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodePullRequest } from '@fortawesome/free-solid-svg-icons'
import { faCircleDot } from '@fortawesome/free-regular-svg-icons'
import clsx from 'clsx'
import { motion } from 'motion/react'
import { Contribution } from '@/types/contributions'
import React from 'react'

/**
 * M3 filled card used in the horizontal contribution rail.
 */
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
    const statusColor =
        status === 'merged'
            ? 'text-tertiary'
            : status === 'open'
              ? 'text-primary'
              : 'text-on-surface-variant'

    return (
        <motion.article
            className="flex w-[min(22rem,85vw)] shrink-0 flex-col gap-2 rounded-lg bg-surface-container-high p-5 transition-shadow duration-200 ease-emphasized hover:shadow-elevation-2"
            initial={{ opacity: 0 }}
            whileInView={{
                opacity: 1,
            }}
            viewport={{
                margin: '-200px',
            }}
        >
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-title-large font-medium text-on-surface">
                    {organization}
                </h3>
                {focus ? (
                    <span className="mt-0.5 whitespace-nowrap rounded-sm bg-secondary-container px-2 py-0.5 text-label-small uppercase tracking-wider text-on-secondary-container">
                        {focus}
                    </span>
                ) : null}
            </div>
            <p className="text-body-medium text-on-surface-variant">
                {project}
            </p>

            {issue_name && issue_number && issue_url ? (
                <p className="mt-1 flex items-start gap-2 text-body-medium text-on-surface-variant">
                    <FontAwesomeIcon
                        className={clsx('mt-1 size-3.5 shrink-0', statusColor)}
                        icon={faCircleDot}
                        aria-hidden="true"
                    />
                    <span>
                        {issue_name}{' '}
                        <StandardLink
                            href={issue_url}
                            isExternal
                            className="font-medium"
                        >
                            #{issue_number}
                        </StandardLink>
                    </span>
                </p>
            ) : null}

            <p className="flex items-start gap-2 text-body-medium text-on-surface-variant">
                <FontAwesomeIcon
                    className={clsx('mt-1 size-3.5 shrink-0', statusColor)}
                    icon={faCodePullRequest}
                    aria-hidden="true"
                />
                <span>
                    {pr_name}{' '}
                    <StandardLink
                        href={pr_url}
                        isExternal
                        className="font-medium"
                    >
                        #{pr_number}
                    </StandardLink>
                </span>
            </p>

            <span className="mt-auto pt-6 text-label-medium text-on-surface-variant">
                {date}
            </span>
        </motion.article>
    )
}
