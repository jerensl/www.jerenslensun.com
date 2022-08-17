import { Navbar, NavbarMobile } from './navbar'

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <NavbarMobile />
            <main>{children}</main>
        </>
    )
}
