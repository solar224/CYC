import React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from '@mui/material/Tooltip';
import Stack from "@mui/material/Stack";

// icon
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CodeIcon from '@mui/icons-material/Code';
import TranslateIcon from "@mui/icons-material/Translate";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeContext, LanguageContext } from "../App";
import { appTokens } from "../theme/tokens";
const Footer = ({ compact = false, showSettings = false }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { language, toggleLanguage } = useContext(LanguageContext);

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: compact ? "transparent" : appTokens.color.footer.bg,
                color: compact ? "text.secondary" : appTokens.color.footer.fg,
                py: compact ? 0 : 3,
                textAlign: compact ? "left" : "center",
                mt: compact ? 0 : 2,
            }}
        >
            {showSettings && (
                <Stack direction="row" spacing={0.5} sx={{ mb: compact ? 0.5 : 1 }}>
                    <Tooltip title={language === "zh" ? "切換語言" : "Switch language"} placement="top">
                        <IconButton
                            onClick={toggleLanguage}
                            sx={{
                                color: compact ? "text.secondary" : appTokens.color.footer.fg,
                                p: compact ? 0.5 : 1,
                            }}
                        >
                            <TranslateIcon fontSize={compact ? "small" : "medium"} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={theme === "dark" ? "切換淺色模式" : "切換深色模式"} placement="top">
                        <IconButton
                            onClick={toggleTheme}
                            sx={{
                                color: compact ? "text.secondary" : appTokens.color.footer.fg,
                                p: compact ? 0.5 : 1,
                            }}
                        >
                            {theme === "dark" ? (
                                <LightModeIcon fontSize={compact ? "small" : "medium"} />
                            ) : (
                                <DarkModeIcon fontSize={compact ? "small" : "medium"} />
                            )}
                        </IconButton>
                    </Tooltip>
                </Stack>
            )}

        <Box
            sx={{
                display: "flex",
                justifyContent: compact ? "flex-start" : "center",
                mb: compact ? 0.5 : 1,
            }}
        >
            <Tooltip title="github" placement="top">
                <IconButton
                    href="https://github.com/solar224"
                    target="_blank"
                    rel="noopener"
                    sx={{
                        color: compact ? "text.secondary" : appTokens.color.footer.fg,
                        "&:hover": {
                            color: "#61dafb",
                        },
                        p: compact ? 0.5 : 1,
                    }}
                >
                    <GitHubIcon fontSize={compact ? "small" : "large"} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Linkedin" placement="top">
                <IconButton
                    href="https://www.linkedin.com/in/%E5%AE%87%E5%AE%B8-%E8%A9%B9-71211a347/"
                    target="_blank"
                    rel="noopener"
                    sx={{
                        color: compact ? "text.secondary" : appTokens.color.footer.fg,
                        "&:hover": {
                            color: "#0e76a8",
                        },
                        p: compact ? 0.5 : 1,
                    }}
                >
                    <LinkedInIcon fontSize={compact ? "small" : "large"} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Gmail" placement="top">
                <IconButton
                    href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=cyc.cs14@nycu.edu.tw"
                    target="_blank"
                    rel="noopener"
                    sx={{
                        color: compact ? "text.secondary" : appTokens.color.footer.fg,
                        "&:hover": {
                            color: "#db4437",
                        },
                        p: compact ? 0.5 : 1,
                    }}
                >
                    <MailOutlineIcon fontSize={compact ? "small" : "large"} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Leetcode" placement="top">
                <IconButton
                    href="https://leetcode.com/u/c_1_1/"
                    target="_blank"
                    rel="noopener"
                    sx={{
                        color: compact ? "text.secondary" : appTokens.color.footer.fg,
                        "&:hover": {
                            color: "#00FF00",
                        },
                        p: compact ? 0.5 : 1,
                    }}
                >
                    <CodeIcon fontSize={compact ? "small" : "large"} />
                </IconButton>
            </Tooltip>
        </Box>
        <Typography variant={compact ? "caption" : "body2"}>
            © 2025 <strong>[YC-Chan]</strong>. All rights reserved.
        </Typography>
        </Box>
    );
};

export default Footer;
