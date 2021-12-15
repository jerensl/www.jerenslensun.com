import { Navbar } from '../components/Navbar'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { Footer } from '../components/Footer'
import { Seo } from '../components/Seo'

export default function About() {
    return (
        <>
            <Seo path="/about" />
            <div className="min-h-screen w-full">
                <Navbar />
                <div className="min-h-9/10 px-4 md:px-10 pt-32 grid gap-10 md:grid-cols-2">
                    <div className="">
                        <h1 className="font-semibold text-2xl">
                            Hi, I am Jerens
                        </h1>
                        <p className="pt-2">
                            I am a student of Electrical Engineering. I have
                            been passionate about building high-performance
                            software especially that can serve a lot of users.
                            Besides that, I enjoy watching Manchester United
                            play football.
                        </p>
                    </div>
                    <div className="w-full px-4">
                        <div className="w-full max-w-md p-3 mx-auto bg-white border-2 rounded-2xl">
                            <h1 className="p-2 font-semibold text-xl text-center">
                                FAQ
                            </h1>
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-red-900 bg-red-100 rounded-lg hover:bg-red-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                                            <span>Where are you from?</span>
                                            <ChevronUpIcon
                                                className={`${
                                                    open
                                                        ? 'transform rotate-180'
                                                        : ''
                                                } w-5 h-5 text-red-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                            I am from Manado, Indonesia.
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-red-900 bg-red-100 rounded-lg hover:bg-red-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                                            <span>
                                                What are your best
                                                characteristics?
                                            </span>
                                            <ChevronUpIcon
                                                className={`${
                                                    open
                                                        ? 'transform rotate-180'
                                                        : ''
                                                } w-5 h-5 text-red-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                            Optimism, Ambitiousness and
                                            Curiosity.
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-red-900 bg-red-100 rounded-lg hover:bg-red-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                                            <span>
                                                Are you a morning person or a
                                                night owl?
                                            </span>
                                            <ChevronUpIcon
                                                className={`${
                                                    open
                                                        ? 'transform rotate-180'
                                                        : ''
                                                } w-5 h-5 text-red-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                            Morning person.
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-red-900 bg-red-100 rounded-lg hover:bg-red-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                                            <span>
                                                How do you replenish your
                                                energy?
                                            </span>
                                            <ChevronUpIcon
                                                className={`${
                                                    open
                                                        ? 'transform rotate-180'
                                                        : ''
                                                } w-5 h-5 text-red-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                            I am introverted so I really like
                                            being alone when my energy is low.
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-red-900 bg-red-100 rounded-lg hover:bg-red-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                                            <span>
                                                What are the top three qualities
                                                that draw you to someone new?
                                            </span>
                                            <ChevronUpIcon
                                                className={`${
                                                    open
                                                        ? 'transform rotate-180'
                                                        : ''
                                                } w-5 h-5 text-red-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                            Be nice, respectful, and honest.
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-red-900 bg-red-100 rounded-lg hover:bg-red-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                                            <span>
                                                What has been the hardest thing
                                                for you to face or learn?
                                            </span>
                                            <ChevronUpIcon
                                                className={`${
                                                    open
                                                        ? 'transform rotate-180'
                                                        : ''
                                                } w-5 h-5 text-red-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                            When I am failing. People make
                                            mistakes and fail but what separates
                                            the winner and the loser is the
                                            ability to get up quickly when they
                                            are losing.
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
