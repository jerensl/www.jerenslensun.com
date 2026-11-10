import React from 'react'
import { Grid } from '../Grid'
import { Navigation } from '../links/Navigation'

export const DiscordCommunity = (): React.ReactElement => {
    return (
        <Grid rowGap as="section" className="bg-surface-container-low py-10 px-6 md:px-10 rounded-2xl">
            <div className="col-span-full text-center lg:text-left lg:col-span-7">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                    Community
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                    Join my Discord community
                </h2>
                <p className="mt-3 text-base">
                    Whether you&apos;re into open source, Rust, the web platform,
                    or just gaming, come hang out with me and other members. Ask
                    questions, share what you&apos;re building or playing, and
                    stay engaged with my latest work and projects.
                </p>
                <ul className="mt-4 flex flex-col gap-2 text-sm">
                    <li>💬 Ask questions and get help</li>
                    <li>🎮 Gaming and casual hangouts</li>
                    <li>🚀 Early updates on new content and projects</li>
                    <li>🤝 Connect with like-minded developers and gamers</li>
                </ul>
            </div>
            <div className="m-auto col-span-full lg:col-span-5 flex flex-col items-center gap-3">
                <Navigation
                    href="https://discord.gg/fJfwVrgRa"
                    label="Join Discord for free"
                    variant="filled"
                    size="large"
                    isExternal
                />
                <span className="text-xs text-on-surface-variant">
                    Free to join · No spam
                </span>
            </div>
        </Grid>
    )
}

export default DiscordCommunity
