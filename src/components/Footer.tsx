import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faGithubSquare,
    faTwitterSquare,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { faRssSquare } from '@fortawesome/free-solid-svg-icons'
import { LinkURL } from './LinkURL'

export const Footer = (): React.ReactElement => {
    return (
        <footer className="grid justify-center h-1/10 place-items-center text-center shadow-inner dark:border-t-2 dark:border-gray-50 md:px-10 md:flex md:flex-row md:justify-between">
            <div className="flex space-x-6 h-10 py-1">
                <LinkURL href="https://github.com/jerensl">
                    <FontAwesomeIcon
                        className="hover:text-red-600 cursor-pointer"
                        icon={faGithubSquare}
                        size="2x"
                    />
                </LinkURL>
                <LinkURL href="https://twitter.com/jerensl22">
                    <FontAwesomeIcon
                        className="hover:text-red-600 cursor-pointer"
                        icon={faTwitterSquare}
                        size="2x"
                    />
                </LinkURL>
                <LinkURL href="https://www.linkedin.com/in/jerensl/">
                    <FontAwesomeIcon
                        className="hover:text-red-600 cursor-pointer"
                        icon={faLinkedin}
                        size="2x"
                    />
                </LinkURL>
                <LinkURL href="https://www.jerenslensun.com/rss.xml">
                    <FontAwesomeIcon
                        className="hover:text-red-600 cursor-pointer"
                        icon={faRssSquare}
                        size="2x"
                    />
                </LinkURL>
            </div>
            <p>
                © {new Date().getFullYear()} Jerens Lensun. All Rights Reserved.
            </p>
        </footer>
    )
}
