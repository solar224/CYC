// src/components/Home.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import {
    Card, CardContent, CardMedia, Typography, Grid, Container, Box,
    Skeleton, Pagination, TextField, InputAdornment, IconButton, Button
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import TextSwitcher from "./effects/TextSwitcher";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { LanguageContext } from "../App"; // ← 取得 language（App 需提供）

function Home() {
    const newsRef = useRef(null);
    const { language = "zh" } = useContext(LanguageContext);

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("general");
    const [page, setPage] = useState(1);

    const itemsPerPage = 6;
    const totalPages = Math.ceil(news.length / itemsPerPage);
    const displayedNews = news.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const tText = {
        hello: language === "zh" ? "你好，我是詹宇宸" : "Hi, I'm YC-Chan",
        ask: language === "zh" ? "有什麼問題想問我？" : "Ask me anything…",
        newsTitle: language === "zh" ? "新聞" : "News",
        newsSubtitle:
            language === "zh" ? "隨時瞭解最新的進展和發現。" : "Stay updated with the latest advancements and discoveries.",
        author: language === "zh" ? "作者" : "Author",
        date: language === "zh" ? "日期" : "Date",
    };

    const categories = [
        { key: "general", labelZh: "綜合", labelEn: "General" },
        { key: "technology", labelZh: "科技", labelEn: "Technology" },
        { key: "science", labelZh: "科學", labelEn: "Science" },
        { key: "business", labelZh: "商業", labelEn: "Business" },
        { key: "sports", labelZh: "運動", labelEn: "Sports" },
    ];

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://ycchan.c110110157.workers.dev?category=${selectedCategory}`
                );
                const filteredNews = await response.json();
                const validNews = (filteredNews || []).filter(
                    (article) => article.content && article.content.trim() !== ""
                );
                setNews(validNews);
                setPage(1);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [selectedCategory]);

    useEffect(() => {
        const handleWheel = (e) => {
            if (!newsRef.current) return;
            const newsTop = newsRef.current.getBoundingClientRect().top + window.scrollY - 70;
            const scrollY = window.scrollY;
            if (e.deltaY < 0 && scrollY < newsTop) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
            if (e.deltaY > 0 && scrollY < newsTop) {
                window.scrollTo({ top: newsTop, behavior: "smooth" });
            }
        };
        window.addEventListener("wheel", handleWheel, { passive: true });
        return () => window.removeEventListener("wheel", handleWheel);
    }, []);

    useEffect(() => {
        const handleTouchMove = (e) => {
            if (!newsRef.current) return;
            const newsTop = newsRef.current.getBoundingClientRect().top + window.scrollY - 70;
            const scrollY = window.scrollY;
            const touch = e.touches?.[0];
            const prevY = touch?.clientY;

            if (touch && scrollY < newsTop) {
                // 往上滑
                if (prevY - touch.clientY > 0) window.scrollTo({ top: 0, behavior: "smooth" });
                // 往下滑
                if (prevY - touch.clientY < 0) window.scrollTo({ top: newsTop, behavior: "smooth" });
            }
        };
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        return () => window.removeEventListener("touchmove", handleTouchMove);
    }, []);

    return (
        <Box sx={{ overflowX: "hidden" }}>
            {/* Hero */}
            <Container
                maxWidth="md"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "95vh",
                    textAlign: "center",
                    py: 8,
                }}
            >
                <Typography variant="h4" fontWeight="bold" mb={3} color="text.primary">
                    {tText.hello}
                </Typography>

                <TextSwitcher
                    texts={[
                        'std::cout << "Hello World!";',
                        'printf("Hello World!");',
                        'console.log("Hello World!");',
                        'print("Hello World!")',
                        'fmt.Println("Hello World!")',
                    ]}
                    fontSize={20}
                    duration={2000}
                    sx={(t) => ({ color: t.palette.text.secondary })}
                    width={250}
                />

                {/* 問題輸入框 */}
                <Box sx={{ width: "100%", mt: 3, display: "flex", justifyContent: "center" }}>
                    <TextField
                        fullWidth
                        placeholder={tText.ask}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={(t) => ({
                            width: "90%",
                            maxWidth: 600,
                            borderRadius: 4,
                            bgcolor: alpha(t.palette.background.paper, 0.9),
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 4,
                                "& fieldset": { borderColor: t.palette.divider },
                                "&:hover fieldset": { borderColor: t.palette.text.secondary },
                                "&.Mui-focused fieldset": { borderColor: t.palette.text.primary },
                            },
                            "& input": { color: t.palette.text.primary },
                        })}
                    />
                </Box>

                <IconButton
                    onClick={() => {
                        if (!newsRef.current) return;
                        const offsetTop = newsRef.current.getBoundingClientRect().top + window.scrollY - 70;
                        window.scrollTo({ top: offsetTop, behavior: "smooth" });
                    }}
                    sx={{ position: "absolute", bottom: 24 }}
                >
                    <KeyboardArrowDownIcon fontSize="large" />
                </IconButton>
            </Container>

            {/* News Section */}
            <Container ref={newsRef} maxWidth="lg" sx={{ mb: 6, position: "relative" }}>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}>
                    <IconButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                        <KeyboardArrowUpIcon fontSize="large" />
                    </IconButton>
                </Box>

                {/* 三個導覽卡片 */}
                <Grid container spacing={2} mt={4} mb={4}>
                    {[
                        { to: "/about-me", img: "aboutme.png" },
                        { to: "/contact-me", img: "contactme.png" },
                        { to: "/note", img: "note.png" },
                    ].map(({ to, img }) => (
                        <Grid item xs={12} sm={4} key={to}>
                            <Link to={to} style={{ textDecoration: "none" }}>
                                <Card
                                    variant="outlined"
                                    sx={(t) => ({
                                        borderRadius: 4,
                                        boxShadow: "none",
                                        bgcolor: alpha(t.palette.background.paper, 0.95),
                                        borderColor: t.palette.divider,
                                        transition: "all .3s",
                                        "&:hover": { transform: "translateY(-3px)", boxShadow: t.shadows[4] },
                                        cursor: "pointer",
                                    })}
                                >
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={`${process.env.PUBLIC_URL}/${img}`}
                                        alt={to}
                                        sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                                    />
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>

                {/* 標題與分類 */}
                <Box sx={{ mb: 4, textAlign: "left" }}>
                    <Typography variant="h4" fontWeight="bold" mb={1} color="text.primary">
                        {tText.newsTitle}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {tText.newsSubtitle}
                    </Typography>
                    <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {categories.map(({ key, labelZh, labelEn }) => (
                            <Button
                                key={key}
                                onClick={() => setSelectedCategory(key)}
                                variant={selectedCategory === key ? "contained" : "outlined"}
                                sx={{ px: 3, borderRadius: 3, transition: "all .3s" }}
                            >
                                {language === "zh" ? labelZh : labelEn}
                            </Button>
                        ))}
                    </Box>
                </Box>

                {/* News Grid */}
                <Grid container spacing={3}>
                    {loading
                        ? [...Array(6)].map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card
                                    variant="outlined"
                                    sx={(t) => ({
                                        width: "100%",
                                        borderRadius: 3,
                                        bgcolor: alpha(t.palette.background.paper, 0.85),
                                        borderColor: t.palette.divider,
                                    })}
                                >
                                    <Skeleton variant="rectangular" height={180} />
                                    <CardContent>
                                        <Skeleton variant="text" height={30} width="80%" />
                                        <Skeleton variant="text" height={20} width="90%" />
                                        <Skeleton variant="text" height={20} width="60%" />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                        : displayedNews.map((article, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Card
                                        variant="outlined"
                                        sx={(t) => ({
                                            width: "100%",
                                            borderRadius: 3,
                                            bgcolor: alpha(t.palette.background.paper, 0.92),
                                            borderColor: t.palette.divider,
                                            color: t.palette.text.primary,
                                            position: "relative",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            transition: "all .3s",
                                            "&:hover": { transform: "translateY(-3px)", boxShadow: t.shadows[4] },
                                        })}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="180"
                                            image={article.urlToImage}
                                            alt={article.title}
                                            sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography
                                                gutterBottom
                                                variant="subtitle1"
                                                fontWeight="bold"
                                                sx={{
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                }}
                                            >
                                                {article.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: "vertical",
                                                }}
                                            >
                                                {article.description}
                                            </Typography>
                                        </CardContent>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1 }}>
                                            <Typography variant="caption">
                                                {tText.author}:{" "}
                                                {article.author
                                                    ? `${article.author.slice(0, 10)}${article.author.length > 10 ? "..." : ""}`
                                                    : "----"}
                                            </Typography>
                                            <Typography variant="caption">
                                                {tText.date}: {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "N/A"}
                                            </Typography>
                                        </Box>
                                    </Card>
                                </a>
                            </Grid>
                        ))}
                </Grid>

                {/* 分頁器 */}
                {totalPages > 1 && (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} color="primary" shape="rounded" />
                    </Box>
                )}
            </Container>
        </Box>
    );
}

export default Home;
