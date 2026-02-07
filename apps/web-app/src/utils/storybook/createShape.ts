export interface ThemeShape {
    radius: Radii
}

interface Radii {
    default: string
    pill: string
    circle: string
}

export interface ThemeShapeInput {
    borderRadius?: number
}

export function createShape(options: ThemeShapeInput): ThemeShape {
    const radius = {
        default: '2px',
        pill: '9999px',
        circle: '100%',
    }

    return {
        radius,
    }
}
