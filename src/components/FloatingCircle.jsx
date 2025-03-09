import React, { useEffect, useState, useContext } from "react";
import "./css/FloatingCircle.css";
import { ThemeContext, LanguageContext } from "../App";
import Tooltip from '@mui/material/Tooltip';

// icon
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import AbcIcon from '@mui/icons-material/Abc';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import GTranslateIcon from '@mui/icons-material/GTranslate';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function FloatingCircle() {
    const [isOpen, setIsOpen] = useState(() => { return localStorage.getItem('isOpen') || 0 }); // 管理第二個圓圈是否展開的狀態
    const [bottomOffset, setBottomOffset] = useState(20); // 初始距離底部的偏移量
    const [showScrollToTop, setShowScrollToTop] = useState(false); // 控制是否顯示滾動到頂部按鈕
    const [isClosing, setIsClosing] = useState(false); // 用於追踪收起動畫
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { language, toggleLanguage } = useContext(LanguageContext);
    const [isOneHovered, setIsOneHovered] = useState(false);
    const [isTwoHovered, setIsTwoHovered] = useState(false);

    const handleScrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); };
    const toggleSettings = () => {
        if (isOpen === 1) {
            // 先觸發收起動畫
            setIsClosing(true);
            setTimeout(() => {
                setIsOpen(0); // 在動畫結束後實際關閉
                setIsClosing(false);
            }, 300); // 與動畫時長一致
        } else {
            setIsOpen(1);
        }
    };
    useEffect(() => {
        // 當 activePage 變化時，將其儲存到 localStorage
        localStorage.setItem("isOpen", isOpen);
    }, [isOpen]);
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY; // 目前捲動的垂直位置
            const scrollBottom =
                document.documentElement.scrollHeight -
                window.innerHeight -
                window.scrollY;
            if (scrollBottom < 60) {
                setBottomOffset(60); // 距離底部小於 60px 時，將偏移量設為 60px
            } else {
                setBottomOffset(20); // 否則，保持默認偏移量
            }
            // 判斷是否顯示 "返回頂部" 按鈕（當滾動超過 50px 才顯示）
            setShowScrollToTop(currentScrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div
            className="floating-circle-container"
            style={{ bottom: `${bottomOffset}px` }} // 動態調整距離底部的偏移量
        >
            {/* 第一個圓圈：滾動到頁面頂部，根據 showScrollToTop 判斷是否顯示 */}
            <Tooltip title="回到最上面" placement="left">
                <div
                    className={`floating-circle scroll-to-top-circle ${showScrollToTop ? "visible" : ""
                        }`}
                    style={{
                        transform: showScrollToTop
                            ? "translateY(0px)" // 從第二顆圓圈向上滑出
                            : "translateY(70px)", // 回到第二顆圓圈位置
                        opacity: showScrollToTop ? 1 : 0, // 控制透明度
                    }}
                    onMouseEnter={() => setIsOneHovered(true)}  // 滑鼠進入時切換
                    onMouseLeave={() => setIsOneHovered(false)} // 滑鼠離開時恢復

                    onClick={handleScrollToTop}
                >
                    {isOneHovered ? (
                        <KeyboardDoubleArrowUpIcon className="icon" sx={{ fontSize: 30 }} />
                    ) : (
                        <KeyboardArrowUpIcon className="icon" sx={{ fontSize: 30 }} />
                    )}
                </div>
            </Tooltip>
            {/* 第二個圓圈：設置按鈕 */}
            <Tooltip title={isOpen === 1 ? "關閉設定" : "設定"} placement="left">
                <div
                    className={`floating-circle settings-circle ${isClosing ? "closing" : ""}`}
                    onClick={toggleSettings}
                    onMouseEnter={() => setIsTwoHovered(true)}  // 滑鼠進入時切換
                    onMouseLeave={() => setIsTwoHovered(false)} // 滑鼠離開時恢復
                >
                    {isOpen === 1 ? (isTwoHovered ? <CloseRoundedIcon className="icon" sx={{ fontSize: 30 }} /> : <CloseRoundedIcon className="icon" />) :
                        (isTwoHovered ? <SettingsRoundedIcon className="icon" sx={{ fontSize: 30 }} /> : <SettingsIcon className="icon" />)
                    }
                </div>
            </Tooltip>
            {/* 展開的圓圈，根據 isOpen 狀態顯示 */}
            {isOpen === 1 ? (
                <div className={`expanded-circles ${isClosing ? "closing" : ""}`}>
                    {/* 控制語言 (中、英) */}
                    <div className="floating-circle extra-circle">
                        <Tooltip title={(language === "zh" ? "中文" : "英文")} placement="left">
                            <div
                                onClick={toggleLanguage}
                                style={{
                                    backgroundColor: theme === "zh" ? "#555" : "#555",
                                    color: theme === "zh" ? "#555" : "#555",
                                    borderRadius: "50%",
                                    width: "47px",
                                    height: "47px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                }}
                            >
                                {language === "zh" ? <GTranslateIcon className="icon-GTranslateIcon" /> : <AbcIcon className="icon-AbcIconIcon" />}
                            </div>
                        </Tooltip>
                    </div>
                    {/* 控制背景 (暗、亮) */}
                    <div className="floating-circle extra-circle">
                        <Tooltip title={(theme === "light" ? "淺色" : "深色")} placement="left">
                            <div
                                onClick={toggleTheme}
                                style={{
                                    backgroundColor: theme === "light" ? "#fff" : "#555",
                                    color: theme === "light" ? "#555" : "#fff",
                                    borderRadius: "50%",
                                    width: "47px",
                                    height: "47px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                }}
                            >
                                {theme === "light" ? <LightModeIcon className="icon-LightModeIcon" /> : <NightlightIcon className="icon-NightlightIcon" />}
                            </div>
                        </Tooltip>
                    </div>

                    <div className="floating-circle extra-circle">
                        <div
                            onClick={toggleTheme}
                            style={{
                                backgroundColor: theme === "light" ? "#fff" : "#555",
                                color: theme === "light" ? "#555" : "#fff",
                                borderRadius: "50%",
                                width: "47px",
                                height: "47px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                            }}
                        >
                            {theme === "light" ? <LightModeIcon className="icon-LightModeIcon" /> : <NightlightIcon className="icon-NightlightIcon" />}
                        </div>
                    </div>
                </div>
            ) : null
            }
        </div >
    );
}
