/**
 * TextSwitcher
 *
 * @param {string[]} texts - 要輪播的文字陣列
 * @param {number} fontSize - 文字大小(px)
 * @param {number} animationDuration - 單次動畫長度(ms)
 * @param {object} sx - 傳入 MUI 的 sx 樣式 (例如 { color: "#f00" })
 */
import React, { useState } from "react";
import { styled, keyframes } from "@mui/material/styles";
import { Typography } from "@mui/material";

const slideFade = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  25% {
    transform: translateY(0);
    opacity: 1;
  }
  75% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const AnimatedText = styled(Typography)(({ animationDuration }) => ({
    position: "absolute",
    width: "100%",
    textAlign: "center",
    // ★ 加上 forwards，動畫結束後維持最後一幀狀態
    animation: `${slideFade} ${animationDuration}ms linear 1 forwards`,
}));

export default function TextSwitcher({ texts, fontSize, animationDuration, sx, size }) {
    const [index, setIndex] = useState(0);

    if (!texts || !texts.length) return null;

    const handleAnimationEnd = () => {
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    };

    return (
        <div
            style={{
                display: "inline-block",
                position: "relative",
                width: size,              // 指定一個固定寬度或最小寬度
                height: fontSize * 1.6,
                overflow: "hidden",
            }}
        >
            <AnimatedText
                key={index}
                animationDuration={animationDuration}
                onAnimationEnd={handleAnimationEnd}
                // 這裡把 sx 傳下去，並且合併字體大小的 sx
                sx={{
                    fontSize: `${fontSize}px`,
                    ...sx
                }}
            >
                {texts[index]}
            </AnimatedText>
        </div>
    );
}
