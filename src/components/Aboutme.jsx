import React from "react";
import { PcAboutMe } from "./aboutMeComponents/PcAboutMe";
import { PhoneAboutMe } from "./aboutMeComponents/PhoneAboutMe";
import useMediaQuery from "@mui/material/useMediaQuery";

const Aboutme = () => {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

    return (
        <div
            className="PcAboutMe"
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
            {isMobile ? <PhoneAboutMe /> : <PcAboutMe />}
        </div>
    );
};

export default Aboutme;
