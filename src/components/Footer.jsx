import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from '@mui/material/Tooltip';

// icon
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CodeIcon from '@mui/icons-material/Code';
const Footer = () => (
    <Box
        component="footer"
        sx={{
            backgroundColor: "#222222",
            color: "#ffffff",
            py: 3,
            textAlign: "center",
            mt: 1,
        }}
    >
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                mb: 1,
            }}
        >
            <Tooltip title="github" placement="top">
                <IconButton
                    href="https://github.com/solar224"
                    target="_blank"
                    rel="noopener"
                    sx={{
                        color: "#ffffff",
                        "&:hover": {
                            color: "#61dafb",
                        },
                    }}
                >
                    <GitHubIcon fontSize="large" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Linkedin" placement="top">
                <IconButton
                    href="https://www.linkedin.com/in/%E5%AE%87%E5%AE%B8-%E8%A9%B9-71211a347/"
                    target="_blank"
                    rel="noopener"
                    sx={{
                        color: "#ffffff",
                        "&:hover": {
                            color: "#0e76a8",
                        },
                    }}
                >
                    <LinkedInIcon fontSize="large" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Gmail" placement="top">
                <IconButton
                    href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=cyc.cs14@nycu.edu.tw"
                    target="_blank"
                    rel="noopener"
                    sx={{
                        color: "#ffffff",
                        "&:hover": {
                            color: "#db4437",
                        },
                    }}
                >
                    <MailOutlineIcon fontSize="large" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Leetcode" placement="top">
                <IconButton
                    href="https://leetcode.com/u/c_1_1/"
                    target="_blank"
                    rel="noopener"
                    sx={{
                        color: "#ffffff",
                        "&:hover": {
                            color: "#00FF00",
                        },
                    }}
                >
                    <CodeIcon fontSize="large" />
                </IconButton>
            </Tooltip>
        </Box>
        <Typography variant="body2">
            © 2025 <strong>[YC-Chan]</strong>. All rights reserved.
        </Typography>
    </Box>
);

export default Footer;
