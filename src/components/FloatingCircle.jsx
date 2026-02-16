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
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import { useSnackbar } from "notistack";
import { ThemeContext, LanguageContext } from "../App";
import { appTokens } from "../theme/tokens";
import { getAppDialogSx } from "../shared/dialog/dialogStyles";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FloatingCircleNoLag() {
    const circleRef = useRef(null);
    const footerSpace = appTokens.layout.floating.footerSpace;
    const defaultBottom = appTokens.layout.floating.bottom;
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [isOneHovered, setIsOneHovered] = useState(false);
    const [isTwoHovered, setIsTwoHovered] = useState(false);
    const [open, setOpen] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { language, toggleLanguage } = useContext(LanguageContext);
    const [loclang, setLoclang] = useState(language);
    const [loctheme, setLocTheme] = useState(theme);
    const isDark = theme === "dark";
    const dialogSx = getAppDialogSx(isDark);

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
    }, [defaultBottom, footerSpace]);

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
                    right: `${appTokens.layout.floating.right}px`,
                    bottom: `${defaultBottom}px`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    zIndex: appTokens.layout.floating.zIndex,
                }}
            >
                {/* 回到頂部 */}
                <Tooltip title="回到最上面" placement="left">
                    <div
                        className="scroll-to-top-circle"
                        style={{
                            width: `${appTokens.layout.floating.size}px`,
                            height: `${appTokens.layout.floating.size}px`,
                            borderRadius: "35%",
                            marginBottom: `${appTokens.layout.floating.gap}px`,
                            backgroundColor: appTokens.color.accent.up,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            opacity: showScrollToTop ? 1 : 0,
                            transform: showScrollToTop ? "translateY(0)" : "translateY(70px)",
                            transition: `all ${appTokens.motion.normal}`,
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
                            width: `${appTokens.layout.floating.size}px`,
                            height: `${appTokens.layout.floating.size}px`,
                            borderRadius: "35%",
                            backgroundColor: appTokens.color.accent.setting,
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
                PaperProps={{ sx: dialogSx.paper }}
            >
                <DialogTitle sx={dialogSx.titleRow}>
                    <Box component="span" sx={dialogSx.titleText}>
                        {language === "en" ? "Settings" : "設定"}
                    </Box>
                    <IconButton onClick={handleClose} size="small" sx={dialogSx.closeButton}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={dialogSx.content}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, color: dialogSx.bodyText.color }}>
                            <TranslateIcon sx={{ fontSize: 20 }} />
                            <Box component="span" sx={{ fontSize: appTokens.typography.size.md }}>
                                {language === "en" ? "Language" : "語言"}
                            </Box>
                        </Box>
                        <Box sx={dialogSx.segmentWrap}>
                            <Button onClick={() => setLoclang("zh")} sx={dialogSx.segmentButton(loclang === "zh")}>
                                中文
                            </Button>
                            <Button onClick={() => setLoclang("en")} sx={dialogSx.segmentButton(loclang === "en")}>
                                EN
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, color: dialogSx.bodyText.color }}>
                            {loctheme === "dark" ? <DarkModeIcon sx={{ fontSize: 20 }} /> : <LightModeIcon sx={{ fontSize: 20 }} />}
                            <Box component="span" sx={{ fontSize: appTokens.typography.size.md }}>
                                {language === "en" ? "Theme" : "主題"}
                            </Box>
                        </Box>
                        <Box sx={dialogSx.segmentWrap}>
                            <Button onClick={() => setLocTheme("light")} sx={dialogSx.segmentButton(loctheme === "light")}>
                                <LightModeIcon sx={{ fontSize: 16 }} />
                            </Button>
                            <Button onClick={() => setLocTheme("dark")} sx={dialogSx.segmentButton(loctheme === "dark")}>
                                <DarkModeIcon sx={{ fontSize: 16 }} />
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions sx={dialogSx.footer}>
                    <Button onClick={handleClose} sx={dialogSx.cancelButton}>
                        {language === "en" ? "Cancel" : "取消"}
                    </Button>
                    <Button variant="contained" disableElevation onClick={handSetting} sx={dialogSx.primaryButton}>
                        {language === "en" ? "Save" : "儲存"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
