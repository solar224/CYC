import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, LanguageContext } from "../App";
import axios from 'axios';
function Home() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { language, toggleLanguage } = useContext(LanguageContext); // 主題狀態
    useEffect(() => {
        // 設定 Currents API 的請求
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://api.currentsapi.services/v1/latest-news', {
                    params: {
                        apiKey: '0pOJgEUfwU5VO1JXtMdxDeNyfFmdn8uJ0ZN40I5umIHJ4PSe', // 你的 Currents API 密鑰
                        language: language == 'zh' ? 'zh' : 'en',
                        category: 'technology', // 這裡可以設定為技術類新聞
                    },
                });
                setNews(response.data.news); // 更新新聞列表
                setLoading(false); // 結束加載
            } catch (error) {
                setError('Failed to fetch news'); // 如果請求失敗，顯示錯誤信息
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    return (
        <div>
            <h2>Welcome to My Personal Website!</h2>
            <h3>Latest Edge Technology News:</h3>
            {loading && <p>Loading news...</p>}
            {error && <p>{error}</p>}
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