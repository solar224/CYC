import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { AppBar, Toolbar, Container, Tabs, Tab, Box } from "@mui/material";
import DynamicBreadcrumbs from "../DynamicBreadcrumbs";
import { APP_ROUTES, MAIN_NAV_ITEMS } from "../../config/constants";
import { appTokens } from "../../theme/tokens";
function ElevationScroll({ children }) {
    const trigger = useScrollTrigger({ threshold: 8 });
    return React.cloneElement(children, {
        sx: {
            backgroundColor: appTokens.color.header.bgDark,
            opacity: trigger ? 0.92 : 1,
            backdropFilter: "saturate(180%) blur(8px)",
            borderBottom: `1px solid ${appTokens.color.header.border}`,
            transition: "opacity .2s ease, background-color .2s ease",
        },
    });
}

const PcHeader = () => {
    const location = useLocation();

    const current = useMemo(() => {
        const p = location.pathname;
        if (p.startsWith(APP_ROUTES.NOTE) || p.startsWith(APP_ROUTES.NOTES)) {
            return APP_ROUTES.NOTE;
        }
        if (p.startsWith(APP_ROUTES.TOOLS)) {
            return APP_ROUTES.TOOLS;
        }
        return p;
    }, [location.pathname]);

    return (
        <ElevationScroll>
            <AppBar position="fixed">
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
                                    label={item.labelZh}
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
                                            backgroundColor: appTokens.color.header.hover,
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
