import React, { useState, useEffect, useContext } from "react";
import { styled, alpha, ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeContext, LanguageContext } from "../App";

import { Grid, Box, Typography, Container, Paper, } from "@mui/material";
import MyCalendar from "./MyCalendar";
import Mimictypingeffects from "./effects/Mimictypingeffects";
const Contact = () => {
    const { language } = useContext(LanguageContext); // 主題狀態
    const { theme } = useContext(ThemeContext); // 主題狀態
    const themeObject = createTheme({ palette: { mode: theme === 'light' ? 'light' : 'dark' } });

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', mt: 4 }}>

            <ThemeProvider theme={themeObject}> {/* 將 ThemeProvider 包裹住組件 */}
                <Grid container spacing={2} sx={{ my: 4 }}>
                    {/* 左邊日曆區域 */}
                    <Grid item xs={12} sm={12} md={12} sx={{ display: "flex", justifyContent: "center" }}>
                        <Paper
                            elevation={(theme === 'light' ? 1 : 12)}
                            sx={{
                                padding: 2,
                                backgroundColor: theme === 'light' ? "rgba(255, 255, 255, 0.85)" : "rgba(3, 3, 3, 0.85)",
                                boxShadow: 4,
                                // borderRadius: "10px",
                                // maxWidth: 600,
                                width: "100%",
                                textAlign: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "left",
                                    gap: 1, // 設置間距
                                    marginBottom: 1,
                                }}
                            >
                                <Typography
                                    gutterBottom
                                    variant="h4"
                                    sx={{
                                        color: themeObject.palette.text.primary,
                                        whiteSpace: "nowrap", // 防止換行
                                    }}
                                >
                                    行事曆 /
                                </Typography>

                                <Mimictypingeffects
                                    textList={["有事請寄信或下方留言"]}
                                    speed={100}
                                    variant="body1"
                                    repeat={0}
                                    sx={{
                                        color: themeObject.palette.primary.main,
                                    }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    border: `1px solid ${themeObject.palette.divider}`,
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                    padding: 2,
                                }}
                            >
                                <MyCalendar />
                            </Box>
                        </Paper>
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

                </Grid>
            </ThemeProvider>
        </Container>
    );
};

export { Contact };
