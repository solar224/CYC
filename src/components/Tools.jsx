import React, { useMemo, useState } from "react";
import {
    Container, Grid, Card, CardActionArea, CardContent, CardMedia,
    Typography, Stack, Box, TextField, InputAdornment, IconButton,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Link as RouterLink } from "react-router-dom";

const TOOL_ITEMS = [
    {
        id: "rough-frame",
        title: "RoughFrame",
        desc: "美觀的無限白板繪圖工具 — 支援手繪風格、形狀、箭頭、自由筆、文字，可匯出 PNG/SVG/JSON。",
        cover: `${process.env.PUBLIC_URL}/RoughFrame.svg`,
        tags: ["whiteboard", "drawing", "SVG"],
        to: "/tools/RoughFrame",
    },
];

const SUMMARY_MAX = 80;
const truncate = (s = "", n = SUMMARY_MAX) => {
    const arr = [...s];
    return arr.length > n ? arr.slice(0, n).join("") + "…" : s;
};

export default function Tools() {
    const [q, setQ] = useState("");

    const filtered = useMemo(() => {
        if (!q.trim()) return TOOL_ITEMS;
        const kw = q.trim().toLowerCase();
        return TOOL_ITEMS.filter((t) => {
            const hay = `${t.title} ${t.desc} ${(t.tags || []).join(" ")}`.toLowerCase();
            return hay.includes(kw);
        });
    }, [q]);

    return (
        <Box
            component="main"
            sx={{
                minHeight: { xs: "100svh", md: "100vh" },
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Container sx={{ mt: 4, mb: 6 }}>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems={{ xs: "stretch", sm: "center" }}
                    justifyContent="space-between"
                    sx={{ mb: 2 }}
                >
                    <Typography variant="h4" fontWeight={900}>小工具</Typography>

                    <TextField
                        size="small"
                        placeholder="搜尋工具名稱或說明…"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        sx={{ width: { xs: "100%", sm: 320 } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchRoundedIcon fontSize="small" />
                                </InputAdornment>
                            ),
                            endAdornment: q ? (
                                <InputAdornment position="end">
                                    <IconButton size="small" onClick={() => setQ("")}>
                                        <ClearRoundedIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ) : null,
                        }}
                    />
                </Stack>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    共 {filtered.length} 個工具
                    {q && ` · 關鍵字：「${q}」`}
                </Typography>

                {filtered.length === 0 ? (
                    <Box
                        sx={{
                            py: 8,
                            textAlign: "center",
                            color: "text.secondary",
                            border: (t) => `1px dashed ${t.palette.divider}`,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="body1" fontWeight={700}>沒有符合的工具</Typography>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                            試著更換關鍵字。
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {filtered.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.id}>
                                <Card
                                    variant="outlined"
                                    sx={(t) => ({
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        borderRadius: 5,
                                        bgcolor: alpha(t.palette.background.paper, 0.9),
                                        borderColor: t.palette.divider,
                                        boxShadow: "none",
                                    })}
                                >
                                    <CardActionArea
                                        component={RouterLink}
                                        to={item.to}
                                        sx={{ flexGrow: 1 }}
                                    >
                                        {item.cover && (
                                            <CardMedia
                                                component="img"
                                                height="160"
                                                image={item.cover}
                                                alt={item.title}
                                                sx={{ objectFit: "contain", p: 2, bgcolor: "#ffffff" }}
                                            />
                                        )}
                                        <CardContent>
                                            <Typography variant="h6" fontWeight={800} gutterBottom noWrap>
                                                {item.title}
                                            </Typography>
                                            {item.desc && (
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        overflow: "hidden",
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: "vertical",
                                                    }}
                                                >
                                                    {truncate(item.desc, SUMMARY_MAX)}
                                                </Typography>
                                            )}
                                            {item.tags && (
                                                <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
                                                    {item.tags.map((tag) => (
                                                        <Typography
                                                            key={tag}
                                                            variant="caption"
                                                            sx={(t) => ({
                                                                px: 1,
                                                                py: 0.25,
                                                                borderRadius: 1,
                                                                bgcolor: alpha(t.palette.primary.main, 0.1),
                                                                color: t.palette.primary.main,
                                                                fontWeight: 600,
                                                                fontSize: 11,
                                                            })}
                                                        >
                                                            {tag}
                                                        </Typography>
                                                    ))}
                                                </Stack>
                                            )}
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}
