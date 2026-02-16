// App.jsx
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { createContext, useState, useEffect, useMemo } from "react";

import Home from "./components/Home";
import Aboutme from "./components/Aboutme";
import Contactme from "./components/Contactme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingCircle from "./components/FloatingCircle";
import DynamicBackground from "./components/DynamicBackground";
import NotesHome from "./components/Note";
import NoteDetail from "./components/NoteDetail";
import Note from "./components/Note";
import Tools from "./components/Tools";

import { SnackbarProvider } from "notistack";

import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { appTokens } from "./theme/tokens";

import "./components/css/App.css";

export const ThemeContext = createContext();
export const LanguageContext = createContext();

function AppFooter() {
  const location = useLocation();
  if (location.pathname === "/") return null;
  return <Footer />;
}

function AppFloatingCircle() {
  const location = useLocation();
  if (location.pathname === "/") return null;
  return <FloatingCircle />;
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "zh");

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));
  const toggleLanguage = () => setLanguage(prev => (prev === "zh" ? "en" : "zh"));

  useEffect(() => localStorage.setItem("theme", theme), [theme]);
  useEffect(() => localStorage.setItem("language", language), [language]);

  // 🟡 建立 MUI 主題（跟著你的 theme 字串切換）
  const muiTheme = useMemo(() => {
    let t = createTheme({
      breakpoints: {
        values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
      },
      palette: {
        mode: theme === "dark" ? "dark" : "light",
        // 也可在這裡客製 primary/secondary 等色票
        // primary: { main: "#4F46E5" },
      },
      // 常用的全局細節（選擇性）
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
    // 讓字體在不同斷點更順眼（可選）
    t = responsiveFontSizes(t);
    return t;
  }, [theme]);

  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={800}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
          {/* 🟡 把 ThemeProvider 放到最外層包住整個 App */}
          <ThemeProvider theme={muiTheme}>
            {/* 🟡 這行很關鍵：讓暗色模式在瀏覽器原生元件與滾動條/表單等也跟著換色 */}
            <CssBaseline enableColorScheme />

            <div className="app">
              <DynamicBackground theme={theme} />
              <Router basename={process.env.PUBLIC_URL}>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about-me" element={<Aboutme />} />
                  <Route path="/note" element={<Note />} />
                  <Route path="/contact-me" element={<Contactme />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/notes" element={<NotesHome />} />
                  <Route path="/notes/:slug" element={<NoteDetail />} />
                </Routes>
                <AppFloatingCircle />
                <AppFooter />
              </Router>
            </div>
          </ThemeProvider>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </SnackbarProvider>
  );
}
