import React, { useState, useContext } from "react";
import { Card, CardContent, Skeleton, Box } from "@mui/material";
import { ThemeContext } from "../App"; // 確保你的 ThemeContext 正確導入

const MyCalendar = () => {
    const { theme } = useContext(ThemeContext); // 取得當前主題
    const [loading, setLoading] = useState(true); // 控制載入狀態

    // 當 iframe 載入完成，觸發 Skeleton 消失
    const handleIframeLoad = () => {
        setLoading(false);
    };

    return (
        <Card
            sx={{
                width: "100%",
                height: "600px",
                borderRadius: 2,
                backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.85)" : "rgba(3, 3, 3, 0.85)",
                overflow: "hidden",
                position: "relative", // 讓 Skeleton 可以絕對定位覆蓋 iframe
                p: 0
            }}
        >
            {/* iframe 行事曆 */}
            <iframe
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FTaipei&showPrint=0&mode=WEEK&src=YzExMDExMDE1N0Bua3VzdC5lZHUudHc&color=%23039BE5"
                style={{
                    width: "100%",
                    height: "600px",
                    borderRadius: "10px",
                    filter: theme === "dark" ? "invert(1) hue-rotate(180deg)" : "none"
                }}

                frameBorder="0"
                scrolling="no"
                onLoad={handleIframeLoad} // 觸發載入完成
            />

            {/* Skeleton 加載動畫，疊加在 `iframe` 上 */}
            {loading && (
                <Box
                    sx={{
                        position: "absolute", // 完全覆蓋 iframe
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.85)" : "rgba(3, 3, 3, 0.85)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "opacity 0.5s ease-out", // 添加淡出效果
                        opacity: loading ? 1 : 0, // 讓 Skeleton 淡出
                        pointerEvents: "none" // 避免影響 iframe 操作
                    }}
                >
                    <CardContent sx={{ width: "98%", marginTop: '0px' }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Skeleton animation="wave" variant="text" height={60} width="25%" sx={{ bgcolor: theme === "dark" ? "grey.800" : undefined }} />
                            <Skeleton animation="wave" variant="text" height={60} width="12%" sx={{ bgcolor: theme === "dark" ? "grey.800" : undefined }} />
                        </Box>
                        <Skeleton animation="wave" variant="rectangular" height={465} sx={{ bgcolor: theme === "dark" ? "grey.800" : undefined }} />
                        <Skeleton animation="wave" variant="text" height={70} sx={{ bgcolor: theme === "dark" ? "grey.800" : undefined }} />

                    </CardContent>
                </Box>
            )}
        </Card>
    );
};

export default MyCalendar;
