import React, { useContext, useMemo, useState } from "react";
import { ThemeContext, LanguageContext } from "../../App";
import { NavLink, useLocation } from "react-router-dom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { keyframes } from "@mui/system";
import DynamicBreadcrumbs from "../DynamicBreadcrumbs";
const pulseBar = keyframes`
  0%, 100% { opacity: .85; transform: translateY(-50%) scaleY(.96); }
  50%      { opacity: 1;   transform: translateY(-50%) scaleY(1); }
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

const PhoneHeader = () => {
    const location = useLocation();
    const { language } = useContext(LanguageContext);

    const { theme } = useContext(ThemeContext);
    const [open, setOpen] = useState(false);

    // 將 /note/xxx 正規化為 /note，保證選中狀態
    const current = useMemo(() => {
        const p = location.pathname;
        return p.startsWith("/note") || p.startsWith("/notes") ? "/note" : p;
    }, [location.pathname]);

    const DrawerList = (
        <Box
            role="presentation"
            onClick={() => setOpen(false)}
            onKeyDown={() => setOpen(false)}
            sx={{ width: 200 }}
        >
            <List
                sx={(muiTheme) => ({
                    p: 1,
                    "& .MuiListItemButton-root": {
                        position: "relative",
                        borderRadius: 12,
                        gap: 4,
                        px: 1.25,
                        // 基礎狀態
                        "& .MuiListItemIcon-root": { minWidth: 36, color: "inherit" },
                    },

                    "& .MuiListItemButton-root:hover": {
                        backgroundColor:
                            muiTheme.palette.mode === "light"
                                ? "rgba(0,0,0,0.04)"
                                : "rgba(255,255,255,0.06)",
                    },

                    "& .MuiListItemButton-root.Mui-selected": {
                        color:
                            muiTheme.palette.mode === "light"
                                ? muiTheme.palette.primary.main
                                : "#fff",
                        background:
                            muiTheme.palette.mode === "light"
                                ? `linear-gradient(90deg,
               ${muiTheme.palette.primary.main}14,
               ${muiTheme.palette.secondary.main}0f)`
                                : `linear-gradient(90deg,
               ${muiTheme.palette.primary.main}22,
               ${muiTheme.palette.secondary.main}14)`,
                        border: `1px solid ${muiTheme.palette.primary.main}55`,
                        boxShadow:
                            muiTheme.palette.mode === "light"
                                ? "0 1px 2px rgba(0,0,0,.06)"
                                : "0 1px 2px rgba(0,0,0,.35)",

                        "&::before": {
                            content: '""',
                            position: "absolute",
                            left: 8,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: 6,
                            height: 24,
                            borderRadius: 3,
                            background: `linear-gradient(180deg,
          ${muiTheme.palette.primary.main},
          ${muiTheme.palette.secondary.main})`,
                            boxShadow: `0 0 10px ${muiTheme.palette.primary.main}AA`,
                            animation: `${pulseBar} 2s ease-in-out infinite`,
                        },

                        "& .MuiListItemIcon-root": {
                            color: muiTheme.palette.primary.main,
                        },
                    },

                    "@media (prefers-reduced-motion: reduce)": {
                        "& .MuiListItemButton-root.Mui-selected::before": { animation: "none" },
                    },
                })}
            >
                {navItems.map((item) => (
                    <ListItemButton
                        key={item.to}
                        component={NavLink}
                        to={item.to}
                        selected={current === item.to}
                        sx={{ alignItems: "center" }} // 保持垂直置中
                    >
                        {/* 如果未來要加左側圖示，就放在這裡 */}
                        <ListItemText
                            primary={item.label}
                            sx={{ ml: "auto", pr: 1 }}                  // 推到最右 + 稍微留點右邊距
                            primaryTypographyProps={{ sx: { textAlign: "right", fontWeight: 600 } }}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );

    return (
        <ElevationScroll>
            <AppBar position="fixed">
                <Toolbar sx={{ minHeight: 56, px: 1 }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open navigation menu"
                        onClick={() => setOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            minWidth: 0,
                            flexGrow: 1,
                            px: 0.5,
                        }}
                    >
                        <Box aria-label={language === "zh" ? "返回首頁" : "Go Home"} sx={{ minWidth: 0 }}>
                            <DynamicBreadcrumbs variant="mobile" />
                        </Box>
                    </Box>
                </Toolbar>

                {/* Drawer */}
                <Drawer
                    anchor="left"
                    open={open}
                    onClose={() => setOpen(false)}
                    ModalProps={{ keepMounted: true }}
                    PaperProps={{
                        sx: {
                            backgroundColor: theme === "light" ? "#fff" : "#222",
                            color: theme === "light" ? "text.primary" : "#fff",
                        },
                    }}
                >
                    {DrawerList}
                </Drawer>
            </AppBar>
        </ElevationScroll>
    );
};

export default PhoneHeader;
