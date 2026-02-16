import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { AppBar, Toolbar, Container, Tabs, Tab, Box } from "@mui/material";
import DynamicBreadcrumbs from "../DynamicBreadcrumbs";
function ElevationScroll({ children }) {
    const trigger = useScrollTrigger({ threshold: 8 });
    return React.cloneElement(children, {
        sx: {
            backgroundColor: "#121212",
            opacity: trigger ? 0.92 : 1,
            backdropFilter: "saturate(180%) blur(8px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            transition: "opacity .2s ease, background-color .2s ease",
        },
    });
}

const navItems = [
    { label: "首頁", to: "/" },
    { label: "關於我", to: "/about-me" },
    { label: "聯絡", to: "/contact-me" },
    { label: "筆記", to: "/note" },
];

const PcHeader = () => {
    const location = useLocation();

    const current = useMemo(() => {
        const p = location.pathname;
        return p.startsWith("/note") || p.startsWith("/notes") ? "/note" : p;
    }, [location.pathname]);

    return (
        <ElevationScroll>
            <AppBar position="fixed">
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ minHeight: 64 }}>
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
                            value={navItems.some((n) => n.to === current) ? current : false}
                            textColor="inherit"
                            indicatorColor="secondary"
                            aria-label="primary navigation"
                            sx={{ ml: "auto", minHeight: 48, flexShrink: 0 }}
                        >
                            {navItems.map((item) => (
                                <Tab
                                    key={item.to}
                                    value={item.to}
                                    disableRipple
                                    label={item.label}
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
                                            backgroundColor: "rgba(255,255,255,0.04)",
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
