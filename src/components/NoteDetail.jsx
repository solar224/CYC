// src/pages/NoteDetail.jsx
import { useParams, Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { NOTES } from "../data/notes";
import {
    Container, Box, Typography, Chip, Stack, Divider, Button, Paper, CircularProgress
} from "@mui/material";

import MarkdownWithToc from "../components/MarkdownWithToc";
import { ScrollSpyProvider, Toc } from "../shared/scrollspy";
import { appTokens } from "../theme/tokens";

export default function NoteDetail() {
    const { slug } = useParams();
    const note = NOTES.find((n) => n.slug === slug);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!note) return;
        setLoading(true);
        import(`../data/notes/${note.slug}.md`)
            .then((module) => fetch(module.default))
            .then((res) => res.text())
            .then((text) => {
                setContent(text);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load markdown:", err);
                setContent("# 載入失敗\n\n找不到此筆記的內容檔案。");
                setLoading(false);
            });
    }, [note]);

    if (!note) {
        return (
            <Container sx={{ mt: { xs: 2, md: 4 }, mb: { xs: 4, md: 6 } }}>
                <Typography variant="heading" fontWeight={800}>找不到這篇筆記</Typography>
                <Button sx={{ mt: 2 }} component={RouterLink} to="/notes">回到筆記列表</Button>
            </Container>
        );
    }

    return (
        <ScrollSpyProvider
            headerOffset={appTokens.layout.scrollSpyOffset}
            rootMargin={`-${appTokens.layout.scrollSpyOffset}px 0px -60% 0px`}
        >
            <Container sx={{ mt: { xs: 2, md: 4 }, mb: { xs: 4, md: 6 } }}>
                {/* 上方導覽列 */}
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    justifyContent="space-between"
                    spacing={{ xs: 0.5, sm: 0 }}
                    sx={{ mb: 2 }}
                >
                    <Button size="small" component={RouterLink} to="/notes">← 返回列表</Button>
                    <Typography variant="body" color="text.secondary">{note.date}</Typography>
                </Stack>

                {/* 標題 + 標籤 */}
                <Typography variant="title" fontWeight={900} sx={{ mb: 1, fontSize: { xs: 28, sm: 32 } }}>
                    {note.title}
                </Typography>
                <Stack
                    direction="row"
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mb: 2, columnGap: 1, rowGap: 1 }} // 8px x 8px 間距，可改成 0.5、1.5...
                >
                    {note.tags?.map((t) => (
                        <Chip key={t} size="small" label={t} sx={{ flexShrink: 0 }} />
                    ))}
                </Stack>

                {/* 封面：固定 16:9，避免彈跳 */}
                {note.cover && (
                    <Paper variant="outlined" sx={{ borderRadius: appTokens.radiusRoles.card, overflow: "hidden", mb: 2 }}>
                        <Box sx={{ width: 1, aspectRatio: "16 / 9", overflow: "hidden" }}>
                            <Box
                                component="img"
                                src={note.cover}
                                alt={note.title}
                                sx={{ width: 1, height: 1, objectFit: "cover", display: "block" }}
                            />
                        </Box>
                    </Paper>
                )}

                <Divider sx={{ my: 2 }} />
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box sx={{ minWidth: 0 }}>
                        <MarkdownWithToc>{content}</MarkdownWithToc>
                    </Box>
                )}
            </Container>
            <Toc sidebarWidth={260} collapsedWidth={18} containerMaxWidth={1200} />
        </ScrollSpyProvider>
    );
}
