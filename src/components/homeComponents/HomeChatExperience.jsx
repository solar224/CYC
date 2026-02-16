import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CloseIcon from "@mui/icons-material/Close";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {
    Box,
    Stack,
    Typography,
    IconButton,
    Button,
    TextField,
    Paper,
    Drawer,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LanguageContext } from "../../App";
import Footer from "../Footer";
import { getAppDialogSx } from "../../shared/dialog/dialogStyles";

const RECENT_CONVERSATIONS_KEY = "home_recent_conversations_v1";
const MAX_RECENT_CONVERSATIONS = 20;
const SITE_BASE_URL = "https://solar224.github.io/CYC";

const QUICK_PROMPTS_ZH = [
    "你是哪裡畢業的？",
    "這個網站有什麼工具？",
    "想了解你，可以先看什麼？",
    "如何聯絡你？",
];

const QUICK_PROMPTS_EN = [
    "Where did you graduate from?",
    "What tools are on this website?",
    "How can I quickly know more about you?",
    "How can I contact you?",
];

const KNOWLEDGE_BASE = [
    {
        id: "education",
        keywords: ["畢業", "學歷", "學校", "研究所", "大學", "graduate", "education", "school", "university", "timeline"],
        answerZh: [
            "【學歷時間線】",
            "1) 2025/7 ~ present：國立陽明交通大學 數據科學與工程研究所",
            "2) 2021/9 ~ 2025/6：國立高雄科技大學 電腦與通訊工程系",
            "3) 2019/9 ~ 2021/6：國立彰師附工 控制科",
            "",
            "延伸閱讀：",
            `- [關於我](${SITE_BASE_URL}/about-me)`,
        ].join("\n"),
        answerEn: [
            "[Education Timeline]",
            "1) 2025/7 ~ present: NYCU, Institute of Data Science and Engineering",
            "2) 2021/9 ~ 2025/6: NKUST, Department of Computer and Communication Engineering",
            "3) 2019/9 ~ 2021/6: National Changhua Industrial Vocational High School, Control Department",
            "",
            "See more:",
            `- [About](${SITE_BASE_URL}/about-me)`,
        ].join("\n"),
    },
    {
        id: "tools",
        keywords: ["工具", "技術", "技術棧", "會什麼", "stack", "tool", "skills", "technology", "framework", "react", "mui"],
        answerZh: [
            "【網站技術與能力】",
            "- 技術棧：C、C++、Python、JavaScript、Go、Git",
            "- 前端：React + MUI",
            "- 網站功能：聊天首頁、筆記分類/搜尋、行事曆聯絡、主題與語言切換",
            "",
            "可直接前往：",
            `- [筆記](${SITE_BASE_URL}/note)`,
            `- [聯絡我](${SITE_BASE_URL}/contact-me)`,
        ].join("\n"),
        answerEn: [
            "[Tech Stack & Site Features]",
            "- Stack: C, C++, Python, JavaScript, Go, Git",
            "- Frontend: React + MUI",
            "- Features: chat-based home, notes filtering/search, contact calendar, theme/language switching",
            "",
            "Quick links:",
            `- [Notes](${SITE_BASE_URL}/note)`,
            `- [Contact](${SITE_BASE_URL}/contact-me)`,
        ].join("\n"),
    },
    {
        id: "about",
        keywords: ["了解", "介紹", "你是誰", "關於", "about", "who are you", "profile", "background", "自我介紹"],
        answerZh: [
            "【個人介紹摘要】",
            "我是詹宇宸（YC-Chan），目前就讀陽明交通大學數據科學與工程研究所。",
            "經歷包含教學助教、資料科學/最佳化專案，以及 AI 與程式競賽相關獎項。",
            "",
            "建議閱讀順序：",
            `1) [關於我](${SITE_BASE_URL}/about-me)`,
            `2) [筆記](${SITE_BASE_URL}/note)`,
            `3) [聯絡我](${SITE_BASE_URL}/contact-me)`,
        ].join("\n"),
        answerEn: [
            "[Profile Summary]",
            "I am YC-Chan, currently studying in NYCU's Institute of Data Science and Engineering.",
            "My background includes teaching assistant experience, optimization/data-science projects, and awards in AI/programming competitions.",
            "",
            "Suggested reading order:",
            `1) [About](${SITE_BASE_URL}/about-me)`,
            `2) [Notes](${SITE_BASE_URL}/note)`,
            `3) [Contact](${SITE_BASE_URL}/contact-me)`,
        ].join("\n"),
    },
    {
        id: "contact",
        keywords: ["聯絡", "信箱", "email", "mail", "contact", "怎麼找你", "找你"],
        answerZh: [
            "【聯絡方式】",
            `- [聯絡我](${SITE_BASE_URL}/contact-me)`,
            "- Email：cyc.cs14@nycu.edu.tw",
            "- 你可以先看行事曆忙碌時段，再直接點寄信按鈕。",
        ].join("\n"),
        answerEn: [
            "[Contact]",
            `- [Contact page](${SITE_BASE_URL}/contact-me)`,
            "- Email: cyc.cs14@nycu.edu.tw",
            "- Check the busy slots first, then send an email directly.",
        ].join("\n"),
    },
    {
        id: "experience",
        keywords: ["經歷", "教學", "助教", "experience", "teaching", "ta"],
        answerZh: [
            "【教學經歷】",
            "- 2024/7 ~ 2024/8：暑期教師（福德國小）",
            "- 2024/2 ~ 2024/6：機率助教（高雄科技大學）",
            "- 2023/9 ~ 2024/1：線性代數助教（高雄科技大學）",
        ].join("\n"),
        answerEn: [
            "[Teaching Experience]",
            "- 2024/7 ~ 2024/8: Summer Teacher (Fude Elementary School)",
            "- 2024/2 ~ 2024/6: Probability TA (NKUST)",
            "- 2023/9 ~ 2024/1: Linear Algebra TA (NKUST)",
        ].join("\n"),
    },
    {
        id: "projects",
        keywords: ["專案", "計畫", "project", "research", "最佳化", "預測"],
        answerZh: [
            "【代表專案】",
            "- 運算思維差異化教學平臺（2023/7 ~ 2024/6）",
            "- 禁忌搜索與模擬退火結合貪婪匹配最佳化方法（2024/2 ~ 2024/6）",
            "- 哈里斯鷹最佳化應用於手術時間預測（2024/2 ~ 2024/6）",
            "- 超參數優化梯度提升樹解決手術時間預測問題（2023/9 ~ 2024/1）",
            "",
            `詳細內容可見：[關於我](${SITE_BASE_URL}/about-me)`,
        ].join("\n"),
        answerEn: [
            "[Project Highlights]",
            "- Differentiated Computational Thinking Teaching Platform (2023/7 ~ 2024/6)",
            "- Tabu Search + Simulated Annealing + Greedy Matching Optimization (2024/2 ~ 2024/6)",
            "- Harris Hawks Optimization for Surgery Time Prediction (2024/2 ~ 2024/6)",
            "- Hyperparameter-optimized GBDT for Surgery Time Prediction (2023/9 ~ 2024/1)",
            "",
            `More details: [About](${SITE_BASE_URL}/about-me)`,
        ].join("\n"),
    },
    {
        id: "awards",
        keywords: ["獎項", "競賽", "榮譽", "award", "competition", "prize"],
        answerZh: [
            "【競賽與榮譽】",
            "- 第29屆全國大專校院資訊應用服務創新競賽：AI 工具應用組第二名、教育 AI 組佳作",
            "- 國立高雄科技大學電資學院院專題：特優",
            "- 全國科技大專校院程式競賽：銀獎、銅獎",
        ].join("\n"),
        answerEn: [
            "[Awards & Competitions]",
            "- 29th National College Information Application Service Innovation Competition: 2nd place (AI Tools), Honorable Mention (Education AI)",
            "- NKUST College of Electrical Engineering and Computer Science Project: Excellent Award",
            "- National Technology University Programming Contest: Silver and Bronze",
        ].join("\n"),
    },
    {
        id: "site-guide",
        keywords: ["網站導覽", "導覽", "頁面", "route", "guide", "navigate", "網站有什麼", "去哪看"],
        answerZh: [
            "【網站導覽】",
            `- [首頁](${SITE_BASE_URL}/) 聊天式問答、最近對話管理`,
            `- [關於我](${SITE_BASE_URL}/about-me) 學歷、經歷、專案、獎項`,
            `- [筆記](${SITE_BASE_URL}/note) 分類、搜尋、收藏`,
            `- [筆記詳情](${SITE_BASE_URL}/notes/) 閱讀完整文章與章節目錄`,
            `- [聯絡我](${SITE_BASE_URL}/contact-me) 查看忙碌時段並寄信`,
        ].join("\n"),
        answerEn: [
            "[Website Guide]",
            `- [Home](${SITE_BASE_URL}/) chat-based Q&A and recent chats`,
            `- [About](${SITE_BASE_URL}/about-me) education, experience, projects, awards`,
            `- [Notes](${SITE_BASE_URL}/note) categories, search, stars`,
            `- [Note detail](${SITE_BASE_URL}/notes/) full article and table of contents`,
            `- [Contact](${SITE_BASE_URL}/contact-me) check busy slots and send email`,
        ].join("\n"),
    },
];

