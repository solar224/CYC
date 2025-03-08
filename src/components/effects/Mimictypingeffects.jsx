//***********************************************************************
// Header: 
// TypingEffect Component - Simulates a typing effect for displaying text character by character.
//
// Parameters:
// @param {string} text - The full text to be displayed with the typing effect.
// @param {number} [speed=100] - The interval speed (in milliseconds) for typing each character.
// @param {string} [variant="body1"] - The typography variant for styling the displayed text.
//
// Usage Example:
// <TypingEffect text="Hello, world!" speed={50} variant="h6" />
//
//***********************************************************************
import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";


const TypingEffect = ({ text, speed, variant }) => {
    const [displayedText, setDisplayedText] = useState(""); // 初始為空字串
    const [index, setIndex] = useState(0); // 追蹤目前的字元索引
    const [showCursor, setShowCursor] = useState(true);
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor((prev) => !prev); // 每隔500ms 切換游標顯示/隱藏
        }, 500);
        return () => clearInterval(interval); // 清除計時器避免記憶體洩漏
    }, []);

    useEffect(() => {
        if (index < text.length) {
            const randomSpeed = Math.floor(Math.random() * 50) + speed; // 隨機 50ms ~ 150ms
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]); // 遞增顯示的文字
                setIndex((prevIndex) => prevIndex + 1); // 更新索引
            }, randomSpeed);
            return () => clearTimeout(timeout); // 清除 timeout 避免重複觸發
        }
    }, [index, text, speed]); // 監聽 index 變化來觸發下一個字元

    return <Typography variant={variant}>{displayedText}<span style={{ color: "#f39212" }}>{showCursor ? "｜" : ""}</span> </Typography>;
};
export default TypingEffect;
