// src/components/phone/PhoneMyCalendar.jsx
import React, { useMemo, useState } from "react";
import { alpha, useTheme } from "@mui/material/styles";
import { Box, Paper, Typography, IconButton, Stack, Tooltip, ButtonBase } from "@mui/material";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import TodayRounded from "@mui/icons-material/TodayRounded";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { getEventsBetween } from "../../shared/calendar/eventStore";

dayjs.extend(isoWeek);

/** ===== 手機優化參數 ===== **/
const START_HOUR = 8;
const END_HOUR = 22; // 不含
const DAY_MIN = START_HOUR * 60;
const DAY_SPAN = (END_HOUR - START_HOUR) * 60; // 分鐘
const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => i + START_HOUR);

const HOUR_HEIGHT = 64;                  // 1 小時高度（可依喜好調）
const GRID_HEIGHT = (END_HOUR - START_HOUR) * HOUR_HEIGHT;
const LEFT_GUTTER = 52;                  // 左側時間欄寬
const CARD_MIN_PX = 28;                  // 事件最小高度

const topPx = (min) => Math.max(0, Math.min(DAY_SPAN, min - DAY_MIN)) * (HOUR_HEIGHT / 60);
const heightPx = (durMin) => Math.max(CARD_MIN_PX, (durMin * HOUR_HEIGHT) / 60);

/** 重疊事件分欄（單日用） */
function layoutTimedEventsOneDay(events) {
    const evts = [...events].sort((a, b) => new Date(a.start) - new Date(b.start));
    const clusters = [];
    let cur = [], curEnd = -Infinity;

    const startMin = (e) => dayjs(e.start).hour() * 60 + dayjs(e.start).minute();
    const endMin = (e) => {
        const ed = dayjs(e.end || e.start);
        return ed.hour() * 60 + ed.minute();
    };

    for (const e of evts) {
        const s = startMin(e);
        const ee = Math.max(s + 1, endMin(e)); // 允許 1 分鐘起跳
        if (!cur.length || s < curEnd) {
            cur.push({ ...e, __s: s, __e: ee });
            curEnd = Math.max(curEnd, ee);
        } else {
            clusters.push(cur);
            cur = [{ ...e, __s: s, __e: ee }];
            curEnd = ee;
        }
    }
    if (cur.length) clusters.push(cur);

    const positioned = [];
    clusters.forEach((group) => {
        const colsEnd = [];
        group.forEach((ev) => {
            let col = 0;
            while (col < colsEnd.length && ev.__s < colsEnd[col]) col++;
            colsEnd[col] = ev.__e;
            positioned.push({ ...ev, __col: col, __cols: null });
        });
        const maxCols = Math.min(colsEnd.length, 2); // 手機最多 2 欄
        positioned.slice(positioned.length - group.length).forEach((ev) => (ev.__cols = maxCols));
    });

    return positioned.map((ev) => {
        const gap = 4;
        const widthPct = 100 / ev.__cols;
        const width = `calc(${widthPct}% - ${(gap * (ev.__cols - 1)) / ev.__cols}px)`;
        const left = `calc(${(ev.__col / ev.__cols) * 100}% + ${ev.__col * gap}px)`;
        return {
            ...ev,
            __topPx: topPx(ev.__s),
            __heightPx: heightPx(ev.__e - ev.__s),
            __leftPct: left,
            __widthPct: width,
        };
    });
}

