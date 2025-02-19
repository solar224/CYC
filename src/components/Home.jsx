import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, LanguageContext } from "../App";
import axios from 'axios';
import { Button, ButtonGroup, Typography } from '@mui/material';

function Home() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('technology'); // 預設為科技類別
    const { language } = useContext(LanguageContext); // 主題狀態

    useEffect(() => {
        // 設定 Currents API 的請求
        const fetchNews = async () => {
            setLoading(true); // 每次分類切換時重新加載
            try {
                const response = await axios.get('https://api.currentsapi.services/v1/latest-news', {
                    params: {
                        apiKey: '0pOJgEUfwU5VO1JXtMdxDeNyfFmdn8uJ0ZN40I5umIHJ4PSe',
                        language: language === 'zh' ? 'zh' : 'en',
                        category: selectedCategory, // 根據選擇的分類請求新聞
                    },
                });
                setNews(response.data.news); // 更新新聞列表
                setError(null); // 清除錯誤
            } catch (error) {
                setError('Failed to fetch news'); // 顯示錯誤信息
            }
            setLoading(false);
        };
        fetchNews();
    }, [language, selectedCategory]); // 當語言或分類改變時，重新加載新聞

    // 類別按鈕點擊處理
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>新聞時事</Typography>
            {/* 動態分類按鈕 */}
            <ButtonGroup variant="outlined" color="primary" aria-label="category button group">
                <Button onClick={() => handleCategoryChange('technology')} variant={selectedCategory === 'technology' ? 'contained' : 'outlined'}>
                    科技
                </Button>
                <Button onClick={() => handleCategoryChange('business')} variant={selectedCategory === 'business' ? 'contained' : 'outlined'}>
                    商業
                </Button>
                <Button onClick={() => handleCategoryChange('programming')} variant={selectedCategory === 'programming' ? 'contained' : 'outlined'}>
                    軟體
                </Button>
            </ButtonGroup>

            {/* 加載狀態與新聞列表 */}
            {loading && <Typography>Loading news...</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            <ul>
                {news.map((article, index) => (
                    <li key={index}>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title}
                        </a>
                        <p>{article.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
