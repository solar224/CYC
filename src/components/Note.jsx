import React, { useContext, useMemo, useState } from "react";
import { NOTES } from "../data/notes";
import {
    Container, Grid, Card, CardActionArea, CardContent, CardMedia,
    Typography, Chip, Stack, Box, Tabs, Tab, TextField,
    InputAdornment, IconButton, Tooltip
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { Link as RouterLink } from "react-router-dom";
import { ScrollSpyProvider, SpySection, Toc } from "../shared/scrollspy";
import { LanguageContext } from "../context/LanguageContext";
import { NOTE_CATEGORY_FILTERS } from "../config/notes.constants";
import { t } from "../i18n/messages";
import { appTokens } from "../theme/tokens";

const SUMMARY_MAX = 80;
const truncate = (s = "", n = SUMMARY_MAX) => {
    const arr = [...s];
    return arr.length > n ? arr.slice(0, n).join("") + "…" : s;
};

export default function Notes() {
    const { language } = useContext(LanguageContext);
    const [cat, setCat] = useState("all");
    const [q, setQ] = useState("");

    const categoryFilters = useMemo(
        () => NOTE_CATEGORY_FILTERS.map((item) => ({
            ...item,
            label: t(item.labelKey, language),
        })),
        [language]
    );

    const [stars, setStars] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("note_stars") || "{}");
        } catch {
            return {};
        }
    });
    const toggleStar = (id) => {
        setStars((prev) => {
            const next = { ...prev };
            if (next[id]) delete next[id];
            else next[id] = true;
            localStorage.setItem("note_stars", JSON.stringify(next));
            return next;
        });
    };

    const sorted = useMemo(
        () => [...NOTES].sort((a, b) => (b.date || "").localeCompare(a.date || "")),
        []
    );

    const catCounts = useMemo(() => {
        const obj = { all: sorted.length };
        for (const n of sorted) obj[n.category] = (obj[n.category] || 0) + 1;
        return obj;
    }, [sorted]);

    const matchQ = (note, kw) => {
        if (!kw) return true;
        const k = kw.trim().toLowerCase();
        const hay = `${note.title || ""} ${note.summary || ""} ${(note.tags || []).join(" ")}`.toLowerCase();
        return hay.includes(k);
    };

    const filtered = useMemo(() => {
        return sorted.filter(n => (cat === "all" || n.category === cat) && matchQ(n, q));
    }, [sorted, cat, q]);

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
                <ScrollSpyProvider headerOffset={appTokens.layout.scrollSpyOffset}>
                    <SpySection id="notes" title={t("note.title", language)}>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}
                            alignItems={{ xs: "stretch", sm: "center" }}
                            justifyContent="space-between"
                            sx={{ mb: 2 }}
                        >
                            <Typography variant="title" fontWeight={900}>{t("note.title", language)}</Typography>

                            {/* 搜尋列 */}
                            <TextField
                                size="small"
                                placeholder={t("note.search.placeholder", language)}
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
                    </SpySection>

                    {/* 分類 Tabs */}
                    <Tabs
                        value={cat}
                        onChange={(_, v) => setCat(v)}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        sx={{
                            mb: 2,
                            "& .MuiTab-root": { fontWeight: 800, minHeight: 40, px: { xs: 1.25, sm: 2 } },
                            "& .MuiTabs-indicator": { height: 3, borderRadius: appTokens.radiusRoles.indicator }
                        }}
                    >
                        {categoryFilters.map(c => (
                            <Tab
                                key={c.value}
                                value={c.value}
                                label={`${c.label}${typeof catCounts[c.value] === "number" ? ` (${catCounts[c.value]})` : ""}`}
                            />
                        ))}
                    </Tabs>

                    {/* 搜尋／分類結果統計 */}
                    <Typography variant="body" color="text.secondary" sx={{ mb: 1 }}>
                        {t("note.result.count", language, { count: filtered.length })}
                        {cat !== "all" && ` · ${t("note.result.category", language, { category: categoryFilters.find(x => x.value === cat)?.label || "" })}`}
                        {q && ` · ${t("note.result.keyword", language, { keyword: q })}`}
                    </Typography>

                    {/* 卡片列表 */}
                    {filtered.length === 0 ? (
                        <Box
                            sx={{
                                py: 8,
                                textAlign: "center",
                                color: "text.secondary",
                                border: (t) => `1px dashed ${t.palette.divider}`,
                                borderRadius: appTokens.radiusRoles.card
                            }}
                        >
                            <Typography variant="body" fontWeight={700}>{t("note.empty.title", language)}</Typography>
                            <Typography variant="body" sx={{ mt: 0.5 }}>
                                {t("note.empty.desc", language)}
                            </Typography>
                        </Box>
                    ) : (
                        <Grid container spacing={{ xs: 2, md: 3 }}>
                            {filtered.map(n => {
                                const isStarred = !!stars[n.id];
                                return (
                                    <Grid item xs={12} sm={6} md={4} key={n.id}>
                                        <Card
                                            variant="outlined"
                                            sx={(t) => ({
                                                position: "relative",            // 為了放右上角星號
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                borderRadius: appTokens.radiusRoles.card,
                                                bgcolor: alpha(t.palette.background.paper, 0.9),
                                                borderColor: t.palette.divider,
                                                boxShadow: "none",
                                            })}
                                        >
                                            {/* 右上角星號 */}
                                            <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
                                                <Tooltip title={isStarred ? t("note.star.remove", language) : t("note.star.add", language)}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation(); // 不要觸發 CardActionArea 導航
                                                            toggleStar(n.id);
                                                        }}
                                                        sx={(t) => ({
                                                            bgcolor: alpha(t.palette.background.default, 0.6),
                                                            backdropFilter: "blur(4px)",
                                                            border: `1px solid ${t.palette.divider}`,
                                                            "&:hover": { bgcolor: alpha(t.palette.background.default, 0.9) },
                                                            color: isStarred ? t.palette.warning.main : t.palette.text.secondary,
                                                        })}
                                                        aria-label={isStarred ? t("note.star.remove", language) : t("note.star.add", language)}
                                                    >
                                                        {isStarred ? <StarRoundedIcon /> : <StarBorderRoundedIcon />}
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>

                                            <CardActionArea component={RouterLink} to={`/notes/${n.slug}`} sx={{ flexGrow: 1 }}>
                                                {n.cover && <CardMedia component="img" height="140" image={n.cover} alt={n.title} />}
                                                <CardContent>
                                                    <Typography variant="body" sx={{ opacity: 0.7 }}>
                                                        {categoryFilters.find(c => c.value === n.category)?.label || t("note.category.unknown", language)}
                                                    </Typography>
                                                    <Typography variant="subheading" fontWeight={800} gutterBottom noWrap>
                                                        {n.title}
                                                    </Typography>

                                                    {/* 限制 summary 字數 + 行數（雙保險） */}
                                                    {n.summary && (
                                                        <Typography
                                                            variant="body"
                                                            color="text.secondary"
                                                            sx={{
                                                                overflow: "hidden",
                                                                display: "-webkit-box",
                                                                WebkitLineClamp: 2,          // 最多 2 行
                                                                WebkitBoxOrient: "vertical",
                                                            }}
                                                        >
                                                            {truncate(n.summary, SUMMARY_MAX)}
                                                        </Typography>
                                                    )}

                                                    <Stack direction="row" spacing={1} useFlexGap sx={{ mt: 1, flexWrap: "wrap" }}>
                                                        {n.tags?.slice(0, 3).map(t => <Chip key={t} size="small" label={t} />)}
                                                    </Stack>
                                                </CardContent>
                                                <Box sx={{ px: 2, pb: 1, color: "text.secondary", fontSize: 12 }}>{n.date}</Box>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                    <Toc sidebarWidth={260} collapsedWidth={18} containerMaxWidth={1200} />
                </ScrollSpyProvider>
            </Container>
        </Box>
    );
}
