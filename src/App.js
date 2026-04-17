// App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import { useMemo } from "react";

import { SnackbarProvider } from "notistack";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeContext } from "./context/ThemeContext";
import { LanguageContext } from "./context/LanguageContext";
import { ENV } from "./config/env";
import { usePersistentPreference } from "./hooks/useAppInitialization";
import useRouteDocumentTitle from "./hooks/useRouteDocumentTitle";
import AppRoutes from "./routes/AppRoutes";
import { createAppMuiTheme } from "./theme/muiTheme";

function RoutedApp({ theme }) {
  useRouteDocumentTitle();
  return <AppRoutes theme={theme} />;
}

export default function App() {
  const [theme, setTheme] = usePersistentPreference("theme", "dark", ["light", "dark"]);
  const [language, setLanguage] = usePersistentPreference("language", "zh", ["zh", "en"]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));
  const toggleLanguage = () => setLanguage(prev => (prev === "zh" ? "en" : "zh"));

  const muiTheme = useMemo(() => createAppMuiTheme(theme === "dark" ? "dark" : "light"), [theme]);
  const routerBasename = useMemo(() => {
    if (typeof window === "undefined") {
      return ENV.PUBLIC_URL || "";
    }

    const currentPath = window.location.pathname;
    if (ENV.PUBLIC_URL) {
      return currentPath.startsWith(ENV.PUBLIC_URL) ? ENV.PUBLIC_URL : "";
    }

    // CRA dev server may leave PUBLIC_URL empty even when opening /CYC.
    const firstSegment = currentPath.split("/").filter(Boolean)[0] || "";
    if (firstSegment.toLowerCase() === "cyc") {
      return `/${firstSegment}`;
    }

    return "";
  }, []);

  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={800}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
          <ThemeProvider theme={muiTheme}>
            <CssBaseline enableColorScheme />

            <Box
              sx={{
                minHeight: "100vh",
                transition: `background-color 0.3s ease, color 0.3s ease`,
                letterSpacing: 0.4,
              }}
            >
              <Router basename={routerBasename}>
                <RoutedApp theme={theme} />
              </Router>
            </Box>
          </ThemeProvider>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </SnackbarProvider>
  );
}
