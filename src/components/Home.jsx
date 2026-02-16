import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import PcHome from "./homeComponents/PcHome";
import PhoneHome from "./homeComponents/PhoneHome";

function Home() {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
    return isMobile ? <PhoneHome /> : <PcHome />;
}

export default Home;
