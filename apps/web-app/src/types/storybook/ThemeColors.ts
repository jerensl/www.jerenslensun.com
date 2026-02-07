export type ThemeColorsMode = 'light' | 'dark'

export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
}

export interface ThemeColorsBase<TColor> {
    mode: ThemeColorsMode

    primary: TColor
    secondary: TColor
    info: TColor
    error: TColor
    success: TColor
    warning: TColor

    text: {
        primary: string
        secondary: string
        disabled: string
        link: string
        /** Used for auto white or dark text on colored backgrounds */
        maxContrast: string
    }

    background: {
        /** Dashboard and body background */
        canvas: string
        /** Primary content pane background (panels etc) */
        primary: string
        /** Cards and elements that need to stand out on the primary background */
        secondary: string
    }

    border: {
        weak: string
        medium: string
        strong: string
    }

    gradients: {
        brandVertical: string
        brandHorizontal: string
    }

    action: {
        /** Used for selected menu item / select option */
        selected: string
        /**
         * @alpha (Do not use from plugins)
         * Used for selected items when background only change is not enough (Currently only used for FilterPill)
         **/
        selectedBorder: string
        /** Used for hovered menu item / select option */
        hover: string
        /** Used for button/colored background hover opacity */
        hoverOpacity: number
        /** Used focused menu item / select option */
        focus: string
        /** Used for disabled buttons and inputs */
        disabledBackground: string
        /** Disabled text */
        disabledText: string
        /** Disablerd opacity */
        disabledOpacity: number
    }

    hoverFactor: number
    contrastThreshold: number
    tonalOffset: number
}

export interface ThemeRichColor {
    /** color intent (primary, secondary, info, error, etc) */
    name: string
    /** Main color */
    main: string
    /** Used for hover */
    shade: string
    /** Used for text */
    text: string
    /** Used for borders */
    border: string
    /** Used subtly colored backgrounds */
    transparent: string
    /** Used for weak colored borders like larger alert/banner boxes and smaller badges and tags */
    borderTransparent: string
    /** Text color for text ontop of main */
    contrastText: string
}

export type ThemeColorsInput = DeepPartial<ThemeColorsBase<ThemeRichColor>>
