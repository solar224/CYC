// src/components/notes/NoteCard.jsx
import React from "react";
import {
    Card, CardActionArea, CardContent, Chip, Stack, Typography, Box
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import { Link } from "react-router-dom";

export default function NoteCard({ note }) {
    const t = useTheme();

    return (
        <Card
            variant="outlined"
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                // ✅ 背景改為完全透明
                bgcolor: "transparent",
                borderColor: alpha(t.palette.divider, 0.6),
                overflow: "hidden",
                transition: "transform .18s ease, box-shadow .18s ease, border-color .2s ease",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: t.shadows[3],
                    borderColor: alpha(t.palette.text.primary, 0.25),
                },
            }}
        >
            <CardActionArea
                component={Link}
                to={`/notes/${note.slug}`}
                sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}
            >
                {/* 封面：固定 16:9，避免版面跳動 */}
                <Box sx={{ position: "relative" }}>
                    <Box sx={{ width: 1, aspectRatio: "16 / 9", overflow: "hidden" }}>
                        {note.cover ? (
                            <Box
                                component="img"
                                src={note.cover}
                                alt={note.title}
                                loading="lazy"
                                sx={{
                                    width: 1,
                                    height: 1,
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    width: 1,
                                    height: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: `linear-gradient(135deg, ${alpha(
                                        t.palette.primary.main, 0.15
                                    )}, ${alpha(t.palette.secondary.main, 0.15)})`,
                                }}
                            >
                                <ImageRoundedIcon sx={{ fontSize: 48, color: alpha(t.palette.text.primary, 0.35) }} />
                            </Box>
                        )}
                    </Box>

                    {/* 漸層壓黑 + 日期 pill */}
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,.35) 100%)",
                            pointerEvents: "none",
                        }}
                    />
                    {note.date && (
                        <Typography
                            variant="caption"
                            sx={{
                                position: "absolute",
                                right: 8,
                                bottom: 8,
                                px: 0.75,
                                py: 0.25,
                                borderRadius: 1,
                                fontWeight: 700,
                                // 用 paper 當基準做半透明底 + 邊框，透明卡片也清楚可讀
                                color: t.palette.getContrastText(t.palette.background.paper),
                                bgcolor: alpha(t.palette.background.paper, 0.65),
                                backdropFilter: "blur(4px)",
                                border: `1px solid ${alpha(t.palette.divider, 0.8)}`,
                            }}
                        >
                            {note.date}
                        </Typography>
                    )}
                </Box>

                {/* 內容區：兩行標題＋兩行摘要，維持卡片等高 */}
                <CardContent sx={{ width: 1, flexGrow: 1, pb: 2 }}>
                    {/* 類別 */}
                    <Typography variant="overline" sx={{ opacity: 0.7 }}>
                        {note.categoryLabel || note.category || "未分類"}
                    </Typography>

                    {/* 標題（最多 2 行） */}
                    <Typography
                        variant="h6"
                        fontWeight={900}
                        gutterBottom
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            lineHeight: 1.25,
                            minHeight: 48,
                        }}
                    >
                        {note.title}
                    </Typography>

                    {/* 摘要（最多 2 行） */}
                    {note.summary && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                minHeight: 40,
                            }}
                        >
                            {note.summary}
                        </Typography>
                    )}

                    {/* 標籤 */}
                    {!!note.tags?.length && (
                        <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                            {note.tags.slice(0, 3).map((tag) => (
                                <Chip key={tag} label={tag} size="small" variant="outlined" />
                            ))}
                        </Stack>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
