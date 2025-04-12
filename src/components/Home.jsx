import React, { useState, useEffect, useContext, useRef } from "react";
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
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";

// icon
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Home() {
    const newsRef = useRef(null);
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
            if (newsRef.current) {
                const newsTop = newsRef.current.getBoundingClientRect().top + window.scrollY - 70;
                const scrollY = window.scrollY;

                // 滾動到 newsRef 頂部且繼續往上滑時
                if (e.deltaY < 0 && scrollY < newsTop) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }

                // 如果往下滑，且剛好在 hero 區域
                if (e.deltaY > 0 && scrollY < newsTop) {
                    window.scrollTo({ top: newsTop, behavior: "smooth" });
                }
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        return () => window.removeEventListener("wheel", handleWheel);
    }, []);


    useEffect(() => {
        const handleTouchMove = (e) => {
            if (newsRef.current) {
                const newsTop = newsRef.current.getBoundingClientRect().top + window.scrollY - 70;
                const scrollY = window.scrollY;
                const touch = e.touches[0];
                const previousTouchY = touch.clientY;

                // 檢測滑動方向
                if (touch && scrollY < newsTop) {
                    if (previousTouchY - touch.clientY > 0) {  // 往上滑
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                }

                // 如果往下滑，且剛好在 hero 區域
                if (touch && scrollY < newsTop) {
                    if (previousTouchY - touch.clientY < 0) {  // 往下滑
                        window.scrollTo({ top: newsTop, behavior: "smooth" });
                    }
                }
            }
        };
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        return () => window.removeEventListener("touchmove", handleTouchMove);
    }, []);



    const categories = [
        { key: "general", labelZh: "綜合", labelEn: "General" },
        { key: "technology", labelZh: "科技", labelEn: "Technology" },
        { key: "science", labelZh: "科學", labelEn: "Science" },
        { key: "business", labelZh: "商業", labelEn: "Business" },
        { key: "sports", labelZh: "運動", labelEn: "Sports" },
    ];

    return (
        <Box sx={{ overflowX: "hidden" }}>
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
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb={3}
                    sx={{
                        color: theme === "light" ? "black" : "white",
                    }}
                >
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
                    duration={2000}
                    sx={{ color: theme === "light" ? "#555" : "#ccc" }}
                    width={250}
                />

                {/* 新增輸入框 */}
                <Box
                    sx={{
                        width: "100%",
                        mt: 3,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="有什麼問題想問我？"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        sx={{
                                            color: theme === "light" ? "#333" : "#eee",
                                            "&:hover": {
                                                color: theme === "light" ? "#000" : "#fff",
                                            },
                                        }}
                                    >
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            borderRadius: 4,
                            backgroundColor: theme === "light" ? "rgba(250,250,250,0.9)" : "rgba(30,30,30,0.9)",
                            input: {
                                color: theme === "light" ? "#333" : "#eee",
                            },
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 4,
                                "& fieldset": {
                                    borderColor: theme === "light" ? "#ccc" : "#555",
                                },
                                "&:hover fieldset": {
                                    borderColor: theme === "light" ? "#999" : "#888",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: theme === "light" ? "#333" : "#aaa",
                                },
                            },
                            width: "90%",
                            maxWidth: 600,
                        }}
                    />
                </Box>
                <IconButton
                    onClick={() => {
                        if (newsRef.current) {
                            const offsetTop = newsRef.current.getBoundingClientRect().top + window.scrollY - 70;
                            window.scrollTo({ top: offsetTop, behavior: "smooth" });
                        }
                    }}
                    sx={{
                        position: "absolute",
                        bottom: 24,

                        color: theme === "light" ? "#333" : "#eee",
                        width: 48,
                        height: 48,
                    }}
                >
                    <KeyboardArrowDownIcon fontSize="large" />
                </IconButton>
            </Container>



            {/* News Section */}
            <Container ref={newsRef} maxWidth="lg" sx={{ mb: 6, position: "relative" }} >
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2, textAlign: "center" }}>
                    <IconButton
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        sx={{
                            color: theme === "light" ? "#333" : "#eee",
                            zIndex: 10,
                        }}
                    >
                        <KeyboardArrowUpIcon fontSize="large" />
                    </IconButton>
                </Box>
                <Grid container spacing={2} mt={4} marginBottom={4}>
                    {[1, 2, 3].map((item) => (
                        <Grid item xs={12} sm={4} key={item}>
                            {item === 1 ? (
                                // 關於我
                                <Link to="/about-me" style={{ textDecoration: "none" }}>
                                    <Card
                                        sx={{
                                            borderRadius: 4,
                                            boxShadow: 3,
                                            backgroundColor:
                                                theme === "light" ? "rgba(250,250,250,0.95)" : "rgba(30,30,30,0.95)",
                                            transition: "all 0.3s",
                                            "&:hover": {
                                                transform: "translateY(-3px)",
                                                boxShadow: 6,
                                            },
                                            cursor: "pointer",
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="180"
                                            image={`${process.env.PUBLIC_URL}/aboutme.png`}
                                            alt="關於我"
                                            sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                                        />
                                    </Card>
                                </Link>
                            ) : item === 2 ? (
                                // 聯絡我
                                <Link to="/contact-me" style={{ textDecoration: "none" }}>
                                    <Card
                                        sx={{
                                            borderRadius: 4,
                                            boxShadow: 3,
                                            backgroundColor:
                                                theme === "light" ? "rgba(250,250,250,0.95)" : "rgba(30,30,30,0.95)",
                                            transition: "all 0.3s",
                                            "&:hover": {
                                                transform: "translateY(-3px)",
                                                boxShadow: 6,
                                            },
                                            cursor: "pointer",
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="180"
                                            image={`${process.env.PUBLIC_URL}/contactme.png`}
                                            alt="關於我"
                                            sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                                        />
                                    </Card>
                                </Link>
                            ) : (
                                <Link to="/note" style={{ textDecoration: "none" }}>
                                    <Card
                                        sx={{
                                            borderRadius: 4,
                                            boxShadow: 3,
                                            backgroundColor:
                                                theme === "light" ? "rgba(250,250,250,0.95)" : "rgba(30,30,30,0.95)",
                                            transition: "all 0.3s",
                                            "&:hover": {
                                                transform: "translateY(-3px)",
                                                boxShadow: 6,
                                            },
                                            cursor: "pointer",
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="180"
                                            image={`${process.env.PUBLIC_URL}/note.png`}
                                            alt="關於我"
                                            sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                                        />
                                    </Card>
                                </Link>
                            )}
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ mb: 4, textAlign: "left" }}>
                    <Typography variant="h4" fontWeight="bold" mb={1} sx={{
                        color: theme === "light" ? "#555" : "#ccc", // secondary text 顏色
                    }}>
                        {language === "zh" ? "新聞" : "News"}
                    </Typography>
                    <Typography variant="subtitle1" sx={{
                        color: theme === "light" ? "#555" : "#ccc", // secondary text 顏色
                    }}>
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
                                <a href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: "none" }}

                                >
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
                                            <Typography variant="caption">
                                                {language === "zh" ? "作者" : "Author"}:{" "}
                                                {article.author
                                                    ? `${article.author.slice(0, 10)}${article.author.length > 10 ? "..." : ""}`
                                                    : "----"}
                                            </Typography>
                                            <Typography variant="caption">
                                                {language === "zh" ? "日期" : "Date"}:{" "}
                                                {article.publishedAt
                                                    ? new Date(article.publishedAt).toLocaleDateString()
                                                    : "N/A"}
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
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handleChange}
                            color="primary"
                            shape="rounded"
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    color: theme === "light" ? "black" : "white",
                                    borderColor: theme === "light" ? "black" : "white",
                                    "&:hover": {
                                        backgroundColor: theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
                                    },
                                    "&.Mui-selected": {
                                        backgroundColor: theme === "light" ? "black" : "white",
                                        color: theme === "light" ? "white" : "black",
                                        "&:hover": {
                                            backgroundColor: theme === "light" ? "#333" : "#eee",
                                        },
                                    },
                                },
                            }}
                        />
                    </Box>

                )}
            </Container>
        </Box>
    );
}

export default Home;
