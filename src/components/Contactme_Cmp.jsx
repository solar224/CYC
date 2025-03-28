import React, { useState, useEffect, useContext } from "react";
import { styled, alpha, ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeContext, LanguageContext } from "../App";

import { Grid, Box, Typography, Container, Paper, Button, Tooltip } from "@mui/material";
import MyCalendar from "./MyCalendar";
import Mimictypingeffects from "./effects/Mimictypingeffects";
import TextSwitcher from "./effects/TextSwitcher";

// icon
import SendIcon from '@mui/icons-material/Send';
const Contact = () => {
    const { language } = useContext(LanguageContext); // 主題狀態
    const { theme } = useContext(ThemeContext); // 主題狀態
    const themeObject = createTheme({ palette: { mode: theme === 'light' ? 'light' : 'dark' } });

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <ThemeProvider theme={themeObject}>
                <Grid container spacing={2} sx={{ my: 4 }}>
                    <Grid item xs={12} sm={12} md={12} sx={{ display: "flex", justifyContent: "center" }}>
                        <Paper
                            elevation={(theme === 'light' ? 1 : 12)}

                            sx={{
                                padding: 2,
                                borderRadius: 4,
                                marginBottom: 2,
                                transition: "all 0.3s",

                                backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.92)" : "rgba(18, 18, 18, 0.92)",
                                boxShadow: 4,
                                width: "100%",
                                textAlign: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
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
                                        行事曆
                                    </Typography>
                                </Box>
                                <Tooltip title="點擊可編輯郵件" placement="left">
                                    <Button
                                        variant="outlined"
                                        sx={{ marginLeft: 'auto' }}
                                        href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=C110110157@nkust.edu.tw"
                                        target="_blank"
                                        rel="noopener"
                                        endIcon={<SendIcon />}    // 圖示放文字右側
                                    >
                                        寄信
                                    </Button>
                                </Tooltip>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "left",
                                    marginBottom: 1,
                                }}
                            >*
                                <Mimictypingeffects
                                    textList={[
                                        "以下為忙碌時間，有事請寄信。",
                                        "繁忙的日子，讓人無心空閑懊惱。",
                                        "人生旅途中有陽光、有風雨雷電。",
                                    ]}
                                    speed={150}
                                    variant="body2"
                                    repeat={1}
                                    sx={{
                                        color: themeObject.palette.primary.main,
                                    }}
                                />

                            </Box>
                            <Box
                                sx={{
                                    border: `0.5px solid ${themeObject.palette.divider}`,
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                    padding: 0.5,
                                }}
                            >
                                <MyCalendar />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </Container>
    );
};

export { Contact };
