import { colors, typography } from "../../theme";

const REGULAR = {
    fontFamily: typography.regular,
    fontSize: 14,
    color: colors.lightGrey
}

const MEDIUM = {
    fontFamily: typography.medium,
    color: colors.darkGrey
}

const MEDIUM_WHITE = {
    fontFamily: typography.medium,
    color: colors.white
}

const BOLD = {
    fontFamily: typography.bold,
    color: colors.darkGrey
}

export const presets = {
    regular: REGULAR,
    medium: MEDIUM,
    bold: BOLD,
    medium_white: MEDIUM_WHITE,
    small: {
        ...REGULAR,
        fontSize: 12
    }
}

