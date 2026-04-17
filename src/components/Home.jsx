import React from "react";
import { Box } from "@mui/material";
import { PcHome } from "./homeComponents/PcHome";
import { PhoneHome } from "./homeComponents/PhoneHome";

function Home({ layoutKind = "desktop" }) {
    const isMobileLayout = layoutKind !== "desktop";

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: {
                    xs: "calc(100dvh - var(--app-header-mobile, 56px))",
                    md: "calc(100dvh - var(--app-header-desktop, 64px))",
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
