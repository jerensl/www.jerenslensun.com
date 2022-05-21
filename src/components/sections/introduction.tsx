import * as React from 'react'
import { InView } from 'react-intersection-observer'
import { Grid } from '../Grid'
import clsx from 'clsx'

export const IntroductionSection = (): React.ReactElement => {
    return (
        <InView triggerOnce rootMargin="-30% 0px">
            {({ inView, ref }) => (
                <Grid
                    ref={ref}
                    className={clsx('pt-20 gap-10', inView && 'fade-in-start')}
                >
                    <div className="col-span-full lg:col-span-6">
                        <h2
                            data-fade="0"
                            className="text-5xl lg:text-6xl font-bold text-gray-800"
                        >
                            Hi Folks...
                        </h2>
                        <h2
                            data-fade="1"
                            className="text-4xl lg:text-5xl mt-3 font-bold text-gray-900"
                        >
                            Let me introduce myself
                        </h2>
                    </div>
                    <div
                        className="col-span-full lg:col-span-6 lg:col-start-7"
                        data-fade="2"
                    >
                        <h2 className="text-3xl font-bold text-gray-800">{`I'm Jerens S. Lensun`}</h2>
                        <p className="text-base mt-5">
                            My area of focus lies in architectural design and
                            building products as well as web development and
                            backend. I enjoy designing and building a
                            distributed system and can be used by a lot of
                            users.
                        </p>
                        <p className="text-base mt-5">
                            Currently studied Electrical Engineering at the
                            University of Sam Ratulangi based on Manado,
                            minoring in control system, during my college I
                            involve in leading a project, being an assistant
                            practicum as well as coordinator assistant too, etc.
                            But outside that, I consider myself a builder so{' '}
                            {`I'm`} building my side project for fun, and one of
                            them is this blog.
                        </p>
                    </div>
                </Grid>
            )}
        </InView>
    )
}