export default function PhoneMyCalendar() {
    const t = useTheme();
    const [selected, setSelected] = useState(dayjs()); // 目前顯示的日期
    const weekStart = useMemo(() => selected.isoWeekday(1).startOf("day"), [selected]);
    const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => weekStart.add(i, "day")), [weekStart]);

    // 只抓單日區間（保留 weekly repeat 展開邏輯）
    const dayStartISO = useMemo(() => selected.startOf("day").toISOString(), [selected]);
    const dayEndISO = useMemo(() => selected.endOf("day").toISOString(), [selected]);
    const allEvents = useMemo(
        () => getEventsBetween(dayStartISO, dayEndISO).sort((a, b) => new Date(a.start) - new Date(b.start)),
        [dayStartISO, dayEndISO]
    );

    const allDayEvents = allEvents.filter((e) => !!e.allDay);
    const timedEvents = layoutTimedEventsOneDay(allEvents.filter((e) => !e.allDay));

    /** 動態字色 */
    const ink = t.palette.mode === "dark" ? "rgba(255,255,255,.92)" : "rgba(0,0,0,.88)";
    const muted = t.palette.mode === "dark" ? "rgba(255,255,255,.65)" : "rgba(0,0,0,.60)";

    const hLabel = (h) => `${String(h).padStart(2, "0")}:00`;

    const WeekSwitcher = () => (
        <Box sx={{ display: "flex", gap: 0.5, overflowX: "auto", pb: 0.5 }}>
            {weekDays.map((d) => {
                const active = d.isSame(selected, "day");
                const today = d.isSame(dayjs(), "day");
                return (
                    <ButtonBase
                        key={d.format("YYYY-MM-DD")}
                        onClick={() => setSelected(d)}
                        sx={(t) => ({
                            position: "relative",
                            flex: "0 0 auto",
                            borderRadius: 999,
                            minWidth: 56,
                            height: 44,
                            px: 1,
                            display: "grid",
                            placeItems: "center",
                            rowGap: 0.25,
                            fontWeight: 900,
                            userSelect: "none",
                            outline: "none",
                            bgcolor: active
                                ? t.palette.primary.main
                                : alpha(t.palette.text.primary, t.palette.mode === "dark" ? 0.08 : 0.06),
                            color: active
                                ? t.palette.primary.contrastText
                                : today
                                    ? t.palette.primary.main
                                    : t.palette.text.primary,
                            boxShadow: active ? t.shadows[2] : "none",
                            border: active
                                ? "none"
                                : `1px solid ${today ? alpha(t.palette.primary.main, 0.65) : alpha(t.palette.divider, 0.6)
                                }`,
                            transition: "background-color .15s ease, box-shadow .15s ease, transform .05s ease",
                            "&:hover": {
                                bgcolor: active
                                    ? t.palette.primary.main
                                    : alpha(t.palette.text.primary, t.palette.mode === "dark" ? 0.14 : 0.12),
                            },
                            "&:active": { transform: "scale(0.98)" },

                            // 今天（未選中）顯示底線，不會壓到文字
                            ...(today && !active
                                ? {
                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        left: 10,
                                        right: 10,
                                        bottom: -3,
                                        height: 2,
                                        borderRadius: 2,
                                        backgroundColor: t.palette.primary.main,
                                    },
                                }
                                : {}),
                        })}
                    >
                        <Typography variant="caption" sx={{ lineHeight: 1, opacity: active ? 0.95 : 0.85 }}>
                            {d.format("ddd")}
                        </Typography>
                        <Typography variant="body2" sx={{ lineHeight: 1, mt: 0.25 }}>
                            {d.format("M/D")}
                        </Typography>
                    </ButtonBase>
                );
            })}
        </Box>
    );



    return (
        <Paper elevation={0} square sx={{ p: 0, bgcolor: "transparent", backgroundImage: "none", boxShadow: "none", border: "none" }}>
            {/* 工具列 */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton size="small" onClick={() => setSelected((p) => p.subtract(1, "day"))}><ArrowBackIosNew fontSize="small" /></IconButton>
                    <Typography variant="h6" fontWeight={900} sx={{ color: ink }}>
                        {selected.format("YYYY/MM/DD (ddd)")}
                    </Typography>
                    <IconButton size="small" onClick={() => setSelected((p) => p.add(1, "day"))}><ArrowForwardIos fontSize="small" /></IconButton>
                </Stack>
                <IconButton size="small" onClick={() => setSelected(dayjs())}><TodayRounded fontSize="small" /></IconButton>
            </Stack>

            {/* 週快速切換 */}
            <WeekSwitcher />

            {/* ===== 日曆卡：不使用內部滑輪，整塊展開 ===== */}
            <Box
                sx={{
                    // border: `1px solid ${alpha(t.palette.divider, 0.6)}`,
                    borderRadius: 12,
                    overflow: "visible",
                    bgcolor: "transparent",
                }}
            >
                {/* 第一行：日期＋星期 */}
                <Box
                    sx={{
                        height: 44,
                        display: "flex",
                        alignItems: "center",
                        px: 1.25,
                        borderBottom: `1px solid ${t.palette.divider}`,
                    }}
                >
                    <Typography variant="subtitle2" fontWeight={900} sx={{ color: ink }}>
                        {selected.format("YYYY/MM/DD (ddd)")}
                    </Typography>
                </Box>

                {/* All-day 區：自動換行（不水平滑動） */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        alignItems: "center",
                        px: 1,
                        py: allDayEvents.length ? 0.75 : 0,
                        borderBottom: allDayEvents.length ? `1px dashed ${alpha(t.palette.divider, 0.6)}` : "none",
                    }}
                >
                    {allDayEvents.map((e) => (
                        <Tooltip
                            key={e.id}
                            title={
                                <Box sx={{ display: "grid", rowGap: 0.25 }}>
                                    <Typography variant="subtitle2" fontWeight={800} sx={{ color: ink }}>{e.title}</Typography>
                                    {e.location && <Typography variant="caption" sx={{ color: muted }}>地點：{e.location}</Typography>}
                                </Box>
                            }
                            arrow
                            enterTouchDelay={0}
                            leaveTouchDelay={1200}
                            slotProps={{ tooltip: { sx: { bgcolor: alpha(t.palette.background.paper, 0.96) } } }}
                        >
                            <Box
                                sx={{
                                    px: 1, py: 0.5, borderRadius: 1,
                                    fontSize: 12, fontWeight: 800, whiteSpace: "nowrap",
                                    bgcolor: alpha(e.color || t.palette.primary.main, 0.18),
                                    border: `1px solid ${alpha(e.color || t.palette.primary.main, 0.4)}`,
                                    color: ink,
                                }}
                            >
                                {e.title}
                            </Box>
                        </Tooltip>
                    ))}
                </Box>

                {/* 時間軸：整塊展開（無內部 overflow） */}
                <Box sx={{ position: "relative", width: "100%", height: GRID_HEIGHT }}>
                    {/* 小時水平線 */}
                    {HOURS.map((h) => (
                        <Box
                            key={`line-${h}`}
                            sx={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: (h - START_HOUR) * HOUR_HEIGHT,
                                borderTop: `1px dashed ${alpha(t.palette.divider, 0.6)}`,
                            }}
                        />
                    ))}

                    {/* 左側時間標籤 */}
                    {HOURS.map((h) => (
                        <Box
                            key={`label-${h}`}
                            sx={{
                                position: "absolute",
                                left: 0,
                                width: LEFT_GUTTER,
                                top: (h - START_HOUR) * HOUR_HEIGHT,
                                transform: "translateY(-50%)",
                                pr: 1,
                            }}
                        >
                            <Typography variant="caption" sx={{ color: muted, fontVariantNumeric: "tabular-nums" }}>
                                {hLabel(h)}
                            </Typography>
                        </Box>
                    ))}

                    {/* 事件容器（扣掉左側時間欄） */}
                    <Box sx={{ position: "absolute", left: LEFT_GUTTER, right: 0, top: 0, bottom: 0 }}>
                        {/* 若為今天：現在時間線 */}
                        {selected.isSame(dayjs(), "day") && dayjs().hour() >= START_HOUR && dayjs().hour() < END_HOUR && (
                            <Box sx={{ position: "absolute", left: 4, right: 4, top: topPx(dayjs().hour() * 60 + dayjs().minute()), height: 0 }}>
                                <Box sx={{ height: 2, bgcolor: t.palette.error.main, borderRadius: 2 }} />
                                <Box sx={{ position: "absolute", left: -2, top: -3, width: 8, height: 8, borderRadius: "50%", bgcolor: t.palette.error.main }} />
                            </Box>
                        )}

                        {/* 事件卡片 */}
                        {timedEvents.map((e) => (
                            <Tooltip
                                key={e.id}
                                title={
                                    <Box sx={{ display: "grid", rowGap: 0.25 }}>
                                        <Typography variant="subtitle2" fontWeight={800} sx={{ color: ink }}>{e.title}</Typography>
                                        <Typography variant="caption" sx={{ color: muted }}>
                                            {dayjs(e.start).format("HH:mm")}–{dayjs(e.end || e.start).format("HH:mm")}
                                        </Typography>
                                        {e.location && <Typography variant="caption" sx={{ color: ink }}>地點：{e.location}</Typography>}
                                    </Box>
                                }
                                arrow
                                enterTouchDelay={0}
                                leaveTouchDelay={1200}
                                slotProps={{ tooltip: { sx: { bgcolor: alpha(t.palette.background.paper, 0.96) } } }}
                            >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        left: e.__leftPct,
                                        width: e.__widthPct,
                                        top: e.__topPx,
                                        height: e.__heightPx,
                                        borderRadius: 1.5,
                                        px: 0.75,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        bgcolor: alpha(e.color || t.palette.primary.main, 0.18),
                                        border: `1px solid ${alpha(e.color || t.palette.primary.main, 0.45)}`,
                                        boxShadow: t.palette.mode === "dark" ? "0 2px 10px rgba(0,0,0,.25)" : "0 2px 8px rgba(0,0,0,.08)",
                                        overflow: "hidden",
                                        color: ink,
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        fontWeight={900}
                                        sx={{
                                            width: "100%",
                                            textAlign: "center",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            color: "inherit",
                                        }}
                                    >
                                        {e.title}
                                    </Typography>
                                </Box>
                            </Tooltip>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}
