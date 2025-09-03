// src/pages/Contact.jsx
import React, { useContext, useMemo } from "react";
import { Container, Box, Stack, Typography, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SendIcon from "@mui/icons-material/Send";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ScrollSpyProvider, SpySection, Toc } from "../shared/scrollspy";

import PcMyCalendar from "./myCalendarComponents/PcMyCalendar";
import PhoneMyCalendar from "./myCalendarComponents/PhoneMyCalendar";

import { ThemeContext } from "../App";

const Contact = () => {
    const { theme: mode } = useContext(ThemeContext);
    const muiTheme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
    const isMobile = useMediaQuery("(max-width: 965px)");

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline enableColorScheme />
            <ScrollSpyProvider headerOffset={72}>
                <Container sx={{ mt: 4, mb: 6 }}>
                    <Box sx={{ mb: 2 }}>
                        <SpySection id="行事曆" title="行事曆">
                            <Stack direction="row" alignItems="baseline" spacing={1.5}>
                                <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: 0.2, flexGrow: 1 }}>
                                    行事曆
                                </Typography>

                                <Button
                                    variant="outlined"
                                    size="small"
                                    href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=cyc.cs14@nycu.edu.tw"
                                    target="_blank"
                                    rel="noopener"
                                    endIcon={<SendIcon />}
                                    sx={(t) => ({
                                        textTransform: "none",
                                        fontWeight: 700,
                                        letterSpacing: 0.3,
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: 1.25,
                                        borderColor: t.palette.divider,
                                        color: t.palette.text.primary,
                                        bgcolor: "transparent",
                                        "&:hover": {
                                            bgcolor: t.palette.action.hover,
                                            borderColor: t.palette.text.secondary,
                                            boxShadow: t.shadows[1],
                                        },
                                    })}
                                >
                                    寄信
                                </Button>
                            </Stack>
                        </SpySection>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            以下為忙碌時段，若需聯繫請來信。
                        </Typography>
                    </Box>
                    {isMobile ? <PhoneMyCalendar /> : <PcMyCalendar />}

                </Container>
                <Toc sidebarWidth={260} collapsedWidth={18} containerMaxWidth={1200} />
            </ScrollSpyProvider>
        </ThemeProvider>
    );
};

export { Contact };
