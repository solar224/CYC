// App.jsx
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { createContext, useState, useEffect, useMemo } from "react";

import Home from "./components/Home";
import Contactme from "./components/Contactme";
import Footer from "./components/Footer";
import FloatingCircle from "./components/FloatingCircle";
import DynamicBackground from "./components/DynamicBackground";
import PhoneHeader from "./components/headerComponents/PhoneHeader";
import PcHeader from "./components/headerComponents/PcHeader";
import ResponsiveLayout from "./components/layout/ResponsiveLayout";
import NotesHome from "./components/Note";
import NoteDetail from "./components/NoteDetail";
import Note from "./components/Note";
import Tools from "./components/Tools";
import SketchCanvas from "./project/RoughFrame/SketchCanvas";

import { SnackbarProvider } from "notistack";

import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { appTokens } from "./theme/tokens";

import "./components/css/App.css";

export const ThemeContext = createContext();
export const LanguageContext = createContext();

function AppFooter() {
  const location = useLocation();
  if (location.pathname.startsWith("/tools/")) return null;
  return <Footer />;
}

function AppFloatingCircle() {
  const location = useLocation();
  if (location.pathname.startsWith("/tools/")) return null;
  return <FloatingCircle />;
}

function AppHeader() {
  return <ResponsiveLayout mobile={<PhoneHeader />} desktop={<PcHeader />} />;
}

function AppBackground({ theme }) {
  const location = useLocation();
  if (location.pathname.startsWith("/tools/RoughFrame")) return null;
  return <DynamicBackground theme={theme} />;
}

function AppOverflowGuard() {
  const location = useLocation();
  const isToolPage = location.pathname.startsWith("/tools/");
  useEffect(() => {
    const appDiv = document.querySelector(".app");
    if (isToolPage) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      if (appDiv) {
        appDiv.style.height = "100vh";
        appDiv.style.minHeight = "0";
        appDiv.style.overflow = "hidden";
        appDiv.style.boxSizing = "border-box";
      }
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      if (appDiv) {
        appDiv.style.height = "";
        appDiv.style.minHeight = "";
        appDiv.style.overflow = "";
        appDiv.style.boxSizing = "";
      }
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      if (appDiv) {
        appDiv.style.height = "";
        appDiv.style.minHeight = "";
        appDiv.style.overflow = "";
        appDiv.style.boxSizing = "";
      }
    };
  }, [isToolPage]);
  return null;
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "zh");

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));
  const toggleLanguage = () => setLanguage(prev => (prev === "zh" ? "en" : "zh"));

  useEffect(() => localStorage.setItem("theme", theme), [theme]);
  useEffect(() => localStorage.setItem("language", language), [language]);

  const muiTheme = useMemo(() => {
    let t = createTheme({
      breakpoints: {
        values: appTokens.breakpoints.mui,
      },
      palette: {
        mode: theme === "dark" ? "dark" : "light",
        // primary: { main: "#4F46E5" },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            ":root": {
              "--app-header-mobile": `${appTokens.layout.headerHeight.mobile}px`,
              "--app-header-desktop": `${appTokens.layout.headerHeight.desktop}px`,
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
    t = responsiveFontSizes(t);
    return t;
  }, [theme]);

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
              <Router basename={process.env.PUBLIC_URL}>
                <AppOverflowGuard />
                <AppBackground theme={theme} />
                <AppHeader />
                <Routes>
                  <Route
                    path="/"
                    element={<ResponsiveLayout mobile={<Home layoutKind="mobile" />} desktop={<Home layoutKind="desktop" />} />}
                  />
                  <Route path="/note" element={<Note />} />
                  <Route
                    path="/contact-me"
                    element={
                      <ResponsiveLayout
                        mobile={<Contactme calendarVariant="mobile" />}
                        desktop={<Contactme calendarVariant="desktop" />}
                      />
                    }
                  />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/tools/RoughFrame" element={<SketchCanvas />} />
                  <Route path="/notes" element={<NotesHome />} />
                  <Route path="/notes/:slug" element={<NoteDetail />} />
                </Routes>
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
