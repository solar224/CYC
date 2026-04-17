import React, { useContext, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useTheme } from "@mui/material/styles";
import { AppBar, Toolbar, Container, Tabs, Tab, Box, IconButton, Tooltip } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import LanguageIcon from "@mui/icons-material/Language";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import DynamicBreadcrumbs from "../DynamicBreadcrumbs";
import { APP_ROUTE_PATHS, MAIN_NAV_ITEMS } from "../../config/app.constants";
import { NOTES_ROUTE_PATHS } from "../../config/notes.constants";
import { TOOLS_ROUTE_PATHS } from "../../config/tools.constants";
import { LanguageContext } from "../../context/LanguageContext";
import { ThemeContext } from "../../context/ThemeContext";
import { getNavLabel } from "../../i18n/navigation";
import { appTokens, resolveSemanticTokens } from "../../theme/tokens";
import { usePreferenceSnackbar } from "../../hooks/usePreferenceSnackbar";

function ElevationScroll({ children, semantic }) {
    const trigger = useScrollTrigger({ threshold: 8 });
    return React.cloneElement(children, {
        sx: {
            backgroundColor: semantic.header.background,
            color: semantic.header.textStrong,
            opacity: trigger ? 0.92 : 1,
            backdropFilter: "saturate(180%) blur(8px)",
            borderBottom: `1px solid ${semantic.header.border}`,
            transition: "opacity .2s ease, background-color .2s ease",
        },
    });
}

const PcHeader = () => {
    const location = useLocation();
    const { language, toggleLanguage } = useContext(LanguageContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { showLanguageChanged, showThemeChanged } = usePreferenceSnackbar();
    const muiTheme = useTheme();
    const semantic = useMemo(() => resolveSemanticTokens(muiTheme.palette.mode), [muiTheme.palette.mode]);

    const handleHeaderLanguageToggle = () => {
        const nextLanguage = language === "zh" ? "en" : "zh";
        toggleLanguage();
        showLanguageChanged(nextLanguage);
    };

    const handleHeaderThemeToggle = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        toggleTheme();
        showThemeChanged(language, nextTheme);
    };

    const current = useMemo(() => {
        const p = location.pathname;
        if (p.startsWith(APP_ROUTE_PATHS.NOTE) || p.startsWith(NOTES_ROUTE_PATHS.HOME)) {
            return APP_ROUTE_PATHS.NOTE;
        }
        if (p.startsWith(TOOLS_ROUTE_PATHS.ROOT)) {
            return TOOLS_ROUTE_PATHS.ROOT;
        }
        return p;
    }, [location.pathname]);

    return (
        <ElevationScroll semantic={semantic}>
            <AppBar position="fixed" color="transparent" enableColorOnDark>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ minHeight: appTokens.layout.headerHeight.desktop }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                minWidth: 0,
                                flexGrow: 1,
                                pr: 2,
                            }}
                        >
                            <DynamicBreadcrumbs variant="desktop" />
                        </Box>

                        <Tabs
                            value={MAIN_NAV_ITEMS.some((n) => n.to === current) ? current : false}
                            textColor="inherit"
                            indicatorColor="secondary"
                            aria-label="primary navigation"
                            sx={{ ml: "auto", minHeight: 48, flexShrink: 0 }}
                        >
                            {MAIN_NAV_ITEMS.map((item) => (
                                <Tab
                                    key={item.to}
                                    value={item.to}
                                    disableRipple
                                    label={getNavLabel(item.key, language)}
                                    component={NavLink}
                                    to={item.to}
                                    sx={{
                                        minWidth: 72,
                                        textTransform: "none",
                                        fontWeight: 600,
                                        opacity: 0.72,
                                        "&.Mui-selected": { opacity: 1 },
                                        "&:hover": {
                                            opacity: 1,
                                            backgroundColor: semantic.header.hover,
                                        },
                                        borderRadius: appTokens.radiusRoles.button,
                                        px: 1.5,
                                        minHeight: 48,
                                    }}
                                />
                            ))}
                        </Tabs>
                    </Toolbar>
                </Container>

                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: 12,
                        transform: "translateY(-50%)",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        pr: 0.5,
                    }}
                >
                    <Tooltip title={language === "zh" ? "切換到 English" : "Switch to 中文"} placement="bottom">
                        <IconButton
                            size="small"
                            onClick={handleHeaderLanguageToggle}
                            sx={{
                                color: semantic.header.textSubtle,
                                borderRadius: appTokens.radiusRoles.button,
                                "&:hover": {
                                    color: semantic.header.textStrong,
                                    backgroundColor: semantic.header.hover,
                                },
                            }}
                        >
                            {language === "zh" ? <LanguageIcon fontSize="small" /> : <TranslateIcon fontSize="small" />}
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={theme === "dark" ? "切換淺色模式" : "切換深色模式"} placement="bottom">
                        <IconButton
                            size="small"
                            onClick={handleHeaderThemeToggle}
                            sx={{
                                color: semantic.header.textSubtle,
                                borderRadius: appTokens.radiusRoles.button,
                                "&:hover": {
                                    color: semantic.header.textStrong,
                                    backgroundColor: semantic.header.hover,
                                },
                            }}
                        >
                            {theme === "dark" ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                        </IconButton>
                    </Tooltip>
                </Box>
            </AppBar>
        </ElevationScroll>
    );
};

export default PcHeader;
