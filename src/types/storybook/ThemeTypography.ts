export interface ThemeTypographyVariant {
    fontSize: string
    fontWeight: number
    lineHeight: number
    fontFamily: string
    letterSpacing?: string
}

export interface ThemeTypographyVariantTypes {
    h1: ThemeTypographyVariant
    h2: ThemeTypographyVariant
    h3: ThemeTypographyVariant
    h4: ThemeTypographyVariant
    h5: ThemeTypographyVariant
    h6: ThemeTypographyVariant
    body: ThemeTypographyVariant
    bodySmall: ThemeTypographyVariant
}

export interface ThemeTypography extends ThemeTypographyVariantTypes {
    fontFamily: string
    fontFamilyMonospace: string
    fontSize: number
    fontWeightLight: number
    fontWeightRegular: number
    fontWeightMedium: number
    fontWeightBold: number

    // The font-size on the html element.
    htmlFontSize?: number

    pxToRem: (px: number) => string
}