function loadRecentConversations() {
    try {
        const raw = localStorage.getItem(RECENT_CONVERSATIONS_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(
            (item) =>
                item &&
                typeof item.id === "string" &&
                typeof item.title === "string" &&
                typeof item.updatedAt === "number" &&
                Array.isArray(item.messages)
        );
    } catch {
        return [];
    }
}

function buildConversationTitle(question, language) {
    const text = (question || "").trim();
    if (!text) return language === "zh" ? "未命名對話" : "Untitled chat";
    return text.length > 24 ? `${text.slice(0, 24)}...` : text;
}

function buildAnswer(question, language) {
    const text = (question || "").toLowerCase().trim();
    if (!text) return language === "zh" ? "請輸入你的問題。" : "Please enter your question.";

    const scored = KNOWLEDGE_BASE.map((item) => {
        const score = item.keywords.reduce((acc, keyword) => (text.includes(keyword) ? acc + 1 : acc), 0);
        return { ...item, score };
    }).sort((a, b) => b.score - a.score);

    const matched = scored.filter((item) => item.score > 0);
    if (matched.length > 0) {
        const top = matched.slice(0, 2);
        return top
            .map((item) => (language === "zh" ? item.answerZh : item.answerEn))
            .join("\n\n");
    }

    return language === "zh"
        ? [
            "我目前還沒完全理解你的問題，你可以試試這些方向：",
            "- 學歷時間線",
            "- 教學經歷",
            "- 專案與競賽",
            "- 網站導覽（含連結）",
            "- 如何聯絡我",
        ].join("\n")
        : [
            "I cannot fully understand that yet. Try asking about:",
            "- education timeline",
            "- teaching experience",
            "- projects and awards",
            "- website guide with links",
            "- contact method",
        ].join("\n");
}

function ChatBubble({ role, text }) {
    const isUser = role === "user";
    return (
        <Stack direction="row" spacing={1.25} justifyContent={isUser ? "flex-end" : "flex-start"}>
            {!isUser && (
                <Box
                    sx={(t) => ({
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: alpha(t.palette.primary.main, 0.16),
                    })}
                >
                    <SmartToyOutlinedIcon fontSize="small" />
                </Box>
            )}

            <Paper
                elevation={0}
                sx={(t) => ({
                    px: 1.5,
                    py: 1.2,
                    maxWidth: { xs: "86%", md: "78%" },
                    borderRadius: 2.5,
                    border: `1px solid ${t.palette.divider}`,
                    bgcolor: isUser ? alpha(t.palette.primary.main, 0.18) : "transparent",
                })}
            >
                {isUser ? (
                    <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                        {text}
                    </Typography>
                ) : (
                    <Box
                        sx={{
                            "& p": { m: 0, mb: 1, lineHeight: 1.7 },
                            "& p:last-of-type": { mb: 0 },
                            "& ul, & ol": { m: 0, pl: 2.5 },
                            "& li": { mb: 0.5 },
                            "& li:last-of-type": { mb: 0 },
                            "& a": { color: "primary.main", textDecoration: "underline" },
                            "& code": {
                                fontSize: 12,
                                px: 0.5,
                                py: 0.2,
                                borderRadius: 0.5,
                                bgcolor: "action.hover",
                            },
                        }}
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                a: ({ href, children }) => (
                                    <a href={href} target="_blank" rel="noopener noreferrer">
                                        {children}
                                    </a>
                                ),
                            }}
                        >
                            {text}
                        </ReactMarkdown>
                    </Box>
                )}
            </Paper>

            {isUser && (
                <Box
                    sx={(t) => ({
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: alpha(t.palette.text.primary, 0.14),
                    })}
                >
                    <PersonOutlinedIcon fontSize="small" />
                </Box>
            )}
        </Stack>
    );
}

