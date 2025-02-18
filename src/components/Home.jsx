import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 設定 News API 的請求
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/everything', {
                    params: {
                        q: 'edge technology', // 搜尋關鍵字
                        apiKey: '6c2bf51ed7ee4b3585d9b3807b4aeb99', // 你的 News API 密鑰
                        pageSize: 5, // 顯示的新聞數量
                        language: 'en', // 語言設置為英文
                    },
                });
                setNews(response.data.articles); // 更新新聞列表
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
