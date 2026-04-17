// App.jsx
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { useMemo } from "react";

import Footer from "./components/Footer";
import FloatingCircle from "./components/FloatingCircle";
import DynamicBackground from "./components/DynamicBackground";
import PhoneHeader from "./components/headerComponents/PhoneHeader";
import PcHeader from "./components/headerComponents/PcHeader";
import ResponsiveLayout from "./components/layout/ResponsiveLayout";

import { SnackbarProvider } from "notistack";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeContext } from "./context/ThemeContext";
import { LanguageContext } from "./context/LanguageContext";
import { ENV } from "./config/env";
import { APP_ROUTES, APP_ROUTE_PREFIXES } from "./config/constants";
import { useAppOverflowGuard, usePersistentPreference } from "./hooks/useAppInitialization";
import AppRoutes from "./routes/AppRoutes";
import { createAppMuiTheme } from "./styles/theme/muiTheme";

import "./components/css/App.css";

function AppFooter() {
  const location = useLocation();
  if (location.pathname.startsWith(APP_ROUTE_PREFIXES.TOOLS)) return null;
  return <Footer />;
}

function AppFloatingCircle() {
  const location = useLocation();
  if (location.pathname.startsWith(APP_ROUTE_PREFIXES.TOOLS)) return null;
  return <FloatingCircle />;
}

function AppHeader() {
  return <ResponsiveLayout mobile={<PhoneHeader />} desktop={<PcHeader />} />;
}

function AppBackground({ theme }) {
  const location = useLocation();
  if (location.pathname.startsWith(APP_ROUTES.ROUGHFRAME)) return null;
  return <DynamicBackground theme={theme} />;
}

function AppOverflowGuard() {
  const location = useLocation();
  const isToolPage = location.pathname.startsWith(APP_ROUTE_PREFIXES.TOOLS);
  useAppOverflowGuard(isToolPage);
  return null;
}

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
              sx={{
                pt: {
                  xs: "var(--app-header-mobile, 56px)",
                  lg: "var(--app-header-desktop, 64px)",
                },
              }}
            >
              <Router basename={ENV.PUBLIC_URL}>
                <AppOverflowGuard />
                <AppBackground theme={theme} />
                <AppHeader />
                <AppRoutes />
                <AppFloatingCircle />
                <AppFooter />
              </Router>
            </Box>
          </ThemeProvider>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </SnackbarProvider>
  );
}
