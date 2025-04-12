import React, { useEffect, useRef, useState, useContext } from "react";
import Tooltip from "@mui/material/Tooltip";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
                keepMounted
                onClose={handleClose}
                fullWidth
                disableScrollLock
                aria-hidden="false"
                PaperProps={{
                    sx: {
                        backgroundColor: theme === "dark" ? "#333" : "#fff",
                        color: theme === "dark" ? "#fff" : "#000",
                    },
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handSetting();
                    }
                }}
            >
                <DialogTitle>{language === "en" ? "setting" : "設定"}</DialogTitle>
                <DialogContent>
                    <DialogContentText component="div">
                        <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
                            <Typography variant="body1" sx={{
                                mr: 1, color: theme === "dark" ? "#fff" : "#000",
                            }}>
                                {language === "zh" ? "顯示語言：" : "Language:"}
                            </Typography>
                            <Button
                                onClick={() => setLoclang("zh")}
                                variant={loclang === "zh" ? "contained" : "outlined"}
                                sx={{ mr: 1 }}
                            >
                                中文
                            </Button>
                            <Button
                                onClick={() => setLoclang("en")}
                                variant={loclang === "en" ? "contained" : "outlined"}
                            >
                                English
                            </Button>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
                            <Typography variant="body1" sx={{
                                mr: 1, color: theme === "dark" ? "#fff" : "#000",
                            }}>
                                {language === "zh" ? "背景顏色：" : "Theme:"}
                            </Typography>
                            <Button
                                onClick={() => setLocTheme("dark")}
                                variant={loctheme === "dark" ? "contained" : "outlined"}
                                sx={{ mr: 1 }}
                            >
                                深色
                            </Button>
                            <Button
                                onClick={() => setLocTheme("light")}
                                variant={loctheme === "light" ? "contained" : "outlined"}
                            >
                                淺色
                            </Button>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                        {language === "en" ? "Cancel" : "取消"}
                    </Button>
                    <Button variant="contained" onClick={handSetting}>
                        {language === "en" ? "Confirm" : "確認"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
