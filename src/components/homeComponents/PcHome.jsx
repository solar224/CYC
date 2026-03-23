import React, { useContext, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import TranslateIcon from "@mui/icons-material/Translate";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
    Box,
    Stack,
    Typography,
    Button,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Tooltip,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { getAppDialogSx } from "../../shared/dialog/dialogStyles";
import { ScrollSpyProvider, SpySection, Toc } from "../../shared/scrollspy";
import { ChatBubble, Composer, Sidebar, useChatState } from "./HomeChatExperience";
import { ThemeContext, LanguageContext } from "../../App";

const SIDEBAR_WIDTH = 260;
const COLLAPSED_WIDTH = 0;
const TRANSITION = "width 0.3s cubic-bezier(0.4,0,0.2,1), min-width 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease";

function PcHome() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarPinned, setSidebarPinned] = useState(false);
    const sidebarVisible = sidebarOpen || sidebarPinned;

    const {
        language,
        input,
        setInput,
        messageViewportRef,
        conversations,
        activeConversationId,
        setActiveConversationId,
        deleteTarget,
        setDeleteTarget,
        placeholder,
        headerTitle,
        welcomeTitle,
        quickPrompts,
        messages,
        hasStarted,
        sendMessage,
        resetConversation,
        confirmDeleteConversation,
    } = useChatState();

    const muiTheme = useTheme();
    const isDark = muiTheme.palette.mode === "dark";
    const dialogSx = getAppDialogSx(isDark);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { language: appLanguage, toggleLanguage } = useContext(LanguageContext);

    const messagesWithQuestionMeta = useMemo(() => {
        let questionIndex = 0;
        return messages.map((message, idx) => {
            if (message.role !== "user") {
                return { message, idx, sectionId: null, questionIndex: null };
            }
            const current = questionIndex;
            questionIndex += 1;
            return {
                message,
                idx,
                sectionId: `chat-question-${current}`,
                questionIndex: current,
            };
        });
    }, [messages]);

    const getQuestionSectionTitle = (message, questionIndex) => {
        const prefix = language === "zh" ? "問題" : "Question";
        const snippet = (message.text || "")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 20);
        return `${prefix} ${questionIndex + 1}${snippet ? `: ${snippet}` : ""}`;
    };

    const sidebarContent = (
        <Sidebar
            language={language}
            onQuickPrompt={(question) => sendMessage(question)}
            onNewChat={() => resetConversation()}
            sidebarPinned={sidebarPinned}
            onToggleSidebarPinned={() => {
                setSidebarPinned((prev) => {
                    const next = !prev;
                    setSidebarOpen(next ? true : false);
                    return next;
                });
            }}
            recentConversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={(id) => setActiveConversationId(id)}
            onDeleteConversationRequest={(item) => setDeleteTarget(item)}
        />
    );

    return (
        <ScrollSpyProvider
            scrollContainerRef={messageViewportRef}
            headerOffset={12}
            rootMargin="-8px 0px -72% 0px"
        >
            <Box
                sx={(t) => ({
                    height: "calc(100dvh - var(--app-header-desktop, 64px))",
                    display: "flex",
                    overflow: "hidden",
                    bgcolor: t.palette.background.default,
                })}
            >
                {/* Left-edge hover zone: auto-expand when mouse reaches the left edge */}
                {!sidebarVisible && (
                    <Box
                        onMouseEnter={() => setSidebarOpen(true)}
                        sx={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: 12,
                            height: "100%",
                            zIndex: 2,
                            cursor: "pointer",
                        }}
                    />
                )}

                {/* Collapsible Sidebar */}
                <Box
                    onMouseLeave={() => {
                        if (!sidebarPinned) setSidebarOpen(false);
                    }}
                    sx={{
                        width: sidebarVisible ? SIDEBAR_WIDTH : COLLAPSED_WIDTH,
                        minWidth: sidebarVisible ? SIDEBAR_WIDTH : COLLAPSED_WIDTH,
                        overflow: "hidden",
                        transition: TRANSITION,
                        position: "relative",
                    }}
                >
                    <Box
                        sx={{
                            width: SIDEBAR_WIDTH,
                            height: "100%",
                            opacity: sidebarVisible ? 1 : 0,
                            transition: TRANSITION,
                            pointerEvents: sidebarVisible ? "auto" : "none",
                        }}
                    >
                        {sidebarContent}
                    </Box>
                </Box>

                {/* Animated indicator (non-interactive) */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        pt: 1.2,
                        position: "relative",
                        zIndex: 1,
                        px: 0.5,
                        pointerEvents: "none",
                    }}
                >
                    <Box
                        aria-hidden
                        sx={(t) => ({
                            width: 32,
                            height: 32,
                            borderRadius: 1,
                            display: "grid",
                            placeItems: "center",
                            color: alpha(t.palette.text.primary, 0.35),
                            animation: sidebarVisible ? "chevronDriftLeft 1.15s ease-in-out infinite" : "chevronDriftRight 1.15s ease-in-out infinite",
                            "@keyframes chevronDriftRight": {
                                "0%, 100%": { transform: "translateX(0)" },
                                "50%": { transform: "translateX(3px)" },
                            },
                            "@keyframes chevronDriftLeft": {
                                "0%, 100%": { transform: "translateX(0)" },
                                "50%": { transform: "translateX(-3px)" },
                            },
                        })}
                    >
                        {sidebarVisible ? (
                            <ChevronLeftRoundedIcon sx={{ fontSize: 26 }} />
                        ) : (
                            <ChevronRightRoundedIcon sx={{ fontSize: 26 }} />
                        )}
                    </Box>
                </Box>

                {/* Main content */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 0,
                        flex: 1,
                    }}
                >
                    <Box
                        sx={(t) => ({
                            px: 2,
                            py: 1.2,
                            borderBottom: `1px solid ${t.palette.divider}`,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            bgcolor: alpha(t.palette.background.paper, 0.45),
                        })}
                    >
                        <Typography variant="subtitle1" fontWeight={700}>
                            {headerTitle}
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={0.2}
                            alignItems="center"
                            sx={{
                                opacity: sidebarPinned ? 0 : 1,
                                transform: sidebarPinned ? "translateX(8px)" : "translateX(0)",
                                transition: "opacity 0.26s ease, transform 0.26s ease",
                                pointerEvents: sidebarPinned ? "none" : "auto",
                            }}
                        >
                            <Tooltip title={appLanguage === "zh" ? "切換語言" : "Switch language"} placement="bottom">
                                <IconButton onClick={toggleLanguage} size="small" sx={{ color: "text.secondary" }}>
                                    <TranslateIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title={theme === "dark" ? "切換淺色模式" : "切換深色模式"} placement="bottom">
                                <IconButton onClick={toggleTheme} size="small" sx={{ color: "text.secondary" }}>
                                    {theme === "dark" ? (
                                        <LightModeIcon fontSize="small" />
                                    ) : (
                                        <DarkModeIcon fontSize="small" />
                                    )}
                                </IconButton>
                            </Tooltip>


                        </Stack>
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            minHeight: 0,
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                inset: 0,
                                opacity: hasStarted ? 0 : 1,
                                transform: hasStarted ? "translateY(-14px) scale(0.99)" : "translateY(0) scale(1)",
                                transition: "opacity 0.34s ease, transform 0.34s ease",
                                pointerEvents: hasStarted ? "none" : "auto",
                            }}
                        >
                            <Container maxWidth="lg" sx={{ height: "100%", px: { xs: 2, md: 3 } }}>
                                <Stack sx={{ height: "100%" }} alignItems="center" justifyContent="center" spacing={2}>
                                    <Typography variant="h4" fontWeight={800} textAlign="center">
                                        {welcomeTitle}
                                    </Typography>
                                    <Typography color="text.secondary" textAlign="center">
                                        {language === "zh"
                                            ? "輸入任何問題，我會用網站中的資訊即時回答你。"
                                            : "Ask anything and I will answer from profile knowledge."}
                                    </Typography>
                                    <Box sx={{ width: "100%", mt: 1 }}>
                                        <Box sx={{ width: "65%", minWidth: 320, mx: "auto" }}>
                                            <Composer
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                onSend={() => sendMessage()}
                                                placeholder={placeholder}
                                            />
                                        </Box>
                                    </Box>
                                    <Stack direction="row" spacing={1}>
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
                            </Container>
                        </Box>

                        <Box
                            ref={messageViewportRef}
                            sx={{
                                position: "absolute",
                                inset: 0,
                                overflowY: hasStarted ? "auto" : "hidden",
                                scrollbarWidth: "none",
                                "&::-webkit-scrollbar": { display: "none" },
                                opacity: hasStarted ? 1 : 0,
                                transform: hasStarted ? "translateY(0)" : "translateY(14px)",
                                transition: "opacity 0.34s ease, transform 0.34s ease",
                                pointerEvents: hasStarted ? "auto" : "none",
                            }}
                        >
                            <Container
                                maxWidth="lg"
                                sx={{
                                    px: { xs: 2, md: 3 },
                                    py: 2,
                                    pb: hasStarted ? "120px" : 2,
                                }}
                            >
                                <Stack spacing={1.25}>
                                    {messagesWithQuestionMeta.map(({ message, idx, sectionId, questionIndex }) => (
                                        sectionId ? (
                                            <SpySection
                                                key={`${message.role}-${idx}`}
                                                id={sectionId}
                                                title={getQuestionSectionTitle(message, questionIndex)}
                                            >
                                                <ChatBubble role={message.role} text={message.text} />
                                            </SpySection>
                                        ) : (
                                            <ChatBubble key={`${message.role}-${idx}`} role={message.role} text={message.text} />
                                        )
                                    ))}
                                </Stack>
                            </Container>
                        </Box>

                        <Box
                            sx={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                bottom: 0,
                                opacity: hasStarted ? 1 : 0,
                                transform: hasStarted ? "translateY(0)" : "translateY(12px)",
                                transition: "opacity 0.3s ease, transform 0.34s ease",
                                pointerEvents: hasStarted ? "auto" : "none",
                                zIndex: 2,
                            }}
                        >
                            <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 }, pb: 1.5 }}>
                                <Box sx={{ width: "65%", minWidth: 320, mx: "auto" }}>
                                    <Composer
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onSend={() => sendMessage()}
                                        placeholder={placeholder}
                                    />
                                </Box>
                            </Container>
                        </Box>
                    </Box>
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

            {hasStarted && (
                <Toc
                    sidebarWidth={240}
                    collapsedWidth={18}
                    containerMaxWidth={1200}
                />
            )}
        </ScrollSpyProvider>
    );
}

export default PcHome;
