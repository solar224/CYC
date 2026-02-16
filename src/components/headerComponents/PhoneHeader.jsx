import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../../App";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import {
    AppBar,
    Toolbar,
    Box,
    Button,
} from "@mui/material";
import DynamicBreadcrumbs from "../DynamicBreadcrumbs";
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

const PhoneHeader = () => {
    const { language } = useContext(LanguageContext);

    return (
        <ElevationScroll>
            <AppBar position="fixed">
                <Toolbar sx={{ minHeight: appTokens.layout.headerHeight.mobile, px: 1 }}>
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
                    <Button
                        component={NavLink}
                        to="/tools"
                        variant="text"
                        color="inherit"
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            minWidth: "auto",
                            px: 1.2,
                            borderRadius: 1.25,
                            whiteSpace: "nowrap",
                        }}
                    >
                        {language === "zh" ? "小工具" : "Tools"}
                    </Button>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
};

export default PhoneHeader;
