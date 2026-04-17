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
