import React, { useState, useEffect, useContext } from "react";
import { styled, alpha, ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeContext, LanguageContext } from "../App";

import { Grid, Box, Typography, Container, Paper } from "@mui/material";
import MyCalendar from "./MyCalendar";

const Contact = () => {
    const { language } = useContext(LanguageContext); // 主題狀態
    const { theme } = useContext(ThemeContext); // 主題狀態
    const themeObject = createTheme({ palette: { mode: theme === 'light' ? 'light' : 'dark' } });
    const ThemeProviderTheme = createTheme({ palette: { mode: (theme === 'light' ? 'light' : 'dark') } });

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', mt: 4 }}>

            <ThemeProvider theme={themeObject}> {/* 將 ThemeProvider 包裹住組件 */}
                <Grid container spacing={2} sx={{ my: 4 }}>
                    <ThemeProvider theme={ThemeProviderTheme}>
                        {/* 左邊日曆區域 */}
                        <Grid item xs={12} sm={12} md={12} >
                            <Typography variant="h4" sx={{ textAlign: "left", marginBottom: 5, color: themeObject.palette.text.primary }}>
                                我的行事曆
                            </Typography>

                            <MyCalendar />
                        </Grid>
                        {/* 右邊留言區域 */}

                        <Grid item xs={12} sm={12} md={12} >

                            <Typography variant="h4" sx={{ textAlign: "left", padding: 0, marginBottom: 5, color: themeObject.palette.text.primary }}>
                                留言區
                            </Typography>
                            <Paper
                                id="mycalender"
                                elevation={(theme === 'light' ? 3 : 3)}
                                sx={{ width: "100%", my: 4, marginBottom: 2, backgroundColor: theme === 'light' ? "rgba(255, 255, 255, 0.85)" : "rgba(3, 3, 3, 0.85)" }}
                            >

                            </Paper>
                            {/* Add your message content here */}
                        </Grid>
                    </ThemeProvider>

                </Grid>
            </ThemeProvider>
        </Container>
    );
};

export { Contact };
