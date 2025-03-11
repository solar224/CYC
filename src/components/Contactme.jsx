import React from "react";
import { Contact } from "./Contactme_Cmp";

const Contactme = () => {
    return (
        <div
            className="Contactme"
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
            <Contact />
        </div>
    );
};

export default Contactme;
