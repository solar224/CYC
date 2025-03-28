import React, { useState, useEffect, useContext } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Grid,
    Container,
    Box,
    Skeleton,
    Pagination,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeContext, LanguageContext } from "../App";
import TextSwitcher from "./effects/TextSwitcher";

function Home() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("general");
    const { language } = useContext(LanguageContext);
    const { theme } = useContext(ThemeContext);
    const themeObject = createTheme({ palette: { mode: theme === "light" ? "light" : "dark" } });
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(news.length / itemsPerPage);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const displayedNews = news.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://ycchan.c110110157.workers.dev?category=${selectedCategory}`);
                const filteredNews = await response.json();
                const validNews = filteredNews.filter(article => article.content && article.content.trim() !== "");
                setNews(validNews);
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [selectedCategory]);

    const categories = [
        { key: "general", labelZh: "綜合", labelEn: "General" },
        { key: "technology", labelZh: "科技", labelEn: "Technology" },
        { key: "science", labelZh: "科學", labelEn: "Science" },
        { key: "business", labelZh: "商業", labelEn: "Business" },
        { key: "sports", labelZh: "運動", labelEn: "Sports" },
    ];

    return (
        <Box sx={{ overflowX: "hidden" }}>
            {/* Hero Section */}
            <Container
                maxWidth="md"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "94vh",
                    textAlign: "center",
                    py: 8,
                }}
            >
                <Typography variant="h4" fontWeight="bold" mb={3} color="text.primary">
                    你好，我是詹宇宸
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
                    animationDuration={2000}
                    sx={{ color: "text.secondary" }}
                    size={2000}
                />
                <Typography variant="caption" sx={{ color: "text.disabled", mt: 4 }}>
                    YC-Chan - 個人網站
                </Typography>
            </Container>

            {/* News Section */}
            <Container maxWidth="lg" sx={{ mb: 6 }}>
                <Box sx={{ mb: 4, textAlign: "left" }}>
                    <Typography variant="h4" fontWeight="bold" mb={1}>
                        {language === "zh" ? "新聞" : "News"}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {language === "zh"
                            ? "隨時瞭解最新的進展和發現。"
                            : "Stay updated with the latest advancements and discoveries."}
                    </Typography>
                    <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "left" }}>
                        {categories.map(({ key, labelZh, labelEn }) => (
                            <Button
                                key={key}
                                onClick={() => setSelectedCategory(key)}
                                variant={selectedCategory === key ? "contained" : "outlined"}
                                sx={{
                                    px: 3,
                                    borderRadius: 3,
                                    boxShadow: selectedCategory === key ? 3 : 1,
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: 4,
                                    },
                                    transition: "all 0.3s",
                                }}
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
                                    sx={{
                                        width: "100%",
                                        borderRadius: 3,
                                        backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.85)" : "rgba(3, 3, 3, 0.85)",
                                    }}
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
                                <Card
                                    sx={{
                                        width: "100%",
                                        borderRadius: 3,
                                        backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.92)" : "rgba(18, 18, 18, 0.85)",
                                        color: theme === "light" ? "black" : "white",
                                        position: "relative",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        transition: "all 0.3s",
                                        "&:hover": {
                                            transform: "translateY(-3px)",
                                            boxShadow: 6,
                                        },
                                    }}
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
                                            sx={{
                                                color: theme === "light" ? "#444" : "rgba(200, 200, 200, 0.8)",
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
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            p: 1,
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="caption">
                                                {language === "zh" ? "作者" : "Author"}:{" "}
                                                {article.author
                                                    ? `${article.author.slice(0, 20)}${article.author.length > 20 ? "..." : ""}`
                                                    : "----"}
                                            </Typography>
                                            <Typography variant="caption">
                                                {language === "zh" ? "日期" : "Date"}:{" "}
                                                {article.publishedAt
                                                    ? new Date(article.publishedAt).toLocaleDateString()
                                                    : "N/A"}
                                            </Typography>
                                        </Box>
                                        <Button
                                            size="small"
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant="outlined"
                                            color="primary"
                                        >
                                            {language === "zh" ? "閱讀更多" : "Read More"}
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                </Grid>

                {/* 分頁器 */}
                {totalPages > 1 && (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handleChange}
                            color="primary"
                            shape="rounded"
                        />
                    </Box>
                )}
            </Container>
        </Box>
    );
}

export default Home;
