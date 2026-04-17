import React, { useContext, useMemo, useState } from "react";
import {
    Container, Grid, Card, CardActionArea, CardContent, CardMedia,
    Typography, Stack, Box, TextField, InputAdornment, IconButton,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Link as RouterLink } from "react-router-dom";
import { ScrollSpyProvider, SpySection, Toc } from "../shared/scrollspy";
import { LanguageContext } from "../context/LanguageContext";
import { t } from "../i18n/messages";
import { appTokens } from "../theme/tokens";

const PROJECT_ITEMS = [];

const SUMMARY_MAX = 80;
const truncate = (s = "", n = SUMMARY_MAX) => {
    const arr = [...s];
    return arr.length > n ? arr.slice(0, n).join("") + "…" : s;
};

const Project = () => {
    const { language } = useContext(LanguageContext);
    const [q, setQ] = useState("");

    const filtered = useMemo(() => {
        if (!q.trim()) return PROJECT_ITEMS;
        const kw = q.trim().toLowerCase();
        return PROJECT_ITEMS.filter((item) => {
            const hay = `${item.title || ""} ${item.desc || ""} ${(item.tags || []).join(" ")}`.toLowerCase();
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
                <ScrollSpyProvider headerOffset={appTokens.layout.scrollSpyOffset}>
                    <SpySection id="project" title={t("title.project", language)}>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}
                            alignItems={{ xs: "stretch", sm: "center" }}
                            justifyContent="space-between"
                            sx={{ mb: 2 }}
                        >
                            <Typography variant="title" fontWeight={900}>{t("title.project", language)}</Typography>

                            <TextField
                                size="small"
                                placeholder={t("project.search.placeholder", language)}
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

                    <Typography variant="body" color="text.secondary" sx={{ mb: 2 }}>
                        {t("project.result.count", language, { count: filtered.length })}
                        {q && ` · ${t("project.result.keyword", language, { keyword: q })}`}
                    </Typography>

                    {filtered.length === 0 ? (
                        <Box
                            sx={{
                                py: 8,
                                textAlign: "center",
                                color: "text.secondary",
                                border: (muiTheme) => `1px dashed ${muiTheme.palette.divider}`,
                                borderRadius: appTokens.radiusRoles.card,
                            }}
                        >
                            <Typography variant="body" fontWeight={700}>{t("project.empty.title", language)}</Typography>
                            <Typography variant="body" sx={{ mt: 0.5 }}>
                                {t("project.empty.desc", language)}
                            </Typography>
                        </Box>
                    ) : (
                        <Grid container spacing={3}>
                            {filtered.map((item) => (
                                <Grid item xs={12} sm={6} md={4} key={item.id}>
                                    <Card
                                        variant="outlined"
                                        sx={(muiTheme) => ({
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            borderRadius: appTokens.radiusRoles.card,
                                            bgcolor: alpha(muiTheme.palette.background.paper, 0.9),
                                            borderColor: muiTheme.palette.divider,
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
                                                    sx={(muiTheme) => ({ objectFit: "contain", p: 2, bgcolor: muiTheme.palette.common.white })}
                                                />
                                            )}
                                            <CardContent>
                                                <Typography variant="subheading" fontWeight={800} gutterBottom noWrap>
                                                    {item.title}
                                                </Typography>
                                                {item.desc && (
                                                    <Typography
                                                        variant="body"
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
                                                                variant="body"
                                                                sx={(muiTheme) => ({
                                                                    px: 1,
                                                                    py: 0.25,
                                                                    borderRadius: appTokens.radiusRoles.chip,
                                                                    bgcolor: alpha(muiTheme.palette.primary.main, 0.1),
                                                                    color: muiTheme.palette.primary.main,
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

                    <Toc sidebarWidth={260} collapsedWidth={18} containerMaxWidth={1200} />
                </ScrollSpyProvider>
            </Container>
        </Box>
    );
};

export default Project;
