import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { appTokens, resolveSemanticTokens } from "./tokens";

export function createAppMuiTheme(mode) {
  const semantic = resolveSemanticTokens(mode);

  let theme = createTheme({
    breakpoints: {
      values: appTokens.breakpoints.mui,
    },
    palette: {
      mode,
      background: {
        default: semantic.surface.canvas,
        paper: semantic.surface.paper,
      },
      text: {
        primary: semantic.header.textStrong,
        secondary: semantic.header.textSubtle,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ":root": {
            "--app-header-mobile": `${appTokens.layout.headerHeight.mobile}px`,
            "--app-header-desktop": `${appTokens.layout.headerHeight.desktop}px`,
            "--app-font-family": appTokens.typography.family,
            "--app-color-surface-canvas": semantic.surface.canvas,
            "--app-color-surface-paper": semantic.surface.paper,
            "--app-color-header-bg": semantic.header.background,
            "--app-color-header-border": semantic.header.border,
            "--app-color-header-hover": semantic.header.hover,
            "--app-color-header-text-subtle": semantic.header.textSubtle,
            "--app-color-header-text-strong": semantic.header.textStrong,
            "--app-color-footer-bg": semantic.footer.background,
            "--app-color-footer-fg": semantic.footer.foreground,
            "--app-color-action-up": semantic.action.scrollToTop,
            "--app-color-action-settings": semantic.action.settings,
            "--app-radius-sm": `${appTokens.radius.sm}px`,
            "--app-radius-md": `${appTokens.radius.md}px`,
            "--app-radius-lg": `${appTokens.radius.lg}px`,
            "--app-space-floating": `${appTokens.layout.floating.size}px`,
            "--app-motion-fast": appTokens.motion.fast,
            "--app-motion-normal": appTokens.motion.normal,
          },
          body: {
            margin: 0,
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            letterSpacing: "0.2px",
          },
          code: {
            fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
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
