import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, LanguageContext } from "../App";
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Container, Box, ButtonGroup, Skeleton } from "@mui/material";

function Home() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('general'); // 預設為科技類別
    const { language } = useContext(LanguageContext); // 主題狀態
    const { theme } = useContext(ThemeContext); // 主題狀態
    const [color, setColor] = useState(theme === 'light' ? "black" : "white");
    useEffect(() => {
        setColor(theme === 'light' ? "black" : "white")
    }, [theme]);
    useEffect(() => {
        // 設定 Currents API 的請求
        const fetchNews = async () => {
            setLoading(true); // 每次分類切換時重新加載
            try {
                const response = await fetch(`https://ycchan.c110110157.workers.dev?category=${selectedCategory}`);
                const filteredNews = await response.json();
                const news = filteredNews.filter(article => article.content && article.content.trim() !== '');

                if (response.ok) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    setLoading(false);
                }
                // console.log(news);

                setNews(news);
            } catch (error) {
                console.log(error);
            }
        };
        fetchNews();
    }, [selectedCategory]); // 當語言或分類改變時，重新加載新聞

    // 類別按鈕點擊處理
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            {/* 條例 */}
            <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h4" gutterBottom color={color}>
                    {language === 'zh' ? '新聞' : 'news'}
                </Typography>
                <Typography variant="subtitle1" color={color}>
                    {language === 'zh' ? '隨時瞭解最新的進展和發現。' : 'Stay updated with the latest advancements and discoveries.'}
                </Typography>
                {/* 動態分類按鈕 */}
                <ButtonGroup variant="outlined" color="primary" aria-label="category button group" sx={{ mt: 2 }}>
                    <Button onClick={() => handleCategoryChange('general')} variant={selectedCategory === 'general' ? 'contained' : 'outlined'}>
                        {language === 'zh' ? '綜合' : 'general'}
                    </Button>
                    <Button onClick={() => handleCategoryChange('technology')} variant={selectedCategory === 'technology' ? 'contained' : 'outlined'}>
                        {language === 'zh' ? '科技' : 'technology'}
                    </Button>
                    <Button onClick={() => handleCategoryChange('science')} variant={selectedCategory === 'science' ? 'contained' : 'outlined'}>
                        {language === 'zh' ? '科學' : 'science'}
                    </Button>
                    <Button onClick={() => handleCategoryChange('business')} variant={selectedCategory === 'business' ? 'contained' : 'outlined'}>
                        {language === 'zh' ? '商業' : 'business'}
                    </Button>
                    <Button onClick={() => handleCategoryChange('sports')} variant={selectedCategory === 'sports' ? 'contained' : 'outlined'}>
                        {language === 'zh' ? '運動' : 'sports'}
                    </Button>
                </ButtonGroup>
            </Box>

            {/* 加載狀態與新聞列表 */}
            {loading ? (
                <Grid container spacing={3} justifyContent="center">
                    {[...Array(9)].map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
                            <Card sx={{
                                width: 600,
                                borderRadius: 2,
                                boxShadow: 3,
                                backgroundColor: theme === 'light' ? "rgba(255, 255, 255, 0.85)" : "rgba(3, 3, 3, 0.85)"
                            }}>
                                <Skeleton variant="rectangular" height={180} sx={{ bgcolor: theme === "dark" ? "grey.800" : undefined }} />
                                <CardContent>
                                    <Skeleton variant="text" height={30} width="80%" sx={{ bgcolor: theme === "dark" ? "grey.800" : undefined }} />
                                    <Skeleton variant="text" height={20} width="90%" sx={{ bgcolor: theme === "dark" ? "grey.800" : undefined }} />
                                    <Skeleton variant="text" height={20} width="60%" sx={{ bgcolor: theme === "dark" ? "grey.800" : undefined }} />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Grid container spacing={3} justifyContent="left">
                    {news.map((article, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
                            <Card
                                sx={{
                                    width: "100%",
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    backgroundColor: theme === 'light' ? "rgba(255, 255, 255, 0.85)" : "rgba(3, 3, 3, 0.65)",
                                    color: theme === 'light' ? "black" : "white",
                                    position: "relative", // 讓內部元素可以使用絕對定位
                                }}
                            >
                                <CardMedia component="img" height="180" image={article.urlToImage} alt={article.title} />
                                <CardContent sx={{ paddingBottom: '100px' }}> {/* 預留底部空間，避免文字被遮住 */}
                                    <Typography gutterBottom variant="h6" component="div" sx={{ color: theme === 'light' ? "black" : "white" }}>
                                        {article.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: theme === 'light' ? "black" : "rgba(200, 200, 200, 0.65)" }}>
                                        {article.description}
                                    </Typography>
                                </CardContent>
                                {/* Read More 按鈕，固定於右下角 */}
                                <Box sx={{ position: "absolute", bottom: 10, right: 10 }}>

                                    <Button
                                        size="small"
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="outlined"
                                        color="primary"
                                    >
                                        {language === 'zh' ? '閱讀更多' : 'Read More'}

                                    </Button>
                                </Box>
                                {/* 顯示作者和日期，固定於左下角 */}
                                <Box sx={{ position: "absolute", bottom: 10, left: 10, color: theme === 'light' ? "black" : "white", fontSize: '12px' }}>
                                    {article.author ? (
                                        <Typography variant="body2">
                                            {language === 'zh' ? '作者' : 'Author'}: {article.author.slice(0, 20)}{article.author.length > 20 ? '...' : ''}
                                        </Typography>
                                    ) : (
                                        <Typography variant="body2">{language === 'zh' ? '作者' : 'Author'}{language === 'zh' ? '作者' : 'Author'}: ----</Typography>
                                    )}
                                    <Typography variant="body2">
                                        {language === 'zh' ? '日期' : 'date'} : {article.publishedAt && `${new Date(article.publishedAt).toLocaleDateString()}`}
                                    </Typography>

                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>

    );
}

export default Home;
