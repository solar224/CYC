import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { createContext, useState, useEffect } from "react";

import Home from "./components/Home";
import Aboutme from "./components/Aboutme";
import Contactme from "./components/Contactme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingCircle from "./components/FloatingCircle";
import "./components/css/App.css";

export const ThemeContext = createContext();
export const LanguageContext = createContext();

export default function App() {
  const [theme, setTheme] = useState(() => { return localStorage.getItem('theme') || "light" }); // 主題狀態
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
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     // 清除 localStorage
  //     localStorage.clear();
  //   };

  //   // 監聽 beforeunload 事件
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   // 清理事件監聽器
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LanguageContext.Provider value={{ language, toggleLanguage }}>
        <div className={`app ${theme}`}>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Aboutme" element={<Aboutme />} />
              <Route path="/Contactme" element={<Contactme />} />
            </Routes>
            <FloatingCircle />
            <Footer />
          </Router>
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}
