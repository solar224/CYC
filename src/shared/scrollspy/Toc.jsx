// D:\CYC\src\shared\scrollspy\Toc.jsx
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
    const [lockedId, setLockedId] = useState(null);
    const currentId = lockedId ?? activeId;

    const stableSinceRef = useRef(null);
    const scrollRef = useRef(null); // ⬅️ 新增：清單可滾動容器

    useEffect(() => {
        if (!lockedId) return;
        if (activeId === lockedId) {
            if (stableSinceRef.current == null) stableSinceRef.current = Date.now();
            const held = Date.now() - (stableSinceRef.current ?? Date.now());
            if (held >= 1000) {
                setLockedId(null);
                stableSinceRef.current = null;
            }
        } else {
            stableSinceRef.current = null;
        }
    }, [activeId, lockedId]);

    useEffect(() => {
        if (!lockedId) return;
        const fallback = setTimeout(() => setLockedId(null), 5000);
        return () => clearTimeout(fallback);
    }, [lockedId]);

    // ⬅️ 新增：當 active/locked 改變時，自動把該項目捲到可視範圍
    useEffect(() => {
        if (!scrollRef.current || !currentId) return;
        const el = scrollRef.current.querySelector(`[data-toc-id="${currentId}"]`);
        if (el) el.scrollIntoView({ block: "nearest", inline: "nearest" });
    }, [currentId, open]);

    const rightAtLg = `max(16px, calc((100vw - ${containerMaxWidth}px)/2 - ${sidebarWidth + 16}px))`;

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
                maxHeight: { md: "70vh" },          // 高度限制維持在 70vh
                overflow: "hidden",                 // 讓外框維持乾淨；真正的滾動交給內層
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

            {/* 展開：完整目錄（可垂直滾動） */}
            <Box
                ref={scrollRef}
                sx={(t) => ({
                    display: { md: open ? "block" : "none" },
                    maxHeight: { md: "70vh" },     // 與外層同高，確保內層成為滾動容器
                    overflowY: "auto",
                    pr: 0.5,                       // 滾動條不壓文字
                    // 些微捲軸樣式（可移除）
                    "&::-webkit-scrollbar": { width: 8 },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: alpha(t.palette.text.primary, 0.25),
                        borderRadius: 8,
                    },
                    "&:hover::-webkit-scrollbar-thumb": {
                        backgroundColor: alpha(t.palette.text.primary, 0.4),
                    },
                    // 上下淡淡遮罩，視覺上提示可滾動（非必要）
                    maskImage:
                        "linear-gradient(to bottom, transparent 0, black 12px, black calc(100% - 12px), transparent 100%)",
                })}
            >
                <List dense disablePadding>
                    {sections.map((s) => (
                        <ListItemButton
                            key={s.id}
                            data-toc-id={s.id}          // ⬅️ 用來 auto scroll 的定位
                            disableRipple
                            selected={s.id === currentId}
                            onClick={() => {
                                setLockedId(s.id);
                                scrollTo(s.id);
                            }}
                            sx={(t) => ({
                                position: "relative",
                                pl: (s.level - 2) * 2 + 4,
                                py: 0.5,
                                my: 0.25,
                                borderRadius: 10,
                                transition:
                                    "background-color .18s ease, transform .18s ease, color .18s ease",
                                "&:hover": {
                                    backgroundColor: alpha(t.palette.primary.main, 0.06),
                                },
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    left: 12,
                                    top: 6,
                                    bottom: 6,
                                    width: 3,
                                    borderRadius: 2,
                                    backgroundColor: "transparent",
                                    transform: "scaleY(0.6)",
                                    transition:
                                        "transform .18s ease, background-color .18s ease, box-shadow .18s ease",
                                },
                                "&.Mui-focusVisible": {
                                    outline: `2px solid ${alpha(t.palette.primary.main, 0.25)}`,
                                    outlineOffset: 2,
                                },
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
                                    sx: { pr: 1 },
                                    fontWeight: s.id === currentId ? 700 : 500,
                                }}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        </Paper>
    );
}
