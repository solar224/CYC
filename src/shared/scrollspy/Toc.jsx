import React, { useState, useEffect, useRef } from "react";
import { Paper, List, ListItemButton, ListItemText, Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useScrollSpy } from "./ScrollSpyProvider";

export function Toc({
    fixedRight = true,
    sidebarWidth = 260,
    collapsedWidth = 18,
    containerMaxWidth = 1200,
    hiddenOnMobile = true,
}) {
    const { sections, activeId, scrollTo } = useScrollSpy();
    const [open, setOpen] = useState(false);
    const [lockedId, setLockedId] = useState(null); // 點擊後暫時鎖定的目標
    const currentId = lockedId ?? activeId;         // UI 一律用這個來決定高亮
    const stableSinceRef = useRef(null);
    useEffect(() => {
        if (!lockedId) return;
        if (activeId === lockedId) {
            if (stableSinceRef.current == null) stableSinceRef.current = Date.now();
            const held = Date.now() - (stableSinceRef.current ?? Date.now());
            if (held >= 1000) {               // 400ms 穩定才解鎖
                setLockedId(null);
                stableSinceRef.current = null;
            }
        } else {
            // 一旦不相等就重置計時
            stableSinceRef.current = null;
        }
    }, [activeId, lockedId]);
    // 保障機制：若內容太短沒有觸發 spy，也在一段時間後自動解鎖
    useEffect(() => {
        if (!lockedId) return;
        const fallback = setTimeout(() => setLockedId(null), 5000);
        return () => clearTimeout(fallback);
    }, [lockedId]);
    const rightAtLg = `max(16px, calc((100vw - ${containerMaxWidth}px)/2 - ${sidebarWidth + 16
        }px))`;

    return (
        <Paper
            role="navigation"
            aria-label="頁面目錄"
            tabIndex={0}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
            }}
            elevation={0}
            sx={(t) => ({
                position: fixedRight ? { xs: "static", md: "fixed" } : "sticky",
                top: fixedRight ? { md: "50%" } : 80,
                transform: fixedRight ? { md: "translateY(-50%)" } : "none",
                right: fixedRight ? { md: 16, lg: rightAtLg } : "auto",
                width: { md: open ? sidebarWidth : collapsedWidth },
                maxHeight: { md: "70vh" },
                overflow: "hidden",
                zIndex: 1100,
                display: hiddenOnMobile ? { xs: "none", md: "block" } : "block",

                p: { md: open ? 1 : 0 },

                bgcolor: "transparent",
                backgroundImage: open
                    ? t.palette.mode === "dark"
                        ? "linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.015))"
                        : "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.04))"
                    : "none",
                backdropFilter: open ? "blur(4px) saturate(120%)" : "none",
                WebkitBackdropFilter: open ? "blur(4px) saturate(120%)" : "none",

                border: "none",
                boxShadow: open
                    ? (t.palette.mode === "dark"
                        ? "0 8px 30px rgba(0,0,0,.28)"
                        : "0 8px 24px rgba(0,0,0,.06)")
                    : "none",
                borderRadius: open ? 8 : 0,
                backgroundClip: "padding-box",

                transition:
                    "width .25s ease, padding .25s ease, background-color .2s ease, box-shadow .2s ease",
                cursor: open ? "default" : "pointer",
            })}

        >
            {/* 收合：垂直短杠 */}
            <Box
                aria-hidden
                sx={{
                    display: { md: open ? "none" : "flex" },
                    flexDirection: "column",
                    alignItems: "stretch",
                    gap: 0.75,
                    width: collapsedWidth - 4,
                    mx: "auto",
                    py: 0.5,
                }}
            >
                {sections.map((s) => (
                    <Box
                        key={s.id}
                        sx={(t) => ({
                            height: 2,
                            width: "100%",
                            borderRadius: 999,
                            bgcolor:
                                s.id === currentId
                                    ? t.palette.mode === "dark"
                                        ? t.palette.common.white
                                        : t.palette.primary.main
                                    : t.palette.text.secondary,
                            opacity: s.id === currentId ? 0.95 : 0.45,
                            boxShadow:
                                s.id === currentId
                                    ? t.palette.mode === "dark"
                                        ? "0 0 8px rgba(255,255,255,.7)"
                                        : `0 0 8px ${alpha(t.palette.primary.main, 0.55)}`
                                    : "none",
                            transform: s.id === currentId ? "scaleX(1.2)" : "scaleX(1)",
                            transition:
                                "opacity .2s ease, transform .2s ease, background-color .2s ease, box-shadow .2s ease",
                        })}
                    />
                ))}
            </Box>

            {/* 展開：完整目錄（點選後不會自動關閉） */}
            <List dense disablePadding sx={{ display: { md: open ? "block" : "none" } }}>
                {sections.map((s) => (
                    <ListItemButton
                        key={s.id}
                        disableRipple
                        selected={s.id === currentId}
                        onClick={() => {
                            setLockedId(s.id);
                            scrollTo(s.id);
                        }}
                        sx={(t) => ({
                            position: "relative",
                            // 多留一點左邊空間給「細色條」
                            pl: (s.level - 2) * 2 + 2.25,
                            py: 0.5,
                            my: 0.25,
                            borderRadius: 10,
                            transition:
                                "background-color .18s ease, transform .18s ease, color .18s ease",

                            // 未選時的 hover：很淡的底色
                            "&:hover": {
                                backgroundColor: alpha(t.palette.primary.main, 0.06),
                            },

                            // 左側細色條（僅在 hover/selected 時實心）
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                left: 10,                // 細色條距離左側
                                top: 6,
                                bottom: 6,
                                width: 3,
                                borderRadius: 2,
                                backgroundColor: "transparent",
                                transform: "scaleY(0.6)",
                                transition:
                                    "transform .18s ease, background-color .18s ease, box-shadow .18s ease",
                            },

                            // 鍵盤可及性：聚焦時有淡淡外框
                            "&.Mui-focusVisible": {
                                outline: `2px solid ${alpha(t.palette.primary.main, 0.25)}`,
                                outlineOffset: 2,
                            },

                            // ✅ 選到的樣式：左側細色條 + 文字顏色微提升 + 很淡底色
                            "&.Mui-selected": {
                                backgroundColor: alpha(t.palette.primary.main, 0.08),
                                "&:hover": { backgroundColor: alpha(t.palette.primary.main, 0.12) },
                                "&::before": {
                                    backgroundColor: t.palette.primary.main,
                                    boxShadow:
                                        t.palette.mode === "dark"
                                            ? "0 0 0 1px rgba(255,255,255,.08)"
                                            : "0 0 0 1px rgba(0,0,0,.04)",
                                    transform: "scaleY(1)",
                                },
                                // 讓字更穩重一些
                                "& .MuiListItemText-primary": {
                                    color: t.palette.text.primary,
                                    fontWeight: 700,
                                    letterSpacing: 0.1,
                                },
                            },
                        })}
                    >
                        <ListItemText
                            primary={s.title}
                            primaryTypographyProps={{
                                noWrap: true,
                                // 未選到時字重 500，更有資訊層次
                                fontWeight: s.id === currentId ? 700 : 500,
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>

        </Paper>
    );
}
