import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { CvContent } from "./CvContent";
import useAppModeTheme from "../../hooks/useAppModeTheme";

const PhoneHome = () => {
    const muiTheme = useAppModeTheme();

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline enableColorScheme />
            <CvContent mobile />
        </ThemeProvider>
    );

};

export { PhoneHome };
