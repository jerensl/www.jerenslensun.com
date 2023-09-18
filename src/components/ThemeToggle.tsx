import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from 'next-themes'
import { IconButton } from './buttons/IconBoxButton'

const ThemeToggle: React.FC = () => {
    const { systemTheme, theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => {
        setMounted(true)
    }, [])

    const renderThemeChanger = () => {
        if (!mounted) return null

        const currentTheme = theme === 'system' ? systemTheme : theme

        if (currentTheme === 'dark') {
            return (
                <IconButton
                    aria-label="light theme toggle"
                    onClick={() => setTheme('light')}
                    shape="circle"
                >
                    <FontAwesomeIcon
                        className="block"
                        size="lg"
                        icon={faSun}
                        data-testid="theme-dark"
                    />
                </IconButton>
            )
        } else {
            return (
                <IconButton
                    aria-label="dark theme toggle"
                    onClick={() => setTheme('dark')}
                    shape="circle"
                >
                    <FontAwesomeIcon
                        className="block px-1"
                        icon={faMoon}
                        size="lg"
                        data-testid="theme-light"
                    />
                </IconButton>
            )
        }
    }

    return <>{renderThemeChanger()}</>
}

export default ThemeToggle
