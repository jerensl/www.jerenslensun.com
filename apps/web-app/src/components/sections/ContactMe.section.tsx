import React from 'react'
import { Grid } from '../Grid'
import { Navigation } from '../links/Navigation'

export const ContactMe = (): React.ReactElement => {
    return (
        <Grid as="section">
            <div className="col-span-full overflow-hidden rounded-xl bg-surface-container-low px-6 py-12 md:px-12">
                <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-label-large uppercase tracking-[0.14em] text-primary">
                            Contact
                        </p>
                        <h2 className="mt-2 text-display-small font-medium text-on-surface">
                            {`Let's`} work together
                        </h2>
                        <p className="mt-3 text-body-large text-on-surface-variant">
                            Tell me a bit about your needs — browser engines,
                            developer tooling, or web-platform work.
                        </p>
                    </div>
                    <Navigation
                        href="mailto:jerensslensun@gmail.com"
                        label="Contact me"
                        variant="filled"
                        size="large"
                    />
                </div>
            </div>
        </Grid>
    )
}
