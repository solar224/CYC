import React from "react";
import { About } from "./Aboutme_Cmp";

const Aboutme = () => {
    return (
        <div
            className="Aboutme"
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
            <About />

        </div>
    );
};

export default Aboutme;
