import React from "react";
import { About, Projects, Contact } from "./Aboutme_Cmp";

const Aboutme = () => {
    return (
        <div
            className="Aboutme"
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
            <main style={{ minHeight: "400px", flexGrow: 1 }}>
                <About />
                <Projects />
                <Contact />
            </main>
        </div>
    );
};

export default Aboutme;
