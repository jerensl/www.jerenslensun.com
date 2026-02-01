import { ILink } from '@/types/links'
import {
    faGithubSquare,
    faInstagram,
    faLinkedin,
    faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons'
import { faRssSquare } from '@fortawesome/free-solid-svg-icons'

export const socialMediaLinks: Array<ILink> = [
    {
        name: 'Twitter',
        url: 'https://twitter.com/jerensl22',
        icon: faTwitterSquare,
    },
    {
        name: ' Instagram',
        url: 'http://instagram.com/jerensl',
        icon: faInstagram,
    },
    {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/jerensl/',
        icon: faLinkedin,
    },
    {
        name: 'Github',
        url: 'https://github.com/jerensl',
        icon: faGithubSquare,
    },
    {
        name: 'RSS',
        url: '/rss.xml',
        icon: faRssSquare,
    },
]
