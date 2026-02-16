// src/components/Header.jsx
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import PhoneHeader from "./headerComponents/PhoneHeader";
import PcHeader from "./headerComponents/PcHeader";

const Header = () => {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
    return isMobile ? <PhoneHeader /> : <PcHeader />;
};

export default Header;
