import React, { useMemo, useState } from "react";
import { alpha, useTheme } from "@mui/material/styles";
import { Box, Paper, Typography, IconButton, Stack, Tooltip } from "@mui/material";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import TodayRounded from "@mui/icons-material/TodayRounded";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { getEventsBetween } from "../../shared/calendar/eventStore";

dayjs.extend(isoWeek);

/** ===== 佈局參數 ===== **/
const START_HOUR = 8;
const END_HOUR = 22; // 不含
const DAY_MIN = START_HOUR * 60;
const DAY_SPAN = (END_HOUR - START_HOUR) * 60; // 分鐘
const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => i + START_HOUR);
const ALLDAY_H = 32;
const GUTTER_PX = 4;

const pctTop = (m) => `${Math.max(0, Math.min(1, (m - DAY_MIN) / DAY_SPAN)) * 100}%`;
const pctHeight = (durMin) => `${(durMin / DAY_SPAN) * 100}%`;

/** 重疊事件分欄 */
function layoutTimedEvents(events) {
    const evts = [...events].sort((a, b) => new Date(a.start) - new Date(b.start));
    const clusters = [];
    let cur = [], curEnd = -Infinity;

    const startMin = (e) => dayjs(e.start).hour() * 60 + dayjs(e.start).minute();
    const endMin = (e) => {
        const ed = dayjs(e.end || e.start);
        return ed.hour() * 60 + ed.minute();
    };

    for (const e of evts) {
        const s = startMin(e), ee = Math.max(s + 1, endMin(e));
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
        const maxCols = colsEnd.length;
        positioned.slice(positioned.length - group.length).forEach((ev) => (ev.__cols = maxCols));
    });

    return positioned.map((ev) => {
        const width = `calc(${100 / ev.__cols}% - ${(GUTTER_PX * (ev.__cols - 1)) / ev.__cols}px)`;
        const left = `calc(${(ev.__col / ev.__cols) * 100}% + ${ev.__col * GUTTER_PX}px)`;
        return {
            ...ev,
            __top: pctTop(ev.__s),
            __height: pctHeight(ev.__e - ev.__s),
            __left: left,
            __width: width,
        };
    });
}

