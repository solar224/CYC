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
import AppRoutes from "./routes/AppRoutes";
import { createAppMuiTheme } from "./theme/muiTheme";

import "./components/css/App.css";

export default function App() {
  const [theme, setTheme] = usePersistentPreference("theme", "dark");
  const [language, setLanguage] = usePersistentPreference("language", "zh");

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));
  const toggleLanguage = () => setLanguage(prev => (prev === "zh" ? "en" : "zh"));

  const muiTheme = useMemo(() => createAppMuiTheme(theme === "dark" ? "dark" : "light"), [theme]);

  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={800}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
          <ThemeProvider theme={muiTheme}>
            <CssBaseline enableColorScheme />

            <Box
              className="app"
              sx={{ minHeight: "100vh" }}
            >
              <Router basename={ENV.PUBLIC_URL}>
                <AppRoutes theme={theme} />
              </Router>
            </Box>
          </ThemeProvider>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </SnackbarProvider>
  );
}
