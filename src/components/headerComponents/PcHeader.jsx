import React, { useContext, useMemo } from "react";
import { LanguageContext } from "../../App";
import { NavLink, useLocation } from "react-router-dom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { AppBar, Toolbar, Typography, Container, Tabs, Tab, Box } from "@mui/material";
import { keyframes } from "@mui/system";
const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;
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
    const { language } = useContext(LanguageContext);

    const current = useMemo(() => {
        const p = location.pathname;
        return p.startsWith("/note") ? "/note" : p;
    }, [location.pathname]);

    return (
        <ElevationScroll>
            <AppBar position="fixed">
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ minHeight: 64 }}>
                        <Typography
                            variant="h6"
                            component={NavLink}
                            to="/"
                            sx={{
                                display: "flex",
                                alignItems: "left",
                                gap: 1.5,
                                fontWeight: 700,
                                color: "inherit",
                                textDecoration: "none",
                                px: 1,
                                borderRadius: 1.5,
                                "&:hover": { backgroundColor: "rgba(255,255,255,0.06)" },
                            }}
                        >
                            {/* <img
                                src={`${process.env.PUBLIC_URL}/logo.png`}
                                alt={language === "zh" ? "詹宇宸" : "YC-Chan"}
                                style={{ width: 40, height: 40, borderRadius: 8 }}
                            /> */}
                            <Box
                                component="span"
                                sx={{
                                    ml: 1,
                                    fontWeight: 800,
                                    letterSpacing: .5,
                                    background:
                                        "linear-gradient(90deg, #fff, #b388ff, #80d8ff, #fff)",
                                    backgroundSize: "200% 100%",
                                    WebkitBackgroundClip: "text",
                                    color: "transparent",
                                    animation: `${shimmer} 3s linear infinite`,
                                    "@media (prefers-reduced-motion: reduce)": { animation: "none" },
                                }}
                            >
                                YC-Chan
                            </Box>
                        </Typography>

                        <Tabs
                            value={navItems.some((n) => n.to === current) ? current : false}
                            textColor="inherit"
                            indicatorColor="secondary"
                            aria-label="primary navigation"
                            sx={{ ml: "auto", minHeight: 48 }}
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
