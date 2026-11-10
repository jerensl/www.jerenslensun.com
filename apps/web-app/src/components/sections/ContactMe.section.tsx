import React from 'react'
import { Grid } from '../Grid'
import { Navigation } from '../links/Navigation'

export const ContactMe = (): React.ReactElement => {
    return (
        <Grid
            rowGap
            as="footer"
            className="bg-surface-container-low py-10 px-6 md:px-10 rounded-2xl"
        >
            <div className="col-span-full text-center lg:text-left lg:col-span-10">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                    Contact
                </p>
                <h1 className="mt-2 text-2xl font-bold">
                    {`Let's`} work together
                </h1>
                <p className="mt-2">Tell me a bit about your needs.</p>
            </div>
            <div className="m-auto col-span-2">
                <Navigation
                    href="mailto:jerensslensun@gmail.com"
                    label="Contact me"
                    variant="filled"
                    size="large"
                />
            </div>
        </Grid>
    )
}
