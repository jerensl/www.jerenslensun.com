import { StandardLink } from '../links/StandardLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodePullRequest } from '@fortawesome/free-solid-svg-icons'
import { faCircleDot } from '@fortawesome/free-regular-svg-icons'
import clsx from 'clsx'
import Card from './Card'

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
        <Card
            as="article"
            variant="elevated"
            className="h-72 mb-48 w-[450px] flex flex-col gap-2 p-4"
        >
            <h2 className="text-2xl font-sans font-bold">{organization}</h2>
            <h3 className="text-sm font-sans font-light">{project}</h3>
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
            <span className="font-light">{date}</span>
        </Card>
    )
}
