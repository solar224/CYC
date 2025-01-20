import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import { Grid, Box, Typography, Container } from "@mui/material";
import MyCalendar from "./MyCalendar";
const Contact = () => {
    return (
        <Container id={1} sx={{ my: 4 }}>
            <Grid container spacing={2}>
                {/* 左邊日曆區域 */}
                <Grid item xs={12} sm={7}>
                    <Typography variant="h4" sx={{ textAlign: "left", padding: 0, marginBottom: 5 }}>
                        我的行程
                    </Typography>
                    <MyCalendar />
                </Grid>
                <Grid item xs={12} sm={1}>
                </Grid>
                {/* 右邊留言區域 */}
                <Grid item xs={12} sm={3}>
                    <Typography variant="h4" sx={{ textAlign: "left" }}>
                        留言區
                    </Typography>
                    {/* Add your message content here */}
                </Grid>
            </Grid>
        </Container>
    );
};

export { Contact };
