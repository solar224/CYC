import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { createContext, useState, useEffect } from "react";

import Home from "./components/Home";
import Aboutme from "./components/Aboutme";
import Contactme from "./components/Contactme";

import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingCircle from "./components/FloatingCircle";
import DynamicBackground from "./components/DynamicBackground";
import Schoolcurriculum from "./components/notes/Schoolcurriculum";
import Proceduralexercises from "./components/notes/Codingpractice";
import Otherpractice from "./components/notes/Otherpractice";
import { SnackbarProvider } from "notistack";
import Note from "./components/Note";

import "./components/css/App.css";

export const ThemeContext = createContext();
export const LanguageContext = createContext();

export default function App() {
  const [theme, setTheme] = useState(() => { return localStorage.getItem('theme') || "dark" }); // 主題狀態
  const [language, setLanguage] = useState(() => { return localStorage.getItem('language') || "zh" }); // 語言狀態

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleLanguage = () => {
    setLanguage((prevTheme) => (prevTheme === "zh" ? "en" : "zh"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={800}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
          <div className={`app`}>
            <DynamicBackground theme={theme} />
            <Router>
              <Header />
              <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/about-me" element={<Aboutme />} />
                <Route path="/note" element={<Note />} />

                <Route path="/contact-me" element={<Contactme />} />
                <Route path="/note/school-curriculum" element={<Schoolcurriculum />} />
                <Route path="/note/coding-practice" element={<Proceduralexercises />} />
                <Route path="/note/other-practice" element={<Otherpractice />} />

              </Routes>
              <FloatingCircle />
              <Footer />
            </Router>
          </div>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </SnackbarProvider>
  );
}
