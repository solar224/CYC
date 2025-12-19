import React, { useEffect, useRef, useState, useContext } from "react";
import Tooltip from "@mui/material/Tooltip";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import TranslateIcon from "@mui/icons-material/Translate";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { useSnackbar } from "notistack";
import { ThemeContext, LanguageContext } from "../App";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FloatingCircleNoLag() {
    const circleRef = useRef(null);
    const footerSpace = 125; // 與底部距離
    const defaultBottom = 15;
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [isOneHovered, setIsOneHovered] = useState(false);
    const [isTwoHovered, setIsTwoHovered] = useState(false);
    const [open, setOpen] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { language, toggleLanguage } = useContext(LanguageContext);
    const [loclang, setLoclang] = useState(language);
    const [loctheme, setLocTheme] = useState(theme);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const windowHeight = window.innerHeight;
                    const bodyHeight = document.body.scrollHeight;
                    const distanceToBottom = bodyHeight - (scrollY + windowHeight);
                    const offset = distanceToBottom < footerSpace
                        ? footerSpace - distanceToBottom + defaultBottom
                        : defaultBottom;
                    if (circleRef.current) {
                        circleRef.current.style.bottom = `${offset}px`;
                    }
                    setShowScrollToTop(scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handSetOpen = () => {
        setOpen(true);
        setLoclang(language);
        setLocTheme(theme);
    };
    const handleClose = () => setOpen(false);

    const handSetting = () => {
        const successMessage = loclang === "en" ? "🚀 The setting is successful." : "🚀 成功修改設定。";
        if (loclang !== language) toggleLanguage();
        if (loctheme !== theme) toggleTheme();
        handleClose();
        enqueueSnackbar(successMessage, {
            variant: "success",
            style: { maxWidth: "70%", minWidth: "250px" },
        });
    };

    return (
        <>
            <div
                ref={circleRef}
                style={{
                    position: "fixed",
                    right: "15px",
                    bottom: `${defaultBottom}px`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    zIndex: 999,
                }}
            >
                {/* 回到頂部 */}
                <Tooltip title="回到最上面" placement="left">
                    <div
                        className="scroll-to-top-circle"
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "35%",
                            marginBottom: "10px",
                            backgroundColor: "#f39212",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            opacity: showScrollToTop ? 1 : 0,
                            transform: showScrollToTop ? "translateY(0)" : "translateY(70px)",
                            transition: "all 0.3s ease",
                        }}
                        onClick={handleScrollToTop}
                        onMouseEnter={() => setIsOneHovered(true)}
                        onMouseLeave={() => setIsOneHovered(false)}
                    >
                        {isOneHovered ? (
                            <KeyboardDoubleArrowUpIcon sx={{ color: "#fff", fontSize: 30 }} />
                        ) : (
                            <KeyboardArrowUpIcon sx={{ color: "#fff", fontSize: 30 }} />
                        )}
                    </div>
                </Tooltip>

                {/* 設定 */}
                <Tooltip title={language === "en" ? "setting" : "設定"} placement="left">
                    <div
                        className="floating-circle"
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "35%",
                            backgroundColor: "#28a745",
                            display: "flex",
                            alignItems: "center",
                            zIndex: '1',
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                        onClick={handSetOpen}
                        onMouseEnter={() => setIsTwoHovered(true)}
                        onMouseLeave={() => setIsTwoHovered(false)}
                    >
                        {isTwoHovered ? (
                            <SettingsRoundedIcon sx={{ color: "#fff", fontSize: 30 }} />
                        ) : (
                            <SettingsIcon sx={{ color: "#fff" }} />
                        )}
                    </div>
                </Tooltip>
            </div>

            {/* Dialog */}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
                disableScrollLock
                PaperProps={{
                    sx: {
                        backgroundColor: theme === "dark" ? "#1a1a1a" : "#fafafa",
                        borderRadius: "16px",
                        padding: "8px",
                        minWidth: "280px",
                        maxWidth: "320px",
                        boxShadow: theme === "dark"
                            ? "0 8px 32px rgba(0,0,0,0.4)"
                            : "0 8px 32px rgba(0,0,0,0.12)",
                    },
                }}
            >
                {/* Header */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px 8px",
                    borderBottom: `1px solid ${theme === "dark" ? "#333" : "#eee"}`,
                }}>
                    <span style={{
                        fontSize: "15px",
                        fontWeight: 500,
                        color: theme === "dark" ? "#e0e0e0" : "#333",
                        letterSpacing: "0.5px",
                    }}>
                        {language === "en" ? "Settings" : "設定"}
                    </span>
                    <IconButton
                        onClick={handleClose}
                        size="small"
                        sx={{
                            color: theme === "dark" ? "#888" : "#999",
                            "&:hover": {
                                backgroundColor: theme === "dark" ? "#333" : "#f0f0f0"
                            }
                        }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </div>

                {/* Content */}
                <div style={{ padding: "16px" }}>
                    {/* Language */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "12px",
                    }}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            color: theme === "dark" ? "#b0b0b0" : "#666",
                        }}>
                            <TranslateIcon sx={{ fontSize: 20 }} />
                            <span style={{ fontSize: "14px" }}>
                                {language === "en" ? "Language" : "語言"}
                            </span>
                        </div>
                        <div style={{
                            display: "flex",
                            backgroundColor: theme === "dark" ? "#2a2a2a" : "#f0f0f0",
                            borderRadius: "8px",
                            padding: "3px",
                        }}>
                            <button
                                onClick={() => setLoclang("zh")}
                                style={{
                                    padding: "6px 14px",
                                    border: "none",
                                    borderRadius: "6px",
                                    fontSize: "13px",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    backgroundColor: loclang === "zh"
                                        ? (theme === "dark" ? "#444" : "#fff")
                                        : "transparent",
                                    color: loclang === "zh"
                                        ? (theme === "dark" ? "#fff" : "#333")
                                        : (theme === "dark" ? "#888" : "#888"),
                                    boxShadow: loclang === "zh"
                                        ? "0 1px 3px rgba(0,0,0,0.1)"
                                        : "none",
                                }}
                            >
                                中文
                            </button>
                            <button
                                onClick={() => setLoclang("en")}
                                style={{
                                    padding: "6px 14px",
                                    border: "none",
                                    borderRadius: "6px",
                                    fontSize: "13px",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    backgroundColor: loclang === "en"
                                        ? (theme === "dark" ? "#444" : "#fff")
                                        : "transparent",
                                    color: loclang === "en"
                                        ? (theme === "dark" ? "#fff" : "#333")
                                        : (theme === "dark" ? "#888" : "#888"),
                                    boxShadow: loclang === "en"
                                        ? "0 1px 3px rgba(0,0,0,0.1)"
                                        : "none",
                                }}
                            >
                                EN
                            </button>
                        </div>
                    </div>

                    {/* Theme */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            color: theme === "dark" ? "#b0b0b0" : "#666",
                        }}>
                            {loctheme === "dark"
                                ? <DarkModeIcon sx={{ fontSize: 20 }} />
                                : <LightModeIcon sx={{ fontSize: 20 }} />
                            }
                            <span style={{ fontSize: "14px" }}>
                                {language === "en" ? "Theme" : "主題"}
                            </span>
                        </div>
                        <div style={{
                            display: "flex",
                            backgroundColor: theme === "dark" ? "#2a2a2a" : "#f0f0f0",
                            borderRadius: "8px",
                            padding: "3px",
                        }}>
                            <button
                                onClick={() => setLocTheme("light")}
                                style={{
                                    padding: "6px 12px",
                                    border: "none",
                                    borderRadius: "6px",
                                    fontSize: "13px",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    backgroundColor: loctheme === "light"
                                        ? (theme === "dark" ? "#444" : "#fff")
                                        : "transparent",
                                    color: loctheme === "light"
                                        ? (theme === "dark" ? "#fff" : "#333")
                                        : (theme === "dark" ? "#888" : "#888"),
                                    boxShadow: loctheme === "light"
                                        ? "0 1px 3px rgba(0,0,0,0.1)"
                                        : "none",
                                }}
                            >
                                <LightModeIcon sx={{ fontSize: 16 }} />
                            </button>
                            <button
                                onClick={() => setLocTheme("dark")}
                                style={{
                                    padding: "6px 12px",
                                    border: "none",
                                    borderRadius: "6px",
                                    fontSize: "13px",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    backgroundColor: loctheme === "dark"
                                        ? (theme === "dark" ? "#444" : "#fff")
                                        : "transparent",
                                    color: loctheme === "dark"
                                        ? (theme === "dark" ? "#fff" : "#333")
                                        : (theme === "dark" ? "#888" : "#888"),
                                    boxShadow: loctheme === "dark"
                                        ? "0 1px 3px rgba(0,0,0,0.1)"
                                        : "none",
                                }}
                            >
                                <DarkModeIcon sx={{ fontSize: 16 }} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    padding: "12px 16px",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "8px",
                    borderTop: `1px solid ${theme === "dark" ? "#333" : "#eee"}`,
                }}>
                    <button
                        onClick={handleClose}
                        style={{
                            padding: "8px 16px",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "13px",
                            cursor: "pointer",
                            backgroundColor: "transparent",
                            color: theme === "dark" ? "#888" : "#666",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = theme === "dark" ? "#2a2a2a" : "#f0f0f0";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                        }}
                    >
                        {language === "en" ? "Cancel" : "取消"}
                    </button>
                    <button
                        onClick={handSetting}
                        style={{
                            padding: "8px 20px",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "13px",
                            fontWeight: 500,
                            cursor: "pointer",
                            backgroundColor: theme === "dark" ? "#4a9eff" : "#2196f3",
                            color: "#fff",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = theme === "dark" ? "#3d8be0" : "#1976d2";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = theme === "dark" ? "#4a9eff" : "#2196f3";
                        }}
                    >
                        {language === "en" ? "Save" : "儲存"}
                    </button>
                </div>
            </Dialog>
        </>
    );
}
