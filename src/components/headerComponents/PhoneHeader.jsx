import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useTheme } from "@mui/material/styles";
import {
    AppBar,
    Toolbar,
    Box,
    Button,
} from "@mui/material";
import DynamicBreadcrumbs from "../DynamicBreadcrumbs";
import { TOOLS_ROUTE_PATHS } from "../../config/tools.constants";
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

const PhoneHeader = () => {
    const { language } = useContext(LanguageContext);
    const muiTheme = useTheme();
    const semantic = resolveSemanticTokens(muiTheme.palette.mode);

    return (
        <ElevationScroll semantic={semantic}>
            <AppBar position="fixed" color="transparent" enableColorOnDark>
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
                        <Box aria-label={getNavLabel("homeAria", language)} sx={{ minWidth: 0 }}>
                            <DynamicBreadcrumbs variant="mobile" />
                        </Box>
                    </Box>
                    <Button
                        component={NavLink}
                        to={TOOLS_ROUTE_PATHS.ROOT}
                        variant="text"
                        color="inherit"
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            minWidth: "auto",
                            px: 1.2,
                            borderRadius: appTokens.radiusRoles.button,
                            whiteSpace: "nowrap",
                        }}
                    >
                        {getNavLabel("tools", language)}
                    </Button>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
};

export default PhoneHeader;
