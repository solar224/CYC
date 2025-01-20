import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const Footer = () => (
    <Box
        component="footer"
        sx={{
            backgroundColor: "#24292e",
            color: "#ffffff",
            py: 2,
            textAlign: "center",
            mt: 4,
        }}
    >
        <Typography variant="body2">
            © 2025 <strong>[YC-Chan]</strong>. All rights reserved.
        </Typography>
    </Box>
);

export default Footer;