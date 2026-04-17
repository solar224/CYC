import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { appTokens } from "./tokens";

export function createAppMuiTheme(mode) {
  let theme = createTheme({
    breakpoints: {
      values: appTokens.breakpoints.mui,
    },
    palette: {
      mode,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ":root": {
            "--app-header-mobile": `${appTokens.layout.headerHeight.mobile}px`,
            "--app-header-desktop": `${appTokens.layout.headerHeight.desktop}px`,
            "--app-font-family": appTokens.typography.family,
            "--app-color-header-bg": appTokens.semantic.header.background,
            "--app-color-header-border": appTokens.semantic.header.border,
            "--app-color-header-text-subtle": appTokens.semantic.header.textSubtle,
            "--app-color-header-text-strong": appTokens.semantic.header.textStrong,
            "--app-color-footer-bg": appTokens.semantic.footer.background,
            "--app-color-footer-fg": appTokens.semantic.footer.foreground,
            "--app-color-action-up": appTokens.semantic.action.scrollToTop,
            "--app-color-action-settings": appTokens.semantic.action.settings,
            "--app-radius-sm": `${appTokens.radius.sm}px`,
            "--app-radius-md": `${appTokens.radius.md}px`,
            "--app-radius-lg": `${appTokens.radius.lg}px`,
            "--app-space-floating": `${appTokens.layout.floating.size}px`,
            "--app-motion-fast": appTokens.motion.fast,
            "--app-motion-normal": appTokens.motion.normal,
          },
        },
      },
      MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
      MuiCard: { styleOverrides: { root: { backgroundImage: "none" } } },
    },
    typography: {
      fontFamily: appTokens.typography.family,
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
}
