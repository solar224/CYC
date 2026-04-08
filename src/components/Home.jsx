import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/material";
import { PcHome } from "./homeComponents/PcHome";
import { PhoneHome } from "./homeComponents/PhoneHome";

function Home() {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

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
            {isMobile ? <PhoneHome /> : <PcHome />}
        </Box>
    );
}

export default Home;
