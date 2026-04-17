import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { appTokens, resolveSemanticTokens } from "./tokens";

export function createAppMuiTheme(mode) {
  const semantic = resolveSemanticTokens(mode);
  const typographyRoles = appTokens.typography.roles;
  const asRem = (fontSize) => `${fontSize / 16}rem`;
  const roleStyle = (role, options = {}) => ({
    fontSize: asRem(role.fontSize),
    lineHeight: role.lineHeight,
    fontWeight: options.fontWeight ?? role.fontWeight,
    letterSpacing: options.letterSpacing ?? "0.01em",
    textTransform: options.textTransform,
  });

  const title = roleStyle(typographyRoles.title, { letterSpacing: "0.005em" });
  const heading = roleStyle(typographyRoles.heading, { letterSpacing: "0.005em" });
  const subheading = roleStyle(typographyRoles.subheading);
  const body = roleStyle(typographyRoles.body, { letterSpacing: "0.012em" });

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
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            h1: "h1",
            h2: "h2",
            h3: "h3",
            h4: "h4",
            h5: "h5",
            h6: "h6",
            subtitle1: "h6",
            subtitle2: "h6",
            body1: "p",
            body2: "p",
            caption: "span",
            button: "span",
            overline: "span",
            inherit: "p",
            title: "h1",
            heading: "h2",
            subheading: "h3",
            body: "p",
          },
        },
      },
    },
    typography: {
      fontFamily: appTokens.typography.family,
      title,
      heading,
      subheading,
      body,
      h1: title,
      h2: title,
      h3: heading,
      h4: title,
      h5: heading,
      h6: subheading,
      subtitle1: subheading,
      subtitle2: subheading,
      body1: body,
      body2: body,
      caption: body,
      overline: roleStyle(typographyRoles.body, {
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontWeight: appTokens.typography.weight.medium,
      }),
      button: roleStyle(typographyRoles.body, {
        letterSpacing: "0.02em",
        fontWeight: appTokens.typography.weight.medium,
      }),
    },
    shape: {
      borderRadius: appTokens.radius.base,
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
}
