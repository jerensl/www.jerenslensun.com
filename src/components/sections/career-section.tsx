import * as React from 'react'
import { Grid } from '../Grid'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { CareerCard } from '../career-card'

export const CareerSection = (): React.ReactElement => {
    return (
        <Grid className="gap-5 lg:gap-8">
            <div className="col-span-full lg:col-span-9">
                <h1 className="text-5xl font-bold text-center md:text-left">
                    Career
                </h1>
            </div>
            <div className="col-span-full lg:col-span-3">
                <a
                    href="https://drive.google.com/file/d/17cKewjUgjQomJ32VMxaWo1oigN-v1eqe/view?usp=sharing"
                    target="_blank"
                    className="inline-flex font-semibold items-center gap-3 text-2xl py-2 px-4 rounded-lg border-b-2 transition duration-150 ease-in-out hover:bg-gray-50 border-gray-100 hover:border-gray-300"
                    rel="noopener noreferrer"
                >
                    <span>Get My CV</span>
                    <FontAwesomeIcon className="block" icon={faFile} />
                </a>
            </div>
            <CareerCard
                organization="Ministry of Tourism"
                role="Facilitator"
                date="October 2020 – November 2020"
            />

            <CareerCard
                organization="Bangkit Academy 2022"
                role="Facilitator"
                date="February 2022 – Present"
            />
        </Grid>
    )
}
