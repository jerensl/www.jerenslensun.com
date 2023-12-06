import Link from 'next/link'
import React from 'react'
import { Grid } from '../Grid'
import { LinkButton } from '../links/LinkButton'

export const ContactMe = (): React.ReactElement => {
    return (
        <Grid rowGap as="footer" className="">
            <div className="col-span-full text-center lg:text-left lg:col-span-10">
                <h1 className="text-2xl font-bold">{`Let's`} work together</h1>
                <p>Tell me a bit about your needs.</p>
            </div>
            <div className="m-auto col-span-2">
                <LinkButton
                    href="mailto:jerensslensun@gmail.com"
                    label="Contact me"
                    variant="filled"
                    size="large"
                />
            </div>
        </Grid>
    )
}
