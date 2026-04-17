import { alpha } from "@mui/material/styles";
import { appTokens, resolveSemanticTokens } from "../../theme/tokens";

export function getAppDialogSx(mode = "dark", muiTheme) {
    const semantic = resolveSemanticTokens(mode);
    const typography = appTokens.typography.roles;
    const palette = muiTheme?.palette;
    const commonBlack = palette?.common?.black || appTokens.core.ink[900];
    const isDark = mode === "dark";

    const paperBg = palette?.background?.paper || semantic.surface.paper;
    const primaryMain = palette?.primary?.main;
    const primaryDark = palette?.primary?.dark || primaryMain;
    const primaryContrast =
        typeof palette?.getContrastText === "function"
            ? palette.getContrastText(primaryMain || semantic.action.settings)
            : appTokens.core.white;
    const divider = palette?.divider || semantic.header.border;
    const textPrimary = palette?.text?.primary || semantic.header.textStrong;
    const textSecondary = palette?.text?.secondary || semantic.header.textSubtle;
    const actionHover = palette?.action?.hover || semantic.header.hover;

    return {
        paper: {
            backgroundColor: paperBg,
            borderRadius: appTokens.radiusRoles.floating,
            minWidth: "280px",
            maxWidth: "320px",
            boxShadow: `0 8px 32px ${alpha(commonBlack, isDark ? 0.4 : 0.12)}`,
        },
        titleRow: {
            px: 2,
            py: 1.5,
            borderBottom: `1px solid ${divider}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        titleText: {
            fontSize: typography.subheading.fontSize,
            fontWeight: 500,
            letterSpacing: "0.4px",
            color: textPrimary,
        },
        closeButton: {
            color: textSecondary,
            "&:hover": {
                backgroundColor: actionHover,
            },
        },
        content: {
            px: 2,
            py: 2,
        },
        bodyText: {
            color: textSecondary,
            fontSize: typography.body.fontSize,
            lineHeight: typography.body.lineHeight,
        },
        footer: {
            px: 2,
            py: 1.5,
            borderTop: `1px solid ${divider}`,
            justifyContent: "flex-end",
            gap: 1,
        },
        cancelButton: {
            textTransform: "none",
            borderRadius: appTokens.radiusRoles.button,
            px: 2,
            py: 0.8,
            color: textSecondary,
            "&:hover": { backgroundColor: actionHover },
        },
        primaryButton: {
            textTransform: "none",
            borderRadius: appTokens.radiusRoles.button,
            px: 2.2,
            py: 0.8,
            fontSize: typography.body.fontSize,
            fontWeight: 500,
            bgcolor: primaryMain || semantic.action.settings,
            color: primaryContrast,
            boxShadow: "none",
            "&:hover": { bgcolor: primaryDark || semantic.action.settings, boxShadow: "none" },
        },
        segmentWrap: {
            display: "flex",
            borderRadius: appTokens.radiusRoles.field,
            p: "3px",
            backgroundColor: actionHover,
        },
        segmentButton: (active) => ({
            px: 1.5,
            py: 0.75,
            minWidth: "auto",
            borderRadius: appTokens.radiusRoles.chip,
            textTransform: "none",
            fontSize: typography.body.fontSize,
            backgroundColor: active ? (palette?.background?.default || semantic.surface.canvas) : "transparent",
            color: active ? textPrimary : textSecondary,
            boxShadow: active ? `0 1px 3px ${alpha(commonBlack, 0.1)}` : "none",
            "&:hover": {
                backgroundColor: active ? (palette?.background?.default || semantic.surface.canvas) : actionHover,
            },
        }),
    };
}
