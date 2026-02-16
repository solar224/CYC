import React from "react";
import { Box, Container, Typography, Stack, Card, CardContent, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const toolItems = [
    {
        title: "首頁 Bot",
        desc: "可詢問我的背景、網站功能與導覽連結。",
        to: "/",
    },
    {
        title: "筆記系統",
        desc: "可依分類與關鍵字搜尋技術筆記內容。",
        to: "/note",
    },
    {
        title: "聯絡排程",
        desc: "查看忙碌時段並快速寄信聯絡。",
        to: "/contact-me",
    },
];

export default function Tools() {
    return (
        <Box component="main" sx={{ minHeight: { xs: "100svh", md: "100vh" } }}>
            <Container sx={{ mt: 4, mb: 6 }}>
                <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>
                    小工具
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    這裡整理站內目前可直接使用的工具入口。
                </Typography>

                <Stack spacing={2}>
                    {toolItems.map((item) => (
                        <Card key={item.title} variant="outlined" sx={{ borderRadius: 2.5 }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight={800}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 1.5 }}>
                                    {item.desc}
                                </Typography>
                                <Button component={RouterLink} to={item.to} variant="outlined" size="small">
                                    前往
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
}
