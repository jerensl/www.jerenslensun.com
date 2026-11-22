import React from 'react'
import { Grid } from '../Grid'
import { Navigation } from '../links/Navigation'

const perks = [
    'Ask questions and get help',
    'Gaming and casual hangouts',
    'Early updates on new content and projects',
    'Connect with like-minded developers and gamers',
]

export const DiscordCommunity = (): React.ReactElement => {
    return (
        <Grid as="section">
            <div className="col-span-full grid gap-10 overflow-hidden rounded-xl bg-surface-container-low px-6 py-12 md:px-12 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                    <p className="text-label-large uppercase tracking-[0.14em] text-primary">
                        Community
                    </p>
                    <h2 className="mt-2 text-display-small font-medium">
                        Join my Discord community
                    </h2>
                    <p className="mt-3 max-w-2xl text-body-large text-on-surface-variant">
                        Whether you&apos;re into open source, Rust, the web
                        platform, or just gaming, come hang out with me and
                        other members. Ask questions, share what you&apos;re
                        building or playing, and stay engaged with my latest
                        work and projects.
                    </p>
                    <ul className="mt-5 flex flex-col gap-2 text-body-medium text-on-surface-variant">
                        {perks.map((perk) => (
                            <li key={perk} className="flex items-start gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="mt-0.5 size-4 shrink-0 text-primary"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m4.5 12.75 6 6 9-13.5"
                                    />
                                </svg>
                                {perk}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col items-start gap-3 lg:col-span-5 lg:items-center">
                    <Navigation
                        href="https://discord.gg/fJfwVrgRa"
                        label="Join Discord for free"
                        variant="filled"
                        size="large"
                        isExternal
                    />
                    <span className="text-label-medium text-on-surface-variant">
                        Free to join · No spam
                    </span>
                </div>
            </div>
        </Grid>
    )
}

export default DiscordCommunity
