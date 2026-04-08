import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    Divider,
    Fab,
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { alpha } from "@mui/material/styles";
import { LanguageContext } from "../App";
import { appTokens } from "../theme/tokens";
import { ChatBubble, Composer, useChatState } from "./chat/HomeChatExperience";

export default function FloatingChat() {
    const launcherRef = useRef(null);
    const footerSpace = appTokens.layout.floating.footerSpace;
    const defaultBottom = appTokens.layout.floating.bottom;
    const [chatOpen, setChatOpen] = useState(false);
    const { language = "zh" } = useContext(LanguageContext);
    const {
        input,
        setInput,
        messageViewportRef,
        placeholder,
        welcomeTitle,
        quickPrompts,
        messages,
        hasStarted,
        sendMessage,
        resetConversation,
    } = useChatState();

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const windowHeight = window.innerHeight;
                    const bodyHeight = document.body.scrollHeight;
                    const distanceToBottom = bodyHeight - (scrollY + windowHeight);
                    const offset = distanceToBottom < footerSpace
                        ? footerSpace - distanceToBottom + defaultBottom
                        : defaultBottom;

                    if (launcherRef.current) {
                        launcherRef.current.style.bottom = `${offset}px`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [defaultBottom, footerSpace]);

    return (
        <>
            {!chatOpen && (
                <div
                    ref={launcherRef}
                    style={{
                        position: "fixed",
                        left: "16px",
                        bottom: `${defaultBottom}px`,
                        zIndex: appTokens.layout.floating.zIndex,
                    }}
                >
                    <Tooltip title={language === "zh" ? "開啟聊天" : "Open chat"} placement="right">
                        <Fab
                            color="primary"
                            variant="extended"
                            onClick={() => setChatOpen(true)}
                            sx={{
                                px: 2,
                                fontWeight: 700,
                            }}
                        >
                            <ChatRoundedIcon sx={{ mr: 0.8 }} />
                            {language === "zh" ? "聊天室" : "Chat"}
                        </Fab>
                    </Tooltip>
                </div>
            )}

            {chatOpen && (
                <Paper
                    elevation={16}
                    sx={(t) => ({
                        position: "fixed",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { xs: "94vw", sm: "88vw", md: "76vw", lg: "64vw" },
                        height: { xs: "84dvh", sm: "82dvh", md: "80dvh" },
                        zIndex: t.zIndex.modal + 1,
                        borderRadius: 3,
                        overflow: "hidden",
                        border: `1px solid ${alpha(t.palette.divider, 0.85)}`,
                        bgcolor: t.palette.background.default,
                    })}
                >
                    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                        <Box
                            sx={(t) => ({
                                px: 1.2,
                                py: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderBottom: `1px solid ${t.palette.divider}`,
                                bgcolor: alpha(t.palette.background.paper, 0.5),
                            })}
                        >
                            <Typography variant="subtitle2" fontWeight={700}>
                                {language === "zh" ? "聊天室" : "Chat"}
                            </Typography>

                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <Button
                                    size="small"
                                    onClick={resetConversation}
                                    sx={{ textTransform: "none", minWidth: "auto", px: 1 }}
                                >
                                    {language === "zh" ? "新對話" : "New"}
                                </Button>
                                <IconButton
                                    onClick={() => setChatOpen(false)}
                                    aria-label={language === "zh" ? "關閉聊天" : "Close chat"}
                                    size="small"
                                    sx={(t) => ({
                                        color: "text.secondary",
                                        bgcolor: alpha(t.palette.background.paper, 0.72),
                                        border: `1px solid ${alpha(t.palette.divider, 0.8)}`,
                                        "&:hover": { bgcolor: alpha(t.palette.action.hover, 0.9) },
                                    })}
                                >
                                    <CloseRoundedIcon fontSize="small" />
                                </IconButton>
                            </Stack>
                        </Box>

                        {!hasStarted && (
                            <Box sx={{ px: 1.25, pt: 1.25 }}>
                                <Typography variant="body2" fontWeight={700}>
                                    {welcomeTitle}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {language === "zh" ? "可以先試試這些問題" : "Try these prompts"}
                                </Typography>
                                <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.75} sx={{ mt: 1 }}>
                                    {quickPrompts.map((prompt) => (
                                        <Button
                                            key={prompt}
                                            size="small"
                                            variant="outlined"
                                            onClick={() => sendMessage(prompt)}
                                            sx={{ textTransform: "none", borderRadius: 99 }}
                                        >
                                            {prompt}
                                        </Button>
                                    ))}
                                </Stack>
                            </Box>
                        )}

                        <Box
                            ref={messageViewportRef}
                            sx={{
                                flex: 1,
                                minHeight: 0,
                                overflowY: "auto",
                                px: 1.25,
                                py: 1,
                            }}
                        >
                            <Stack spacing={1.25}>
                                {messages.map((m, idx) => (
                                    <ChatBubble key={`${m.role}-${idx}`} role={m.role} text={m.text} />
                                ))}
                            </Stack>
                        </Box>

                        <Divider />
                        <Box sx={{ p: 1 }}>
                            <Composer
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onSend={() => sendMessage()}
                                placeholder={placeholder}
                                inputBorderRadius={6}
                            />
                        </Box>
                    </Box>
                </Paper>
            )}
        </>
    );
}