export default function PcMyCalendar() {
    const t = useTheme();
    const [anchor, setAnchor] = useState(dayjs());

    const start = useMemo(() => anchor.isoWeekday(1).startOf("day"), [anchor]);
    const end = useMemo(() => start.add(7, "day").endOf("day"), [start]);

    const events = useMemo(
        () => getEventsBetween(start.toISOString(), end.toISOString()).sort((a, b) => new Date(a.start) - new Date(b.start)),
        [start, end]
    );

    const days = useMemo(() => Array.from({ length: 7 }, (_, i) => start.add(i, "day")), [start]);

    /** 動態字色：亮/暗主題自動切換 */
    const ink = t.palette.mode === "dark" ? "rgba(255,255,255,.92)" : "rgba(0,0,0,.88)";
    const muted = t.palette.mode === "dark" ? "rgba(255,255,255,.65)" : "rgba(0,0,0,.60)";

    const headerText = (d) => d.isSame(dayjs(), "day") ? { fontWeight: 900, color: t.palette.primary.main } : { fontWeight: 800 };


    // Tooltip 卡片
    const tooltipPaperSx = (th) => ({
        bgcolor: th.palette.mode === "dark" ? alpha("#0a0a0a", 0.92) : alpha(th.palette.background.paper, 0.96),

    });

    const EventTooltip = ({ e }) => {
        const s = dayjs(e.start), ee = dayjs(e.end || e.start);
        return (
            <Box sx={{ display: "grid", rowGap: 0.25 }}>
                <Typography variant="subtitle2" fontWeight={800} sx={{ color: ink }}>{e.title}</Typography>
                <Typography variant="caption" sx={{ color: muted }}>
                    {e.allDay ? "整天" : `${s.format("MM/DD HH:mm")} – ${ee.format("HH:mm")}`}
                </Typography>
                {e.location && <Typography variant="caption" sx={{ mt: 0.25, color: ink }}>地點：{e.location}</Typography>}
                {e.note && <Typography variant="caption" sx={{ mt: 0.25, color: ink }}>{e.note}</Typography>}
            </Box>
        );
    };

    // 現在時間線（在今天欄位才顯示）
    const now = dayjs();
    const showNow = now.hour() >= START_HOUR && now.hour() < END_HOUR;
    const nowTop = pctTop(now.hour() * 60 + now.minute());

    /** 垂直分隔線 Overlay：涵蓋 All-day + 時間區，避免斷線或雙線 */
    const VerticalGridLines = () => (
        <Box
            aria-hidden
            sx={{
                gridColumn: "2 / span 7",
                gridRow: "2 / span 2",
                position: "relative",
                pointerEvents: "none",
            }}
        >
            {Array.from({ length: 6 }).map((_, idx) => {
                const i = idx + 1;
                return (
                    <Box
                        key={i}
                        sx={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: `${(100 / 7) * i}%`,
                            borderLeft: `1px solid ${alpha(t.palette.divider, 0.6)}`,
                        }}
                    />
                );
            })}
        </Box>
    );

    return (
        <Paper
            elevation={0}
            square
            // ✅ 完全透明背景：同時關閉 dark mode overlay
            sx={{
                p: 0,
                bgcolor: "transparent",
                backgroundImage: "none",
                boxShadow: "none",
                border: "none",
            }
            }
        >
            {/* Toolbar */}
            < Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }
            }>
                <Typography variant="h6" fontWeight={900} sx={{ color: ink }}>
                    {start.format("YYYY/MM/DD")} – {start.add(6, "day").format("MM/DD")}
                </Typography>
                <Stack direction="row" spacing={0.5}>
                    <Tooltip title="上一週"><IconButton onClick={() => setAnchor((p) => p.subtract(1, "week"))}><ArrowBackIosNew fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="今天"><IconButton onClick={() => setAnchor(dayjs())}><TodayRounded fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="下一週"><IconButton onClick={() => setAnchor((p) => p.add(1, "week"))}><ArrowForwardIos fontSize="small" /></IconButton></Tooltip>
                </Stack>
            </Stack >

            {/* Grid */}
            < Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "72px repeat(7, 1fr)",
                    gridTemplateRows: `44px ${ALLDAY_H}px 1fr`,
                    height: 580,
                    borderRadius: 12,
                    overflow: "hidden",
                    // ✅ 外框可留、背景透明
                    border: `1px solid ${alpha(t.palette.divider, 0.6)}`,
                    bgcolor: "transparent",
                }}
            >
                {/* 左上角空白 */}
                < Box sx={{ gridColumn: "1 / span 1", gridRow: "1 / span 1", borderRight: `1px solid ${t.palette.divider}` }} />
                <Box sx={{ gridColumn: "1 / span 1", gridRow: "1 / span 1", borderRight: `1px solid ${alpha(t.palette.divider, 0.6)}` }} />
                <Box sx={{ gridColumn: "1 / span 1", gridRow: "2 / span 1", borderRight: `1px solid ${alpha(t.palette.divider, 0.6)}` }} />
                {/* Days header（顏色依主題切換） */}
                {
                    days.map((d, i) => (
                        <Box
                            key={`h-${d.format("YYYY-MM-DD")}`}
                            sx={{
                                gridColumn: `${i + 2} / span 1`,
                                gridRow: "1 / span 1",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: d.isSame(dayjs(), "day")
                                    ? alpha(t.palette.primary.main, 0.08)
                                    : (d.isoWeekday() >= 6 ? alpha(t.palette.warning.main, 0.05) : "transparent"),
                                borderLeft: i === 0 ? "none" : `1px solid ${alpha(t.palette.divider, 0.6)}`,
                                borderBottom: `1px solid ${t.palette.divider}`,
                            }}
                        >
                            <Typography variant="subtitle2" sx={headerText(d)}>
                                {d.format("ddd M/D")}
                            </Typography>
                        </Box>
                    ))
                }

                {/* 垂直分隔線 Overlay */}
                <VerticalGridLines />

                {/* 左側時間欄（數字對齊刻度線） */}
                <Box
                    sx={{
                        gridColumn: "1 / span 1",
                        gridRow: "3 / span 1",
                        borderRight: `1px solid ${alpha(t.palette.divider, 0.6)}`,
                        position: "relative",
                        p: 0.5,
                    }}
                >
                    {HOURS.map((h) => (
                        <Box
                            key={`tick-${h}`}
                            sx={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: pctTop(h * 60),
                                borderTop: `1px dashed ${alpha(t.palette.divider, 0.8)}`,
                                height: 0,
                            }}
                        />
                    ))}
                    {/* 標籤 */}
                    {HOURS.map((h) => (
                        <Box
                            key={`label-${h}`}
                            sx={{
                                position: "absolute",
                                right: 6,
                                top: pctTop(h * 60),
                                transform: "translateY(-50%)",
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{ color: muted, fontVariantNumeric: "tabular-nums" }}
                            >
                                {String(h).padStart(2, "0")}:00
                            </Typography>
                        </Box>
                    ))}
                    {/* 底端收尾線 */}
                    <Box
                        sx={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderTop: `1px dashed ${alpha(t.palette.divider, 0.8)}`,
                        }}
                    />
                </Box>

                {/* 內容區 */}
                {
                    days.map((d, cIdx) => {
                        const dayEvents = events.filter((e) => dayjs(e.start).isSame(d, "day"));
                        const allDayEvts = dayEvents.filter((e) => !!e.allDay);
                        const timedEvts = layoutTimedEvents(dayEvents.filter((e) => !e.allDay));
                        const isToday = d.isSame(dayjs(), "day");

                        return (
                            <React.Fragment key={`col-${d.format("YYYY-MM-DD")}`}>
                                {/* All-day 列 */}
                                <Box
                                    sx={{
                                        gridColumn: `${cIdx + 2} / span 1`,
                                        gridRow: "2 / span 1",
                                        px: 0.75,
                                        display: "flex",
                                        gap: 0.5,
                                        alignItems: "center",
                                        overflowX: "auto",
                                        bgcolor: isToday ? alpha(t.palette.primary.main, 0.04) : "transparent",
                                    }}
                                >
                                    {allDayEvts.map((e) => (
                                        <Tooltip
                                            key={e.id}
                                            title={<EventTooltip e={e} />}
                                            arrow
                                            placement="top"
                                            slotProps={{ tooltip: { sx: tooltipPaperSx(t) }, arrow: { sx: { color: alpha(t.palette.background.paper, 0.96) } } }}
                                        >
                                            <Box
                                                sx={{
                                                    px: 1, py: 0.25, borderRadius: 1,
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    textAlign: "center",
                                                    whiteSpace: "nowrap", fontSize: 12, fontWeight: 800, lineHeight: 1.2,
                                                    bgcolor: alpha(e.color || t.palette.primary.main, 0.18),
                                                    border: `1px solid ${alpha(e.color || t.palette.primary.main, 0.4)}`,
                                                    boxShadow: t.palette.mode === "dark" ? "0 1px 6px rgba(0,0,0,.25)" : "0 1px 4px rgba(0,0,0,.08)",
                                                    cursor: "default",
                                                    color: ink, // ✅ 依主題切換字色
                                                }}
                                            >
                                                {e.title}
                                            </Box>
                                        </Tooltip>
                                    ))}
                                </Box>

                                {/* 時間事件區 */}
                                <Box
                                    sx={{
                                        gridColumn: `${cIdx + 2} / span 1`,
                                        gridRow: "3 / span 1",
                                        position: "relative",
                                        overflow: "hidden",
                                    }}
                                >
                                    {/* 今日/週末底色（透明感） */}
                                    <Box
                                        sx={{
                                            position: "absolute", inset: 0,
                                            bgcolor: isToday
                                                ? alpha(t.palette.primary.main, 0.06)
                                                : (d.isoWeekday() >= 6 ? alpha(t.palette.warning.main, 0.035) : "transparent"),
                                            pointerEvents: "none",
                                        }}
                                    />

                                    {/* 小時水平線 */}
                                    {HOURS.map((h) => (
                                        <Box
                                            key={`line-${h}`}
                                            sx={{
                                                position: "absolute",
                                                left: 0, right: 0,
                                                top: pctTop(h * 60),
                                                borderTop: `1px dashed ${alpha(t.palette.divider, 0.5)}`,
                                            }}
                                        />
                                    ))}

                                    {/* 現在時間線 */}
                                    {isToday && showNow && (
                                        <Box sx={{ position: "absolute", left: 2, right: 2, top: nowTop, height: 0 }}>
                                            <Box sx={{ height: 2, bgcolor: t.palette.error.main, borderRadius: 2 }} />
                                            <Box sx={{ position: "absolute", left: -3, top: -3, width: 8, height: 8, borderRadius: "50%", bgcolor: t.palette.error.main }} />
                                        </Box>
                                    )}

                                    {/* 事件卡片 */}
                                    {timedEvts.map((e) => (
                                        <Tooltip
                                            key={e.id}
                                            title={<EventTooltip e={e} />}
                                            arrow
                                            placement="top"
                                            componentsProps={{
                                                tooltip: { sx: tooltipPaperSx(t) },
                                                arrow: { sx: { color: alpha(t.palette.background.paper, 0.96) } },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    left: e.__left,
                                                    width: e.__width,
                                                    top: e.__top,
                                                    height: e.__height,
                                                    minHeight: 20,
                                                    lineHeight: 1.1,
                                                    borderRadius: 1.25,
                                                    px: 0.75,
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    bgcolor: alpha(e.color || t.palette.primary.main, 0.16),
                                                    border: `1px solid ${alpha(e.color || t.palette.primary.main, 0.4)}`,
                                                    boxShadow: t.palette.mode === "dark" ? "0 2px 10px rgba(0,0,0,.25)" : "0 2px 8px rgba(0,0,0,.08)",
                                                    overflow: "hidden",
                                                    cursor: "default",
                                                    color: ink, // ✅ 依主題切換字色
                                                }}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    fontWeight={800}
                                                    sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "inherit" }}
                                                >
                                                    {e.title}
                                                </Typography>
                                            </Box>
                                        </Tooltip>
                                    ))}
                                </Box>
                            </React.Fragment>
                        );
                    })
                }
            </Box >
        </Paper >
    );
}
