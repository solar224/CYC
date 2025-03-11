import React from "react";
import { About, Projects, Contact } from "./Aboutme_Cmp";

const Aboutme = () => {
    return (
        <div
            className="Aboutme"
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
            <About />
            {/* <Projects />
                <Contact /> */}
        </div>
    );
};

export default Aboutme;
