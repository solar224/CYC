import React from "react";
import { Box } from "@mui/material";
import { PcHome } from "./homeComponents/PcHome";
import { PhoneHome } from "./homeComponents/PhoneHome";
import { appTokens } from "../theme/tokens";

function Home({ layoutKind = "desktop" }) {
    const isMobileLayout = layoutKind !== "desktop";

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: {
                    xs: `calc(100dvh - ${appTokens.layout.headerHeight.mobile}px)`,
                    md: `calc(100dvh - ${appTokens.layout.headerHeight.desktop}px)`,
                },
                display: "flex",
                flexDirection: "column",
            }}
        >
            {isMobileLayout ? <PhoneHome /> : <PcHome />}
        </Box>
    );
}

export default Home;
