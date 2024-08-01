import { StandardLink } from '../links/StandardLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodePullRequest } from '@fortawesome/free-solid-svg-icons'
import { faCircleDot } from '@fortawesome/free-regular-svg-icons'
import clsx from 'clsx'
import { motion } from 'framer-motion'

interface CareerCardProps {
    organization: string
    project: string
    pr: string
    pr_url: string
    issue: string
    issue_url: string
    date: string
    status: string
}

export const CareerCard: React.FC<CareerCardProps> = ({
    organization,
    project,
    pr,
    pr_url,
    issue,
    issue_url,
    date,
    status,
}): React.ReactElement => {
    return (
        <motion.article
            className="bg-surface-container-low shadow-elevation-1 rounded-medium hover:bg-on-surface/8 active:bg-on-surface/12 first-letter:min-h-20 w-[450px] flex flex-col gap-2 p-4"
            initial={{ opacity: 0 }}
            whileInView={{
                opacity: 1,
            }}
            viewport={{
                margin: '-200px',
            }}
        >
            <h2 className="text-2xl font-sans font-bold">{organization}</h2>
            <h3 className="text-sm font-sans font-light mt-4">{project}</h3>
            <StandardLink
                href={issue_url}
                isExternal
                className="text-sm font-normal"
            >
                <span>
                    <FontAwesomeIcon
                        className={clsx('block', {
                            'text-purple-600': status === 'merged',
                            'text-green-600': status === 'open',
                        })}
                        icon={faCircleDot}
                    />
                </span>{' '}
                {issue}
            </StandardLink>
            <StandardLink
                href={pr_url}
                isExternal
                className="text-sm font-normal"
            >
                <span>
                    <FontAwesomeIcon
                        className={clsx('block', {
                            'text-purple-600': status === 'merged',
                            'text-green-600': status === 'open',
                        })}
                        icon={faCodePullRequest}
                    />
                </span>{' '}
                {pr}
            </StandardLink>
            <span className="font-light mt-12">{date}</span>
        </motion.article>
    )
}
