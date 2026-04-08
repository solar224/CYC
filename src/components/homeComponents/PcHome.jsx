import React, { useContext, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { CvContent } from "./CvContent";

import { ThemeContext } from "../../App";

const PcHome = () => {
    const { theme } = useContext(ThemeContext);
    const muiTheme = useMemo(
        () =>
            createTheme({
                palette: { mode: theme === "dark" ? "dark" : "light" },
            }),
        [theme]
    );

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline enableColorScheme />
            <CvContent />
        </ThemeProvider>
    );
};

export { PcHome };
