// src/pages/NoteDetail.jsx
import { useParams, Link as RouterLink } from "react-router-dom";
import { NOTES } from "../data/notes";
import {
    Container, Box, Typography, Chip, Stack, Divider, Button, Paper
} from "@mui/material";

import MarkdownWithToc from "../components/MarkdownWithToc";
import { ScrollSpyProvider, Toc } from "../shared/scrollspy";

export default function NoteDetail() {
    const { slug } = useParams();
    const note = NOTES.find((n) => n.slug === slug);

    if (!note) {
        return (
            <Container maxWidth="md" sx={{ py: 6 }}>
                <Typography variant="h5" fontWeight={800}>找不到這篇筆記</Typography>
                <Button sx={{ mt: 2 }} component={RouterLink} to="/notes">回到筆記列表</Button>
            </Container>
        );
    }

    return (
        <ScrollSpyProvider headerOffset={72} rootMargin="-72px 0px -60% 0px">
            <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
                {/* 上方導覽列 */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Button size="small" component={RouterLink} to="/notes">← 返回列表</Button>
                    <Typography variant="caption" color="text.secondary">{note.date}</Typography>
                </Stack>

                {/* 標題 + 標籤 */}
                <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>{note.title}</Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
                    {note.tags?.map((t) => <Chip key={t} size="small" label={t} />)}
                </Stack>

                {/* 封面：固定 16:9，避免彈跳 */}
                {note.cover && (
                    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden", mb: 2 }}>
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

                {/* Markdown + ScrollSpy */}
                <MarkdownWithToc>{note.content}</MarkdownWithToc>
            </Container>

            {/* 右側 TOC：與本頁寬度對齊（MUI md ≈ 900px） */}
            <Toc sidebarWidth={260} collapsedWidth={18} containerMaxWidth={900} />
        </ScrollSpyProvider>
    );
}
