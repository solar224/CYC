/**
 * Mimictypingeffects - Simulates a typing effect for displaying text character by character.
 *
 * @param {Array<string>} phrases - The list of texts to be displayed with the typing effect.
 * @param {number} [speed=100] - The interval speed (in milliseconds) for typing each character.
 * @param {string} [variant="body1"] - The typography variant for styling the displayed text.
 * @param {boolean} [loop=true] - If true, the text cycles through continuously; if false, it plays once.
 * @returns {JSX.Element} A React component that animates typing effect.
 *
 * @example
 * <Mimictypingeffects textList={["Hello", "Welcome", "Enjoy!"]} speed={50} variant="h6" repeat={false} />
 */

import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const TypingEffect = ({ textList, speed, variant, repeat }) => {
    const [textIndex, setTextIndex] = useState(0); // 追蹤目前顯示的文字
    const [displayedText, setDisplayedText] = useState(""); // 當前顯示的字
    const [index, setIndex] = useState(0); // 追蹤打字進度
    const [showCursor, setShowCursor] = useState(true);
    const [completed, setCompleted] = useState(false); // 控制非循環模式下的結束狀態

    useEffect(() => {
        // 控制光標閃爍
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    useEffect(() => {
        if (completed) return; // 如果不循環，打完一次就停住

        if (index < textList[textIndex].length) {
            // 隨機打字速度 (speed ± 50ms)
            const randomSpeed = Math.floor(Math.random() * 50) + speed;
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + textList[textIndex][index]); // 逐字顯示
                setIndex((prevIndex) => prevIndex + 1);
            }, randomSpeed);
            return () => clearTimeout(timeout);
        } else {
            // 完成後等待 1.5 秒再切換下一個字
            const waitTimeout = setTimeout(() => {
                if (repeat === 0 && textIndex === textList.length - 1) {
                    setCompleted(true); // 停止變更
                    return;
                }
                setIndex(0); // 重置字元索引
                setDisplayedText(""); // 清空顯示文字
                setTextIndex((prev) => (prev + 1) % textList.length); // 切換下一個字
            }, 1500);
            return () => clearTimeout(waitTimeout);
        }
    }, [index, textIndex, speed, repeat, completed]);

    return (
        <Typography variant={variant}>
            {displayedText}
            <span style={{ color: "#f39212", userSelect: "none" }}>{showCursor ? "｜" : ""}</span>
        </Typography>
    );
};

export default TypingEffect;
