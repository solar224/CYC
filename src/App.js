// App.jsx
import { HashRouter as Router, Route, Routes } from "react-router-dom";
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

import { SnackbarProvider } from "notistack";

// 🟡 新增：MUI 主題
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "./components/css/App.css";

export const ThemeContext = createContext();
export const LanguageContext = createContext();

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
      palette: {
        mode: theme === "dark" ? "dark" : "light",
        // 也可在這裡客製 primary/secondary 等色票
        // primary: { main: "#4F46E5" },
      },
      // 常用的全局細節（選擇性）
      components: {
        MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
        MuiCard: { styleOverrides: { root: { backgroundImage: "none" } } },
      },
      typography: {
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans TC", "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
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
              <Router>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about-me" element={<Aboutme />} />
                  <Route path="/note" element={<Note />} />
                  <Route path="/contact-me" element={<Contactme />} />
                  <Route path="/notes" element={<NotesHome />} />
                  <Route path="/notes/:slug" element={<NoteDetail />} />
                </Routes>
                <FloatingCircle />
                <Footer />
              </Router>
            </div>
          </ThemeProvider>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </SnackbarProvider>
  );
}
