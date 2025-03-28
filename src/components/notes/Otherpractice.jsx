import React, { useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { ThemeContext, LanguageContext } from "../../App";
import { Link } from "react-router-dom";
const Otherpractice = () => {
    const { theme } = useContext(ThemeContext);
    const themeObject = createTheme({ palette: { mode: theme === "light" ? "light" : "dark" } });
    return (

        <div
            className="Aboutme"
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
            <ThemeProvider theme={themeObject}>
                <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                    <Grid container spacing={3} sx={{ my: 4 }}>

                        尚未建構

                    </Grid>

                </Container>
            </ThemeProvider>
        </div>
    );
};

export default Otherpractice;