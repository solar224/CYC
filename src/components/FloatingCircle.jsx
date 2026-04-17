import React, { useEffect, useRef, useState, useContext } from "react";
import Tooltip from "@mui/material/Tooltip";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import TranslateIcon from "@mui/icons-material/Translate";
import LanguageIcon from "@mui/icons-material/Language";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import useMediaQuery from "@mui/material/useMediaQuery";
import { alpha, useTheme as useMuiTheme } from "@mui/material/styles";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import { appTokens, resolveSemanticTokens } from "../theme/tokens";
import { getAppDialogSx } from "../shared/dialog/dialogStyles";
import { t } from "../i18n/messages";
import { usePreferenceSnackbar } from "../hooks/usePreferenceSnackbar";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FloatingCircleNoLag() {
    const circleRef = useRef(null);
    const footerSpace = appTokens.layout.floating.footerSpace;
    const defaultBottom = appTokens.layout.floating.bottom;
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [open, setOpen] = useState(false);

    const { showSettingsSaved } = usePreferenceSnackbar();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { language, toggleLanguage } = useContext(LanguageContext);
    const muiTheme = useMuiTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
    const semantic = resolveSemanticTokens(muiTheme.palette.mode);
    const typography = appTokens.typography.roles;
    const [loclang, setLoclang] = useState(language);
    const [loctheme, setLocTheme] = useState(theme);
    const dialogSx = getAppDialogSx(theme, muiTheme);
    const settingRowSx = {
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "stretch" : "center",
        justifyContent: "space-between",
        gap: isMobile ? 1 : 0,
        minHeight: isMobile ? 0 : 44,
    };
    const settingLabelSx = {
        display: "inline-flex",
        alignItems: "center",
        gap: 1.25,
        minHeight: isMobile ? 28 : 40,
        color: dialogSx.bodyText.color,
    };
    const uniformSegmentButtonSx = (active) => ({
        ...dialogSx.segmentButton(active),
        width: isMobile ? 52 : 56,
        minWidth: isMobile ? 52 : 56,
        height: isMobile ? 32 : 34,
        minHeight: isMobile ? 32 : 34,
        px: 0,
        py: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
    });
    const baseButtonStyle = {
        width: `${isMobile ? 48 : appTokens.layout.floating.size}px`,
        height: `${isMobile ? 48 : appTokens.layout.floating.size}px`,
        borderRadius: appTokens.radiusRoles.fab,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        border: `1px solid ${alpha(appTokens.core.white, 0.35)}`,
        boxShadow: `0 12px 28px ${alpha(muiTheme.palette.common.black, muiTheme.palette.mode === "dark" ? 0.42 : 0.2)}`,
        backdropFilter: "blur(6px)",
    };

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const windowHeight = window.innerHeight;
                    const bodyHeight = document.body.scrollHeight;
                    const distanceToBottom = bodyHeight - (scrollY + windowHeight);
                    const baseBottom = isMobile ? 12 : defaultBottom;
                    const mobileFooterSpace = isMobile ? Math.max(96, footerSpace - 24) : footerSpace;
                    const offset = distanceToBottom < mobileFooterSpace
                        ? mobileFooterSpace - distanceToBottom + baseBottom
                        : baseBottom;
                    if (circleRef.current) {
                        circleRef.current.style.bottom = `calc(${offset}px + env(safe-area-inset-bottom, 0px))`;
                    }
                    setShowScrollToTop(scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [defaultBottom, footerSpace, isMobile]);

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
        if (loclang !== language) toggleLanguage();
        if (loctheme !== theme) toggleTheme();
        handleClose();
        showSettingsSaved(loclang);
    };

    return (
        <>
            <div
                ref={circleRef}
                style={{
                    position: "fixed",
                    right: `calc(${isMobile ? 12 : appTokens.layout.floating.right}px + env(safe-area-inset-right, 0px))`,
                    bottom: `calc(${isMobile ? 12 : defaultBottom}px + env(safe-area-inset-bottom, 0px))`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    zIndex: appTokens.layout.floating.zIndex,
                }}
            >
                {/* 回到頂部 */}
                <Tooltip title={t("floating.backToTop", language)} placement="left">
                    <div
                        style={{
                            marginBottom: `${appTokens.layout.floating.gap}px`,
                            ...baseButtonStyle,
                            background: `linear-gradient(150deg, ${semantic.action.scrollToTop}, ${alpha(semantic.action.scrollToTop, 0.72)})`,
                            opacity: showScrollToTop ? 1 : 0,
                            transform: showScrollToTop ? "translateY(0)" : "translateY(70px)",
                            transition: `all ${appTokens.motion.normal}`,
                            pointerEvents: showScrollToTop ? "auto" : "none",
                        }}
                        onClick={handleScrollToTop}
                    >
                        <KeyboardArrowUpIcon sx={{ color: appTokens.core.white, fontSize: isMobile ? 26 : 30 }} />
                    </div>
                </Tooltip>

                {/* 設定 */}
                <Tooltip title={t("floating.settings", language)} placement="left">
                    <div
                        style={{
                            ...baseButtonStyle,
                            zIndex: "1",
                            background: `linear-gradient(150deg, ${semantic.action.settings}, ${alpha(semantic.action.settings, 0.72)})`,
                        }}
                        onClick={handSetOpen}
                    >
                        <SettingsIcon sx={{ color: appTokens.core.white, fontSize: isMobile ? 24 : 28 }} />
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
                        ...dialogSx.paper,
                        width: { xs: "min(92vw, 360px)", sm: "auto" },
                        minWidth: { xs: "unset", sm: dialogSx.paper.minWidth },
                    },
                }}
            >
                <DialogTitle sx={dialogSx.titleRow}>
                    <Box component="span" sx={dialogSx.titleText}>
                        {t("floating.settings", language)}
                    </Box>
                    <IconButton onClick={handleClose} size="small" sx={dialogSx.closeButton}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={dialogSx.content}>
                    <Box sx={{ ...settingRowSx, mb: 1.5 }}>
                        <Box sx={settingLabelSx}>
                            {loclang === "zh" ? <LanguageIcon sx={{ fontSize: 20 }} /> : <TranslateIcon sx={{ fontSize: 20 }} />}
                            <Box component="span" sx={{ fontSize: typography.body.fontSize }}>
                                {t("floating.language", language)}
                            </Box>
                        </Box>
                        <Box sx={{ ...dialogSx.segmentWrap, minHeight: 40, alignItems: "center", alignSelf: isMobile ? "flex-end" : "auto" }}>
                            <Button onClick={() => setLoclang("zh")} sx={uniformSegmentButtonSx(loclang === "zh")}>
                                中文
                            </Button>
                            <Button onClick={() => setLoclang("en")} sx={uniformSegmentButtonSx(loclang === "en")}>
                                EN
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={settingRowSx}>
                        <Box sx={settingLabelSx}>
                            {loctheme === "dark" ? <DarkModeIcon sx={{ fontSize: 20 }} /> : <LightModeIcon sx={{ fontSize: 20 }} />}
                            <Box component="span" sx={{ fontSize: typography.body.fontSize }}>
                                {t("floating.theme", language)}
                            </Box>
                        </Box>
                        <Box sx={{ ...dialogSx.segmentWrap, minHeight: 40, alignItems: "center", alignSelf: isMobile ? "flex-end" : "auto" }}>
                            <Button onClick={() => setLocTheme("light")} sx={uniformSegmentButtonSx(loctheme === "light")}>
                                <LightModeIcon sx={{ fontSize: 16 }} />
                            </Button>
                            <Button onClick={() => setLocTheme("dark")} sx={uniformSegmentButtonSx(loctheme === "dark")}>
                                <DarkModeIcon sx={{ fontSize: 16 }} />
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions sx={dialogSx.footer}>
                    <Button onClick={handleClose} sx={dialogSx.cancelButton}>
                        {t("floating.cancel", language)}
                    </Button>
                    <Button variant="contained" disableElevation onClick={handSetting} sx={dialogSx.primaryButton}>
                        {t("floating.save", language)}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
