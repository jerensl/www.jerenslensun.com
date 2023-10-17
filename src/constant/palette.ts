export const baseColors = {
    source: '#ff2200',

    white: '#ffffff',
    black: '#000000',

    /* primary */
    primary10: '#410001',
    primary20: '#690002',
    primary25: '#7e0002',
    primary30: '#920506',
    primary35: '#a41711',
    primary40: '#b5251c',
    primary50: '#d83f31',
    primary60: '#fc5847',
    primary70: '#ff8a7a',
    primary80: '#ffb4a9',
    primary90: '#ffdad5',
    primary95: '#ffedea',
    primary98: '#fff8f7',
    primary99: '#fffbff',

    /* secondary */
    secondary10: '#00201d',
    secondary20: '#003732',
    secondary25: '#00433d',
    secondary30: '#005049',
    secondary35: '#005d55',
    secondary40: '#006a61',
    secondary50: '#00867b',
    secondary60: '#00a295',
    secondary70: '#2abfb0',
    secondary80: '#52dbcc',
    secondary90: '#73f8e8',
    secondary95: '#b3fff4',
    secondary98: '#e4fffa',
    secondary99: '#f2fffc',

    /* tertiary */
    tertiary10: '#251a00',
    tertiary20: '#3e2e00',
    tertiary25: '#4b3900',
    tertiary30: '#594400',
    tertiary35: '#674f00',
    tertiary40: '#765b00',
    tertiary50: '#947200',
    tertiary60: '#b38b00',
    tertiary70: '#d4a503',
    tertiary80: '#f2c02d',
    tertiary90: '#ffdf94',
    tertiary95: '#ffefd0',
    tertiary98: '#fff8f1',
    tertiary99: '#fffbff',

    /* neutral */
    neutral10: '#201a19',
    neutral20: '#362f2e',
    neutral25: '#413a38',
    neutral30: '#4d4544',
    neutral35: '#59504f',
    neutral40: '#655c5b',
    neutral50: '#7f7573',
    neutral60: '#998e8d',
    neutral70: '#b4a9a7',
    neutral80: '#d0c4c2',
    neutral90: '#ede0de',
    neutral95: '#fbeeec',
    neutral98: '#fff8f7',
    neutral99: '#fffbff',

    /* neutral-variant */
    neutralVariant10: '#251917',
    neutralVariant20: '#3b2d2b',
    neutralVariant25: '#473836',
    neutralVariant30: '#534341',
    neutralVariant35: '#5f4f4c',
    neutralVariant40: '#6b5a58',
    neutralVariant50: '#857370',
    neutralVariant60: '#a08c89',
    neutralVariant70: '#bba7a3',
    neutralVariant80: '#d8c2be',
    neutralVariant90: '#f5ddda',
    neutralVariant95: '#ffedea',
    neutralVariant98: '#fff8f7',
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

    /* warning */
    orange10: '#2c1600',
    orange20: '#4a2800',
    orange25: '#593200',
    orange30: '#693c00',
    orange35: '#7a4600',
    orange40: '#8a5000',
    orange50: '#ad6600',
    orange60: '#d17c00',
    orange70: '#f29625',
    orange80: '#ffb86f',
    orange90: '#ffdcbe',
    orange95: '#ffeee0',
    orange98: '#fff8f5',
    orange99: '#fffbff',

    /* success */
    green10: '#032100',
    green20: '#073900',
    green25: '#0a4600',
    green30: '#165208',
    green35: '#245e15',
    green40: '#306b21',
    green50: '#498537',
    green60: '#62a04e',
    green70: '#7cbb66',
    green80: '#96d77f',
    green90: '#b1f498',
    green95: '#cbffb5',
    green98: '#edffe0',
    green99: '#f7ffee',
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

    // Warning
    warning: baseColors.orange40,
    onWarning: baseColors.white,
    warningContainer: baseColors.orange90,
    onWarningContainer: baseColors.orange10,

    // Success
    success: baseColors.green40,
    onSuccess: baseColors.white,
    successContainer: baseColors.green90,
    onSuccessContainer: baseColors.green10,

    // BG
    background: baseColors.neutral99,
    onBackground: baseColors.neutral10,

    // Others
    surface: baseColors.neutral99,
    onSurface: baseColors.neutral10,
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

    // Warning
    warning: baseColors.orange80,
    onWarning: baseColors.error20,
    warningContainer: baseColors.orange30,
    onWarningContainer: baseColors.orange90,

    // Success
    success: baseColors.green80,
    onSuccess: baseColors.green20,
    successContainer: baseColors.green30,
    onSuccessContainer: baseColors.green90,

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
