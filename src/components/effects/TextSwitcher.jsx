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

// ✅ 正確過濾 $duration 屬性
const AnimatedText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "duration",
})(({ duration }) => ({
  position: "absolute",
  width: "100%",
  textAlign: "center",
  animation: `${slideFade} ${duration}ms linear 1 forwards`,
}));

export default function TextSwitcher({ texts, fontSize, duration = 2000, sx, width }) {
  const [index, setIndex] = useState(0);

  if (!texts || texts.length === 0) return null;

  const handleAnimationEnd = () => {
    setIndex((prev) => (prev + 1) % texts.length);
  };

  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        width: width || "200px",
        height: fontSize * 1.6,
        overflow: "hidden",
      }}
    >
      <AnimatedText
        key={index}
        duration={duration}
        onAnimationEnd={handleAnimationEnd}
        sx={{
          fontSize: `${fontSize}px`,
          ...sx,
        }}
      >
        {texts[index]}
      </AnimatedText>
    </div>
  );
}
