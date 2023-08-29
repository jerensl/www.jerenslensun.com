import { ILink } from '@/types/links'
import {
    faAddressCard,
    faCopy,
    faFileCode,
    faHome,
} from '@fortawesome/free-solid-svg-icons'

export const pageLinks: Array<ILink> = [
    {
        name: 'Home',
        url: '/',
        icon: faHome,
    },
    {
        name: 'Blog',
        url: '/blog',
        icon: faCopy,
    },
    {
        name: 'Project',
        url: '/project',
        icon: faFileCode,
    },
    {
        name: 'About',
        url: '/about',
        icon: faAddressCard,
    },
]
