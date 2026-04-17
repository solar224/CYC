// src/components/Header.jsx
import React from "react";
import PhoneHeader from "./headerComponents/PhoneHeader";
import PcHeader from "./headerComponents/PcHeader";

const Header = ({ layoutKind = "desktop" }) => {
    return layoutKind === "desktop" ? <PcHeader /> : <PhoneHeader />;
};

export default Header;
