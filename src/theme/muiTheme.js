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
      divider: semantic.header.border,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
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
    shape: {
      borderRadius: appTokens.radius.md,
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
}
