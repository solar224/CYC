import React, { useState, useEffect, useContext } from "react";
import { styled, alpha, ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeContext, LanguageContext } from "../App";

import { Grid, Box, Typography, Container } from "@mui/material";
import MyCalendar from "./MyCalendar";

const Contact = () => {
    const { language } = useContext(LanguageContext); // 主題狀態
    const { theme } = useContext(ThemeContext); // 主題狀態
    const themeObject = createTheme({ palette: { mode: theme === 'light' ? 'light' : 'dark' } });

    return (
        <ThemeProvider theme={themeObject}> {/* 將 ThemeProvider 包裹住組件 */}
            <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                <Grid container spacing={2}>
                    {/* 左邊日曆區域 */}
                    <Grid item xs={12} sm={12} md={6} sx={{ mt: 1.25 }}>
                        <Typography variant="h4" sx={{ textAlign: "left", padding: 0, marginBottom: 5, color: themeObject.palette.text.primary }}>
                            我的行程
                        </Typography>
                        <MyCalendar />
                    </Grid>
                    {/* 右邊留言區域 */}
                    <Grid item xs={12} sm={12} md={6} sx={{ mt: 1.25 }}>
                        <Typography variant="h4" sx={{ textAlign: "left", padding: 0, marginBottom: 5, color: themeObject.palette.text.primary }}>
                            留言區
                        </Typography>
                        {/* Add your message content here */}
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export { Contact };
