import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import StickyNote2RoundedIcon from "@mui/icons-material/StickyNote2Rounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import {
    Box,
    Stack,
    Typography,
    IconButton,
    Button,
    Drawer,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { getAppDialogSx } from "../../shared/dialog/dialogStyles";
import { ChatBubble, Composer, Sidebar, useChatState } from "./HomeChatExperience";

const NAV_BUTTONS = [
    { labelZh: "關於我", labelEn: "About", to: "/about-me", icon: <PersonRoundedIcon fontSize="small" /> },
    { labelZh: "聯絡", labelEn: "Contact", to: "/contact-me", icon: <MailRoundedIcon fontSize="small" /> },
    { labelZh: "筆記", labelEn: "Notes", to: "/note", icon: <StickyNote2RoundedIcon fontSize="small" /> },
    { labelZh: "小工具", labelEn: "Tools", to: "/tools", icon: <BuildRoundedIcon fontSize="small" /> },
];

function PhoneHome() {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

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
        messages,
        hasStarted,
        sendMessage,
        resetConversation,
        confirmDeleteConversation,
    } = useChatState();

    const muiTheme = useTheme();
    const isDark = muiTheme.palette.mode === "dark";
    const dialogSx = getAppDialogSx(isDark);

    const sidebarContent = (
        <Sidebar
            language={language}
            showPin={false}
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
            onDeleteConversationRequest={(item) => setDeleteTarget(item)}
        />
    );

    return (
        <Box
            sx={(t) => ({
                height: "calc(100dvh - var(--app-header-mobile, 56px))",
                display: "grid",
                gridTemplateColumns: "1fr",
                overflow: "hidden",
                bgcolor: t.palette.background.default,
            })}
        >
            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: 280 } }}>
                {sidebarContent}
            </Drawer>

            <Box sx={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
                <Box
                    sx={(t) => ({
                        px: 1.2,
                        py: 1.2,
                        borderBottom: `1px solid ${t.palette.divider}`,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        bgcolor: alpha(t.palette.background.paper, 0.45),
                    })}
                >
                    <IconButton size="small" onClick={() => setDrawerOpen(true)} aria-label="open sidebar">
                        <MenuRoundedIcon />
                    </IconButton>
                    <Typography variant="subtitle1" fontWeight={700}>
                        {headerTitle}
                    </Typography>
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
                            p: 1.25,
                            opacity: hasStarted ? 0 : 1,
                            transform: hasStarted ? "translateY(-12px) scale(0.99)" : "translateY(0) scale(1)",
                            transition: "opacity 0.32s ease, transform 0.32s ease",
                            pointerEvents: hasStarted ? "none" : "auto",
                        }}
                    >
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
                                    inputBorderRadius={6}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: 1,
                                    width: "100%",
                                    maxWidth: 340,
                                    mt: 1,
                                }}
                            >
                                {NAV_BUTTONS.map((item) => (
                                    <Button
                                        key={item.to}
                                        variant="outlined"
                                        startIcon={item.icon}
                                        onClick={() => navigate(item.to)}
                                        sx={{
                                            textTransform: "none",
                                            borderRadius: 99,
                                            fontWeight: 600,
                                            py: 1,
                                        }}
                                    >
                                        {language === "zh" ? item.labelZh : item.labelEn}
                                    </Button>
                                ))}
                            </Box>
                        </Stack>
                    </Box>

                    <Box
                        ref={messageViewportRef}
                        sx={{
                            position: "absolute",
                            inset: 0,
                            p: 1.25,
                            pb: hasStarted ? "calc(env(safe-area-inset-bottom, 0px) + 108px)" : "calc(env(safe-area-inset-bottom, 0px) + 10px)",
                            overflowY: hasStarted ? "auto" : "hidden",
                            scrollbarWidth: "none",
                            "&::-webkit-scrollbar": { display: "none" },
                            opacity: hasStarted ? 1 : 0,
                            transform: hasStarted ? "translateY(0)" : "translateY(12px)",
                            transition: "opacity 0.32s ease, transform 0.32s ease",
                            pointerEvents: hasStarted ? "auto" : "none",
                        }}
                    >
                        <Stack spacing={1.25}>
                            {messages.map((m, idx) => (
                                <ChatBubble key={`${m.role}-${idx}`} role={m.role} text={m.text} />
                            ))}
                        </Stack>
                    </Box>

                    <Box
                        sx={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            px: 1,
                            pt: 1,
                            pb: "calc(env(safe-area-inset-bottom, 0px) + 8px)",
                            opacity: hasStarted ? 1 : 0,
                            transform: hasStarted ? "translateY(0)" : "translateY(12px)",
                            transition: "opacity 0.28s ease, transform 0.32s ease",
                            pointerEvents: hasStarted ? "auto" : "none",
                            zIndex: 2,
                        }}
                    >
                        <Composer
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onSend={() => sendMessage()}
                            placeholder={placeholder}
                            inputBorderRadius={6}
                        />
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
    );
}

export default PhoneHome;