function Composer({ value, onChange, onSend, placeholder }) {
    return (
        <TextField
            fullWidth
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSend();
                }
            }}
            InputProps={{
                endAdornment: (
                    <IconButton aria-label="send" color="primary" onClick={onSend} disabled={!value.trim()}>
                        <SendRoundedIcon />
                    </IconButton>
                ),
            }}
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: 3.5,
                    bgcolor: "background.paper",
                },
            }}
        />
    );
}

function Sidebar({
    language,
    onQuickPrompt,
    onNewChat,
    recentConversations,
    activeConversationId,
    onSelectConversation,
    onDeleteConversationRequest,
}) {
    const quickPrompts = language === "zh" ? QUICK_PROMPTS_ZH : QUICK_PROMPTS_EN;

    return (
        <Box
            sx={(t) => ({
                height: "100%",
                borderRight: `1px solid ${t.palette.divider}`,
                bgcolor: alpha(t.palette.background.paper, 0.7),
                p: 1.25,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                overflow: "hidden",
            })}
        >
            <Button
                onClick={onNewChat}
                fullWidth
                startIcon={<AddRoundedIcon />}
                variant="outlined"
                sx={{ justifyContent: "flex-start", textTransform: "none", borderRadius: 2 }}
            >
                {language === "zh" ? "新對話" : "New chat"}
            </Button>

            <Box sx={{ px: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                    {language === "zh" ? "模型" : "Model"}
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                    {language === "zh" ? "本地模型 (未建置)" : "local model not built yet"}
                </Typography>
            </Box>

            <Box>
                <Typography variant="caption" color="text.secondary" sx={{ px: 0.5 }}>
                    {language === "zh" ? "範例問題" : "Prompt examples"}
                </Typography>
                <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                    {quickPrompts.map((item) => (
                        <Button
                            key={item}
                            variant="text"
                            fullWidth
                            onClick={() => onQuickPrompt(item)}
                            sx={{
                                justifyContent: "flex-start",
                                textAlign: "left",
                                textTransform: "none",
                                borderRadius: 1.5,
                            }}
                        >
                            {item}
                        </Button>
                    ))}
                </Stack>
            </Box>

            <Divider sx={{ my: 0.5 }} />

            <Box
                sx={{
                    flex: 1,
                    minHeight: 0,
                    overflowY: "auto",
                    pr: 0.5,
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                <Typography variant="caption" color="text.secondary" sx={{ px: 0.5 }}>
                    {language === "zh" ? "最近對話" : "Recent chats"}
                </Typography>
                <Stack spacing={0.4} sx={{ mt: 0.5 }}>
                    {recentConversations.length > 0 ? (
                        recentConversations.map((item) => (
                            <Box
                                key={item.id}
                                sx={(t) => ({
                                    display: "flex",
                                    alignItems: "center",
                                    borderRadius: 1.5,
                                    pr: 0.25,
                                    bgcolor:
                                        item.id === activeConversationId
                                            ? alpha(t.palette.primary.main, 0.14)
                                            : "transparent",
                                })}
                            >
                                <Button
                                    variant="text"
                                    onClick={() => onSelectConversation(item.id)}
                                    sx={(t) => ({
                                        flex: 1,
                                        justifyContent: "flex-start",
                                        textTransform: "none",
                                        borderRadius: 1.5,
                                        color:
                                            item.id === activeConversationId
                                                ? t.palette.text.primary
                                                : "text.secondary",
                                        minWidth: 0,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    })}
                                >
                                    {item.title}
                                </Button>
                                <IconButton
                                    size="small"
                                    aria-label={language === "zh" ? "刪除對話" : "Delete chat"}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteConversationRequest(item);
                                    }}
                                    sx={{ color: "text.secondary" }}
                                >
                                    <DeleteOutlineRoundedIcon fontSize="inherit" />
                                </IconButton>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="caption" color="text.secondary" sx={{ px: 0.8, py: 0.8 }}>
                            {language === "zh" ? "目前沒有最近對話" : "No recent chats yet"}
                        </Typography>
                    )}
                </Stack>
            </Box>

            <Box sx={{ alignSelf: "stretch", pt: 0.5 }}>
                <Footer compact showSettings />
            </Box>
        </Box>
    );
}

export default function HomeChatExperience() {
    const muiTheme = useTheme();
    const isDark = muiTheme.palette.mode === "dark";
    const dialogSx = getAppDialogSx(isDark);
    const { language = "zh" } = useContext(LanguageContext);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [input, setInput] = useState("");
    const messageViewportRef = useRef(null);
    const [conversations, setConversations] = useState(() => loadRecentConversations());
    const [activeConversationId, setActiveConversationId] = useState(
        () => loadRecentConversations()[0]?.id || null
    );
    const [deleteTarget, setDeleteTarget] = useState(null);

    const placeholder = language === "zh" ? "輸入問題，例如：你是哪裡畢業的？" : "Ask something, e.g. where did you graduate from?";
    const welcomeTitle = language === "zh" ? "嗨，我是詹宇宸" : "Hi, I'm YC bot";
    const quickPrompts = useMemo(() => (language === "zh" ? QUICK_PROMPTS_ZH : QUICK_PROMPTS_EN), [language]);

    useEffect(() => {
        try {
            localStorage.setItem(
                RECENT_CONVERSATIONS_KEY,
                JSON.stringify(conversations.slice(0, MAX_RECENT_CONVERSATIONS))
            );
        } catch {
            // ignore localStorage errors
        }
    }, [conversations]);

    useEffect(() => {
        if (!activeConversationId) return;
        const exists = conversations.some((item) => item.id === activeConversationId);
        if (!exists) setActiveConversationId(conversations[0]?.id || null);
    }, [activeConversationId, conversations]);

    const activeConversation = useMemo(
        () => conversations.find((item) => item.id === activeConversationId) || null,
        [conversations, activeConversationId]
    );
    const messages = useMemo(
        () => activeConversation?.messages || [],
        [activeConversation]
    );
    const hasStarted = messages.length > 0;

    useEffect(() => {
        if (!hasStarted || !messageViewportRef.current) return;
        const viewport = messageViewportRef.current;
        const raf = window.requestAnimationFrame(() => {
            viewport.scrollTop = viewport.scrollHeight;
        });
        return () => window.cancelAnimationFrame(raf);
    }, [messages, activeConversationId, hasStarted]);

    const sendMessage = (content) => {
        const q = (content || input).trim();
        if (!q) return;

        const now = Date.now();
        const answer = buildAnswer(q, language);
        const existingActive = activeConversationId
            ? conversations.find((item) => item.id === activeConversationId)
            : null;
        const targetId = existingActive
            ? existingActive.id
            : `chat-${now}-${Math.random().toString(36).slice(2, 8)}`;
        const userMessage = { role: "user", text: q };
        const assistantMessage = { role: "assistant", text: answer };

        setConversations((prev) => {
            const old = prev.find((item) => item.id === targetId);
            const base = old || {
                id: targetId,
                title: buildConversationTitle(q, language),
                updatedAt: now,
                messages: [],
            };
            const updated = {
                ...base,
                title: base.title || buildConversationTitle(q, language),
                updatedAt: now,
                messages: [...base.messages, userMessage, assistantMessage],
            };
            const rest = prev.filter((item) => item.id !== targetId);
            return [updated, ...rest].slice(0, MAX_RECENT_CONVERSATIONS);
        });

        if (!existingActive) setActiveConversationId(targetId);
        setInput("");
    };

    const resetConversation = () => {
        setInput("");
        setActiveConversationId(null);
    };

    const confirmDeleteConversation = () => {
        if (!deleteTarget?.id) return;
        setConversations((prev) => prev.filter((item) => item.id !== deleteTarget.id));
        setActiveConversationId((prev) => (prev === deleteTarget.id ? null : prev));
        setDeleteTarget(null);
    };

    const sidebarContent = (
        <Sidebar
            language={language}
            onQuickPrompt={(question) => {
                sendMessage(question);
                setDrawerOpen(false);
            }}
            onNewChat={() => {
                resetConversation();
                setDrawerOpen(false);
            }}
            recentConversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={(id) => {
                setActiveConversationId(id);
                setDrawerOpen(false);
            }}
            onDeleteConversationRequest={(item) => {
                setDeleteTarget(item);
            }}
        />
    );

    return (
        <Box
            sx={(t) => ({
                height: {
                    xs: "calc(100dvh - var(--app-header-mobile, 56px))",
                    md: "calc(100dvh - var(--app-header-desktop, 64px))",
                },
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "260px minmax(0, 1fr)" },
                overflow: "hidden",
                bgcolor: t.palette.background.default,
            })}
        >
            {isMobile ? (
                <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: 280 } }}>
                    {sidebarContent}
                </Drawer>
            ) : (
                sidebarContent
            )}

            <Box sx={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
                <Box
                    sx={(t) => ({
                        px: { xs: 1.2, md: 2 },
                        py: 1.2,
                        borderBottom: `1px solid ${t.palette.divider}`,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        bgcolor: alpha(t.palette.background.paper, 0.45),
                    })}
                >
                    {isMobile && (
                        <IconButton size="small" onClick={() => setDrawerOpen(true)} aria-label="open sidebar">
                            <MenuRoundedIcon />
                        </IconButton>
                    )}
                    <Typography variant="subtitle1" fontWeight={700}>
                        {welcomeTitle}
                    </Typography>
                </Box>

                <Box
                    ref={messageViewportRef}
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        overflowY: hasStarted ? "auto" : "hidden",
                        p: { xs: 1.25, md: 2 },
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {!hasStarted ? (
                        <Stack sx={{ height: "100%" }} alignItems="center" justifyContent="center" spacing={2}>
                            <Typography variant="h4" fontWeight={800} textAlign="center">
                                {welcomeTitle}
                            </Typography>
                            <Typography color="text.secondary" textAlign="center">
                                {language === "zh"
                                    ? "輸入任何問題，我會用網站中的資訊即時回答你。"
                                    : "Ask anything and I will answer from profile knowledge."}
                            </Typography>
                            <Box sx={{ width: "100%", maxWidth: 760, mt: 1 }}>
                                <Composer
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onSend={() => sendMessage()}
                                    placeholder={placeholder}
                                />
                            </Box>
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                                {quickPrompts.map((prompt) => (
                                    <Button
                                        key={prompt}
                                        variant="outlined"
                                        onClick={() => sendMessage(prompt)}
                                        sx={{ textTransform: "none", borderRadius: 99 }}
                                    >
                                        {prompt}
                                    </Button>
                                ))}
                            </Stack>
                        </Stack>
                    ) : (
                        <Stack spacing={1.25}>
                            {messages.map((m, idx) => (
                                <ChatBubble key={`${m.role}-${idx}`} role={m.role} text={m.text} />
                            ))}
                        </Stack>
                    )}
                </Box>

                {hasStarted && (
                    <Box
                        sx={(t) => ({
                            borderTop: `1px solid ${t.palette.divider}`,
                            p: { xs: 1, md: 1.5 },
                            bgcolor: alpha(t.palette.background.paper, 0.55),
                        })}
                    >
                        <Composer
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onSend={() => sendMessage()}
                            placeholder={placeholder}
                        />
                    </Box>
                )}
            </Box>

            <Dialog
                open={Boolean(deleteTarget)}
                onClose={() => setDeleteTarget(null)}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: dialogSx.paper,
                }}
            >
                <DialogTitle sx={dialogSx.titleRow}>
                    <Typography sx={dialogSx.titleText}>
                        {language === "zh" ? "確認刪除對話" : "Confirm Delete"}
                    </Typography>
                    <IconButton
                        onClick={() => setDeleteTarget(null)}
                        size="small"
                        sx={dialogSx.closeButton}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={dialogSx.content}>
                    <Typography variant="body2" sx={dialogSx.bodyText}>
                        {language === "zh"
                            ? `確定要刪除「${deleteTarget?.title || "這筆對話"}」嗎？`
                            : `Are you sure you want to delete "${deleteTarget?.title || "this chat"}"?`}
                    </Typography>
                </DialogContent>
                <DialogActions sx={dialogSx.footer}>
                    <Button onClick={() => setDeleteTarget(null)} sx={dialogSx.cancelButton}>
                        {language === "zh" ? "取消" : "Cancel"}
                    </Button>
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={confirmDeleteConversation}
                        sx={dialogSx.primaryButton}
                    >
                        {language === "zh" ? "刪除" : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
