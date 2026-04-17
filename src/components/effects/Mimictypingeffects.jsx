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
import { appTokens } from "../../theme/tokens";

const TypingEffect = ({ textList, speed, variant, repeat }) => {
    const [textIndex, setTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [completed, setCompleted] = useState(false);
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    useEffect(() => {
        if (completed) return;

        if (index < textList[textIndex].length) {
            const randomSpeed = Math.floor(Math.random() * 50) + speed;
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + textList[textIndex][index]);
                setIndex((prevIndex) => prevIndex + 1);
            }, randomSpeed);
            return () => clearTimeout(timeout);
        } else {
            const waitTimeout = setTimeout(() => {
                if (repeat === 0 && textIndex === textList.length - 1) {
                    setCompleted(true);
                    return;
                }
                setIndex(0);
                setDisplayedText("");
                setTextIndex((prev) => (prev + 1) % textList.length);
            }, 1500);
            return () => clearTimeout(waitTimeout);
        }
    }, [index, textIndex, speed, repeat, completed]);

    return (
        <Typography variant={variant}>
            {displayedText}
            <span style={{ color: appTokens.core.brand.orange, userSelect: "none" }}>{showCursor ? "｜" : ""}</span>
        </Typography>
    );
};

export default TypingEffect;
