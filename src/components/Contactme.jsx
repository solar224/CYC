import React from "react";
import { Contact } from "./Contactme_Cmp";

const Contactme = () => {
    return (
        <div
            className="Contactme"
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
            <main style={{ minHeight: "400px", flexGrow: 1 }}>
                <Contact />
            </main>
        </div>
    );
};

export default Contactme;
