import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from 'next-themes'
import { IconBoxButton } from './buttons/IconBoxButton'

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
                <IconBoxButton
                    aria-label="light theme toggle"
                    onClick={() => setTheme('light')}
                >
                    <FontAwesomeIcon
                        className="block"
                        size="lg"
                        icon={faSun}
                        data-testid="theme-dark"
                    />
                </IconBoxButton>
            )
        } else {
            return (
                <IconBoxButton
                    aria-label="dark theme toggle"
                    onClick={() => setTheme('dark')}
                >
                    <FontAwesomeIcon
                        className="block px-1"
                        icon={faMoon}
                        size="lg"
                        data-testid="theme-light"
                    />
                </IconBoxButton>
            )
        }
    }

    return <>{renderThemeChanger()}</>
}

interface ThemeToggleButtonProps {
    children: React.ReactChild
    handleClick: () => void
    ariaLabel: string
}

const ThemeToggleButton = ({
    children,
    handleClick,
    ariaLabel,
}: ThemeToggleButtonProps): React.ReactElement => {
    return (
        <button
            className="hover:bg-gray-100 dark:hover:bg-neutral-800 m-auto rounded-full"
            onClick={handleClick}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    )
}

export default ThemeToggle
