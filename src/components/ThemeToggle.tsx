import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from 'next-themes'

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
                <ThemeToggleButton
                    ariaLabel="light theme toggle"
                    handleClick={() => setTheme('light')}
                >
                    <FontAwesomeIcon
                        className="block m-3"
                        size="lg"
                        icon={faSun}
                        data-testid="theme-dark"
                    />
                </ThemeToggleButton>
            )
        } else {
            return (
                <ThemeToggleButton
                    ariaLabel="dark theme toggle"
                    handleClick={() => setTheme('dark')}
                >
                    <FontAwesomeIcon
                        className="block m-3"
                        icon={faMoon}
                        size="lg"
                        data-testid="theme-light"
                    />
                </ThemeToggleButton>
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
