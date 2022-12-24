import Link from 'next/link'
import React from 'react'
import { Grid } from '../Grid'

export const ContactMe = (): React.ReactElement => {
    return (
        <Grid rowGap>
            <div className="col-span-full text-center lg:text-left lg:col-span-10">
                <h1 className="text-2xl font-bold">{`Let's`} work together</h1>
                <p>Tell me a bit about your needs.</p>
            </div>
            <Link
                href="mailto:jerensslensun@gmail.com"
                className="col-span-full lg:col-span-2 rounded-md text-white bg-blue-600 font-medium text-lg hover:bg-blue-500 m-auto p-3"
            >
                Contact Me
            </Link>
        </Grid>
    )
}
