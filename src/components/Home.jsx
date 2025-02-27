import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, LanguageContext } from "../App";
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Container, Box, ButtonGroup, Skeleton } from "@mui/material";

function Home() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('technology'); // 預設為科技類別
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
                const response = await axios.get('https://api.currentsapi.services/v1/latest-news', {
                    params: {
                        apiKey: 'i4q6Mw5KibidFe1XOmF5Rocoo2UIypmIqpC4X9htds0U3Lkf',
                        language: language === 'zh' ? 'zh' : 'en',
                        category: selectedCategory, // 根據選擇的分類請求新聞
                    },
                });
                setNews(response.data.news); // 更新新聞列表
                // console.log(news);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchNews();
    }, [language, selectedCategory]); // 當語言或分類改變時，重新加載新聞

    // 類別按鈕點擊處理
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <Container>
            <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h4" gutterBottom color={color} >
                    {language === 'zh' ? '新聞' : 'news'}
                </Typography>
                <Typography variant="subtitle1" color={color} >
                    {language === 'zh' ? '隨時瞭解最新的進展和發現。' : 'Stay updated with the latest advancements and discoveries.'}
                </Typography>
                {/* 動態分類按鈕 */}
                <ButtonGroup variant="outlined" color="primary" aria-label="category button group" sx={{ mt: 2 }}>
                    <Button onClick={() => handleCategoryChange('technology')} variant={selectedCategory === 'technology' ? 'contained' : 'outlined'}>
                        {language === 'zh' ? '科技' : 'technology'}

                    </Button>
                    <Button onClick={() => handleCategoryChange('business')} variant={selectedCategory === 'business' ? 'contained' : 'outlined'}>
                        {language === 'zh' ? '商業' : 'business'}

                    </Button>
                    <Button onClick={() => handleCategoryChange('programming')} variant={selectedCategory === 'programming' ? 'contained' : 'outlined'}>
                        {language === 'zh' ? '軟體' : 'programming'}

                    </Button>
                </ButtonGroup>
            </Box>
            {/* 加載狀態與新聞列表 */}
            {loading ? (
                <Grid container spacing={3} justifyContent="center">
                    {[...Array(4)].map((_, index) => (
                        <Grid item xs={12} sm={4} md={3} key={index} display="flex" justifyContent="center">
                            <Card sx={{
                                width: 600, borderRadius: 2, boxShadow: 3, backgroundColor: theme === 'light' ? "rgba(255, 255, 255, 0.85)" : "rgba(3, 3, 3, 0.85)"
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
                <Grid container spacing={3} justifyContent="center">
                    {news.map((article, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
                            <Card sx={{ width: 600, borderRadius: 2, boxShadow: 3, backgroundColor: theme === 'light' ? "rgba(255, 255, 255, 0.85)" : "rgba(3, 3, 3, 0.85)" }}>
                                <CardMedia component="img" height="180" image={article.image} alt={article.title} />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {article.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {article.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                                        <Button size="small" href={article.url} target="_blank" rel="noopener noreferrer" variant="outlined" color="primary">
                                            Read More
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

            )}

        </Container >
    );
}

export default Home;
