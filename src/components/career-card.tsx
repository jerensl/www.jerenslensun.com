import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'

export const CareerCard = ({
    organization,
    date,
    role,
}): React.ReactElement => {
    return (
        <div
            key={organization}
            className="col-span-full md:col-span-4 lg:col-span-3 p-2 "
        >
            <h3 className="text-xl font-bold">{organization}</h3>
            <p>{role}</p>
            <span className="font-light pt-2">{date}</span>
        </div>
    )
}
