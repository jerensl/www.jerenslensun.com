export const baseColors = {
    source: '#ff2200',

    white: '#ffffff',
    black: '#000000',

    /* primary */
    primary10: '#3f0300',
    primary20: '#660800',
    primary25: '#7b0b00',
    primary30: '#900f00',
    primary35: '#a51300',
    primary40: '#bc1600',
    primary50: '#ea1e00',
    primary60: '#ff553a',
    primary70: '#ff8a75',
    primary80: '#ffb4a6',
    primary90: '#ffdad4',
    primary95: '#ffede9',
    primary98: '#fff8f6',
    primary99: '#fffbff',

    /* secondary */
    secondary10: '#001f26',
    secondary20: '#003640',
    secondary25: '#00424d',
    secondary30: '#004e5b',
    secondary35: '#005b6a',
    secondary40: '#006879',
    secondary50: '#008398',
    secondary60: '#009fb8',
    secondary70: '#00bcd9',
    secondary80: '#00d9fb',
    secondary90: '#a9edff',
    secondary95: '#d7f6ff',
    secondary98: '#f0fbff',
    secondary99: '#f8fdff',

    /* tertiary */
    tertiary10: '#2b1700',
    tertiary20: '#472a00',
    tertiary25: '#563400',
    tertiary30: '#663e00',
    tertiary35: '#764800',
    tertiary40: '#865300',
    tertiary50: '#a86900',
    tertiary60: '#cb8000',
    tertiary70: '#ef9800',
    tertiary80: '#ffb962',
    tertiary90: '#ffddb9',
    tertiary95: '#ffeede',
    tertiary98: '#fff8f4',
    tertiary99: '#fffbff',

    /* green */
    greeen10: '#0b2000',
    greeen20: '#173800',
    greeen25: '#1e4400',
    greeen30: '#245100',
    greeen35: '#2b5e00',
    greeen40: '#326b00',
    greeen50: '#418700',
    greeen60: '#50a400',
    greeen70: '#60c100',
    greeen80: '#76df22',
    greeen90: '#91fc42',
    greeen95: '#cfffa9',
    greeen98: '#eeffdc',
    greeen99: '#f8ffeb',

    /* neutral */
    neutral10: '#201a19',
    neutral20: '#362f2d',
    neutral25: '#413a38',
    neutral30: '#4d4543',
    neutral35: '#59504f',
    neutral40: '#655c5b',
    neutral50: '#7f7573',
    neutral60: '#998e8c',
    neutral70: '#b4a9a7',
    neutral80: '#d0c4c2',
    neutral90: '#ede0dd',
    neutral95: '#fbeeeb',
    neutral98: '#fff8f6',
    neutral99: '#fffbff',

    /* neutral-variant */
    neutralVariant10: '#251916',
    neutralVariant20: '#3b2d2b',
    neutralVariant25: '#473835',
    neutralVariant30: '#534340',
    neutralVariant35: '#5f4f4c',
    neutralVariant40: '#6c5b57',
    neutralVariant50: '#857370',
    neutralVariant60: '#a08c89',
    neutralVariant70: '#bca7a3',
    neutralVariant80: '#d8c2be',
    neutralVariant90: '#f5ddd9',
    neutralVariant95: '#ffede9',
    neutralVariant98: '#fff8f6',
    neutralVariant99: '#fffbff',

    /* error */
    error10: '#410002',
    error20: '#690005',
    error25: '#7e0007',
    error30: '#93000a',
    error35: '#a80710',
    error40: '#ba1a1a',
    error50: '#de3730',
    error60: '#ff5449',
    error70: '#ff897d',
    error80: '#ffb4ab',
    error90: '#ffdad6',
    error95: '#ffedea',
    error98: '#fff8f7',
    error99: '#fffbff',
}

export const lightColors = {
    // Primary
    primary: baseColors.primary40,
    onPrimary: baseColors.white,
    primaryContainer: baseColors.primary90,
    onPrimaryContainer: baseColors.primary10,

    // Secondary
    secondary: baseColors.secondary40,
    onSecondary: baseColors.white,
    secondaryContainer: baseColors.secondary90,
    onSecondaryContainer: baseColors.secondary10,

    // Tertiary
    tertiary: baseColors.tertiary40,
    onTertiary: baseColors.white,
    tertiaryContainer: baseColors.tertiary90,
    onTertiaryContainer: baseColors.tertiary10,

    // Error
    error: baseColors.error40,
    onError: baseColors.white,
    errorContainer: baseColors.error90,
    onErrorContainer: baseColors.error10,

    // Success
    success: baseColors.greeen40,
    onSuccess: baseColors.white,
    successContainer: baseColors.greeen90,
    onSuccessContainer: baseColors.greeen10,

    // BG
    background: baseColors.neutral99,
    onBackground: baseColors.neutral10,

    // Others
    surface: baseColors.neutral99,
    onSurface: baseColors.black,
    surfaceVariant: baseColors.neutralVariant90,
    onSurfaceVariant: baseColors.neutralVariant30,
    outline: baseColors.neutralVariant50,
    inverseOnSurface: baseColors.neutral95,
    inverseSurface: baseColors.neutral20,
    inversePrimary: baseColors.primary80,
    shadow: baseColors.black,
    surfaceTint: baseColors.primary40,
    outlineVariant: baseColors.neutralVariant80,
    scrim: baseColors.black,
}

export const darkColors = {
    // Primary
    primary: baseColors.primary80,
    onPrimary: baseColors.primary20,
    primaryContainer: baseColors.primary30,
    onPrimaryContainer: baseColors.primary90,

    // Secondary
    secondary: baseColors.secondary80,
    onSecondary: baseColors.secondary20,
    secondaryContainer: baseColors.secondary30,
    onSecondaryContainer: baseColors.secondary90,

    // Tertiary
    tertiary: baseColors.tertiary80,
    onTertiary: baseColors.tertiary20,
    tertiaryContainer: baseColors.tertiary30,
    onTertiaryContainer: baseColors.tertiary90,

    // Error
    error: baseColors.error80,
    onError: baseColors.error20,
    errorContainer: baseColors.error30,
    onErrorContainer: baseColors.error90,

    // Success
    success: baseColors.greeen80,
    onSuccess: baseColors.greeen20,
    successContainer: baseColors.greeen30,
    onSuccessContainer: baseColors.greeen90,

    // BG
    background: baseColors.neutral10,
    onBackground: baseColors.neutral90,

    // Others
    surface: baseColors.neutral10,
    onSurface: baseColors.neutral90,
    surfaceVariant: baseColors.neutralVariant30,
    onSurfaceVariant: baseColors.neutralVariant80,
    outline: baseColors.neutralVariant60,
    inverseOnSurface: baseColors.neutral10,
    inverseSurface: baseColors.neutral90,
    inversePrimary: baseColors.primary40,
    shadow: baseColors.black,
    surfaceTint: baseColors.primary80,
    outlineVariant: baseColors.neutralVariant30,
    scrim: baseColors.black,
}
