import React from "react";
import { Contact } from "./Contactme_Cmp";

const Contactme = ({ calendarVariant = "desktop" }) => {
    return (
        <div
            className="Contactme"
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
            <Contact calendarVariant={calendarVariant} />
        </div>
    );
};

export default Contactme;
