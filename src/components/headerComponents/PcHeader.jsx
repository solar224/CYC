import React, { useContext, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useTheme } from "@mui/material/styles";
import { AppBar, Toolbar, Container, Tabs, Tab, Box } from "@mui/material";
import DynamicBreadcrumbs from "../DynamicBreadcrumbs";
import { APP_ROUTE_PATHS, MAIN_NAV_ITEMS } from "../../config/app.constants";
import { NOTES_ROUTE_PATHS } from "../../config/notes.constants";
import { TOOLS_ROUTE_PATHS } from "../../config/tools.constants";
import { LanguageContext } from "../../context/LanguageContext";
import { getNavLabel } from "../../i18n/navigation";
import { appTokens, resolveSemanticTokens } from "../../theme/tokens";

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
    const { language } = useContext(LanguageContext);
    const muiTheme = useTheme();
    const semantic = useMemo(() => resolveSemanticTokens(muiTheme.palette.mode), [muiTheme.palette.mode]);

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
                                        borderRadius: 1.5,
                                        px: 1.5,
                                        minHeight: 48,
                                    }}
                                />
                            ))}
                        </Tabs>
                    </Toolbar>
                </Container>
            </AppBar>
        </ElevationScroll>
    );
};

export default PcHeader;
