import React, { useContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import WorkHistoryRounded from "@mui/icons-material/WorkHistoryRounded";
import ScienceRounded from "@mui/icons-material/ScienceRounded";
import EmojiEventsRounded from "@mui/icons-material/EmojiEventsRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import PeopleAltRounded from "@mui/icons-material/PeopleAltRounded";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
    Container,
    Grid,
    Typography,
    Box,
    Stack,
    Button,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    Chip,
} from "@mui/material";

import { ThemeContext } from "../../App";
import {
    ComposedChart, Line, Area, ReferenceLine,
    XAxis, YAxis, CartesianGrid,
    Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
} from "recharts";

const rowCardSx = (t) => ({
    p: 2,
    borderRadius: 2,
    bgcolor: t.palette.mode === "dark" ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.02)",
    color: t.palette.text.primary,
    position: "relative",
    overflow: "hidden",
    border: `1px solid ${t.palette.divider}`,
    transition: "transform .15s ease, border-color .2s ease, background-color .2s ease",
    "&::before": {
        content: '""',
        position: "absolute",
        left: -2,
        top: 0,
        bottom: 0,
        width: 6,
        background: t.palette.primary.main,
        opacity: 0.25,
    },
    "&:hover": {
        borderColor: t.palette.text.secondary,
        transform: "translateY(-1px)",
    },
});

const iconWrapSx = (t) => ({
    mt: 0.25,
    p: 0.75,
    borderRadius: 1.5,
    bgcolor: t.palette.action.hover,
    color: t.palette.primary.main,
    display: "inline-flex",
});

const linkTitleSx = {
    textDecoration: "none",
    color: "inherit",         // 保持 inherit：會從 RowCard 拿到 text.primary
    display: "inline-flex",
    alignItems: "center",
    gap: 0.5,
};

const RowCard = ({ icon: Icon, primary, href, secondary, date, people, chips }) => (
    <Paper variant="outlined" sx={(t) => rowCardSx(t)}>
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <Box sx={(t) => iconWrapSx(t)}>
                <Icon fontSize="small" />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
                {/* 標題（可點連結） */}
                {href ? (
                    <Typography
                        variant="body1"
                        fontWeight={700}
                        component="a"
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        sx={linkTitleSx}
                    >
                        {primary}
                        <OpenInNewRounded sx={{ fontSize: 16 }} />
                    </Typography>
                ) : (
                    <Typography variant="body1" fontWeight={700}>
                        {primary}
                    </Typography>
                )}

                {secondary && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                        {secondary}
                    </Typography>
                )}

                {/* meta：日期 / 參與成員 */}
                {(date || people) && (
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1}
                        sx={{ mt: 0.75 }}
                        color="text.secondary"
                    >
                        {date && (
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <CalendarMonthRounded sx={{ fontSize: 16 }} />
                                <Typography variant="caption" color="text.secondary">{date}</Typography>
                            </Stack>
                        )}
                        {people && (
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <PeopleAltRounded sx={{ fontSize: 16 }} />
                                <Typography variant="caption" color="text.secondary">{people}</Typography>
                            </Stack>
                        )}
                    </Stack>
                )}

                {/* chips（例如獎項） */}
                {chips?.length ? (
                    <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mt: 0.75 }}>
                        {chips.map((c) => (
                            <Chip key={c} size="small" label={c} />
                        ))}
                    </Stack>
                ) : null}
            </Box>
        </Stack>
    </Paper>
);

const skillBtnSx = (th) => ({
    position: "relative",
    textTransform: "none",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 0.2,
    px: 1.25,
    py: 0.35,
    borderRadius: 1,                         // 方一點
    borderColor: th.palette.divider,
    color: th.palette.text.secondary,
    bgcolor: "transparent",
    transition:
        "transform .16s ease, border-color .2s ease, color .2s ease, background-color .2s ease",
    "&:hover": {
        bgcolor: th.palette.action.hover,
        borderColor: th.palette.text.secondary,
        color: th.palette.text.primary,
        transform: "translateY(-1px)",
    },
    // 底線滑入
    "&::after": {
        content: '""',
        position: "absolute",
        left: 8,
        right: 8,
        bottom: 4,
        height: 2,
        borderRadius: 1,
        background:
            th.palette.mode === "dark"
                ? "rgba(255,255,255,.45)"
                : "rgba(0,0,0,.45)",
        transform: "scaleX(0)",
        transformOrigin: "left",
        transition: "transform .25s ease",
    },
    "&:hover::after": { transform: "scaleX(1)" },
    "&:focus-visible": {
        outline: `2px solid ${th.palette.primary.main}`,
        outlineOffset: 2,
    },
});

const codeBtnSx = (th) => ({
    ...skillBtnSx(th),
    fontFamily:
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    pl: 1.75, // 給左側色條留空間
    // 左側色條
    "&::before": {
        content: '""',
        position: "absolute",
        left: 0,
        top: 6,
        bottom: 6,
        width: 3,
        borderRadius: 1.5,
        background: th.palette.divider,
        transition: "background .25s ease",
    },
    "&:hover::before": { background: th.palette.primary.main },
});

const SectionCard = ({ id, title, children }) => (
    <Box id={id} sx={{ p: 0, mb: 2 }}>
        <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
            {title}
        </Typography>
        {children}
    </Box>
);

const ChartTooltip = ({ active, payload, label, theme }) => {
    if (!active || !payload?.length) return null;

    const gpa = payload.find(p => p.dataKey === "GPA")?.value;
    const pr = payload.find(p => p.dataKey === "PR")?.value;
    const credits = payload?.[0]?.payload?.Credits;

    return (
        <Box sx={{
            p: 1.25,
            borderRadius: 1.5,
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[2],
            minWidth: 160,
        }}>
            <Typography variant="caption" color="text.secondary">{label}</Typography>
            <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: theme.palette.primary.main }} />
                    <Typography variant="body2">GPA：{gpa}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: theme.palette.secondary.main }} />
                    <Typography variant="body2">PR：{pr}</Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary">學分：{credits}</Typography>
            </Stack>
        </Box>
    );
};

const createData = (subject, credits, score) => ({ subject, credits, score });

const SKILL_TAGS = ["核心網路", "資料分析", "通訊設計", "電路設計"];
const WORK_SKILL = ["C", "C++", "Pyhton", "JavaScript", "go", "git"];

const EDUCATION_LIST = [
    { date: "2025/7 ~ present", school: "國立陽明交通大學 數據科學與工程研究所", link: "https://www.cs.nycu.edu.tw/" },
    { date: "2021/9 ~ 2025/6", school: "國立高雄科技大學 電腦與通訊工程系", link: "https://ccee.nkust.edu.tw/" },
    { date: "2019/9 ~ 2021/6", school: "國立彰師附工 控制科", link: "https://w3.sivs.chc.edu.tw/files/13-1000-15978.php" },
];

const EXPERIENCE_LIST = [
    { date: "2024/7 ~ 2024/8", title: "暑期教師", org: "福德國小" },
    { date: "2024/2 ~ 2024/6", title: "機率助教", org: "高雄科技大學" },
    { date: "2023/9 ~ 2024/1", title: "線性代數助教", org: "高雄科技大學" },
];

const PROJECT_LIST = [
    { date: "2023/7 ~ 2024/6", title: "運算思維差異化教學平臺", author: "金鴻翔、薛榆杰、曾敬淇、詹宇宸" },
    { date: "2024/2 ~ 2024/6", title: "禁忌搜索與模擬退火結合貪婪匹配最佳化方法", author: "詹宇宸" },
    { date: "2024/2 ~ 2024/6", title: "哈里斯鷹最佳化應用於手術時間預測", author: "薛榆杰、詹宇宸" },
    { date: "2023/9 ~ 2024/1", title: "超參數優化梯度提升樹解決手術時間預測問題", author: "詹宇宸" },
];

const AWARD_LIST = [
    { title: "第 29 屆全國大專校院資訊應用服務創新競賽", awards: ["AI 工具應用組第二名", "教育 AI 組佳作"], author: "金鴻翔、薛榆杰、曾敬淇、詹宇宸" },
    { title: "國立高雄科技大學電資學院院專題", awards: ["特優"], author: "金鴻翔、薛榆杰、曾敬淇、詹宇宸" },
    { title: "全國科技大專校院程式競賽", awards: ["銀獎", "銅獎"], author: "金鴻翔、詹宇宸" },
];

const PhoneAboutMe = () => {
    const { theme } = useContext(ThemeContext);
    const muiTheme = useMemo(
        () =>
            createTheme({
                palette: { mode: theme === "dark" ? "dark" : "light" },
            }),
        [theme]
    );
    const isPhone = useMediaQuery(muiTheme.breakpoints.down("sm"));
    // chart & table data
    const College_grades = [
        { semester: "大一上", GPA: 3.56, PR: 83.6, Credits: 27 },
        { semester: "大一下", GPA: 3.91, PR: 93.33, Credits: 22 },
        { semester: "大二上", GPA: 4.12, PR: 96.67, Credits: 26 },
        { semester: "大二下", GPA: 4.19, PR: 98.31, Credits: 23 },
        { semester: "大三上", GPA: 4.22, PR: 98.31, Credits: 21 },
        { semester: "大三下", GPA: 4.24, PR: 98.31, Credits: 15 },
        { semester: "大四上", GPA: 3.48, PR: 75.76, Credits: 10 },
        { semester: "大四下", GPA: 4.0, PR: 90, Credits: 8 },
    ];

    const College_grades_Group = {
        cs: [
            createData("演算法", 3, 99),
            createData("資料結構", 3, 88),
            createData("作業系統", 3, 97),
            createData("電腦網路", 3, 95),
            createData("計算機組織", 3, 98),
            createData("電腦圖學", 3, 100),
            // createData("數值方法", 3, 88),
        ],
        communications: [
            createData("積體電路", 3, 99),
            createData("通訊原理", 3, 99),
            createData("通訊工程", 3, 99),
            createData("富氏分析", 3, 98),
            createData("信號與系統", 3, 85),
            createData("生醫訊號處理", 3, 80),
        ],
        others: [
            createData("微積分(一)", 3, 87),
            createData("微積分(二)", 3, 92),
            createData("線性代數", 3, 99),
            createData("機率", 3, 99),
        ],
    };
    // === 研究所：圖表資料（先留空，之後有成績再填） ===
    // 範例：{ semester: "研一上", GPA: 4.10, PR: 96.5, Credits: 12 }
    const Grad_grades = [
        // 填你的研究所各學期資料
    ];

    // === 研究所：課程分組（先留空；給你 3 組：必修 / 選修 / 研究） ===
    // 範例：createData("機器學習", 3, 96)
    const Grad_grades_Group = {
        required: [
            // 研究所必修課程
        ],
        electives: [
            // 研究所選修課程
        ],
        research: [
            // 研究 / 專題 / 讀書會等
        ],
    };

    // 學制 → 類別標籤
    const PHASE_LABELS = {
        college: ["資工", "通訊", "其他"],
        grad: ["必修", "選修", "研究"],
    };
    const [phase, setPhase] = useState("college"); // "college" | "grad"
    const [tab, setTab] = useState(0);
    const chartData = phase === "college" ? College_grades : Grad_grades;
    const courseSets =
        phase === "college"
            ? [College_grades_Group.cs, College_grades_Group.communications, College_grades_Group.others]
            : [Grad_grades_Group.required, Grad_grades_Group.electives, Grad_grades_Group.research];

    const categoryLabels = PHASE_LABELS[phase] ?? [];

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline enableColorScheme />
            <Container sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", mt: 4 }}>
                <Grid container spacing={2} sx={{ my: 2 }}>
                    <Grid item xs={12}>
                        <Box sx={{ p: 0, mb: 3, bgcolor: "transparent" }}>
                            <Grid container spacing={3} alignItems={{ xs: "center", md: "flex-start" }}>
                                <Grid
                                    item
                                    xs={12}
                                    md={3}
                                    sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}
                                >
                                    <Box
                                        component="img"
                                        src={`${process.env.PUBLIC_URL}/YC-Chan_image.jpg`}
                                        alt="YC-Chan"
                                        sx={{
                                            width: { xs: 160, sm: 180, md: 200 },
                                            height: "auto",
                                            borderRadius: 2,
                                            display: "block",
                                            boxShadow: (t) => t.shadows[2],
                                            border: (t) => `1px solid ${t.palette.divider}`,
                                        }}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    md={9}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-start",
                                        textAlign: "left"
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="baseline"
                                        spacing={1.5}
                                        sx={{
                                            width: "100%",
                                            mb: 1.5,
                                            flexWrap: { xs: "wrap", sm: "nowrap" },
                                        }}
                                    >
                                        <Typography
                                            variant="h4"
                                            fontWeight={800}
                                            color="text.primary"
                                            sx={{
                                                letterSpacing: 0.2,
                                                flexGrow: 1,
                                                textAlign: "left"
                                            }}
                                        >
                                            關於我
                                        </Typography>
                                        <Tooltip title=".pdf" placement="left">
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                disableElevation
                                                sx={{
                                                    ml: "auto",
                                                    textTransform: "none",
                                                    fontWeight: 700,
                                                    letterSpacing: 0.3,
                                                    px: 1.5,
                                                    py: 0.5,
                                                    borderRadius: 1.25,
                                                    borderColor: (t) => t.palette.divider,
                                                    color: (t) => t.palette.text.primary,
                                                    bgcolor: "transparent",
                                                    transition: "all .18s ease",
                                                    "&:hover": {
                                                        bgcolor: (t) => t.palette.action.hover,
                                                        borderColor: (t) => t.palette.text.secondary,
                                                        boxShadow: (t) => t.shadows[1],
                                                    },
                                                }}
                                            >
                                                CV
                                            </Button>
                                        </Tooltip>
                                    </Stack>


                                    <Typography variant="body1" sx={{ lineHeight: 1.8, color: "text.primary" }}>
                                        我是詹宇宸，目前就讀於國立陽明交通大學數據科學與工程研究所。
                                        我相信持續學習與不斷挑戰是成長的關鍵，期許自己能在數據科學的道路上不斷精進，並期待能將所學貢獻於社會。
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ mt: 2, mb: 0.5, fontWeight: 700, color: "text.secondary" }}>
                                        發展方向
                                    </Typography>
                                    {/* 發展方向 */}
                                    <Stack direction="row" sx={{ flexWrap: "wrap", columnGap: 1, rowGap: { xs: 1.25, sm: 1.5 } }}>
                                        {SKILL_TAGS.map((t, i) => (
                                            <Button key={`${t}-${i}`} variant="outlined" size="small" disableElevation sx={(th) => skillBtnSx(th)}>
                                                {t}
                                            </Button>
                                        ))}
                                    </Stack>
                                    <Typography variant="subtitle2" sx={{ mt: 2, mb: 0.5, fontWeight: 700, color: "text.secondary" }}>
                                        核心技能
                                    </Typography>
                                    <Stack direction="row" sx={{ flexWrap: "wrap", columnGap: 1, rowGap: { xs: 1.25, sm: 1.5 } }}>
                                        {WORK_SKILL.map((t, i) => (
                                            <Button key={`${t}-${i}`} variant="outlined" size="small" disableElevation sx={(th) => codeBtnSx(th)}>
                                                {t}
                                            </Button>
                                        ))}
                                    </Stack>

                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>

                    {/* 教育學歷 */}
                    {/* 教育學歷 */}
                    <Grid item xs={12} md={6}>
                        <SectionCard id="教育學歷" title="教育學歷">
                            <Stack spacing={1.25}>
                                {EDUCATION_LIST.map((item) => (
                                    <RowCard
                                        key={item.school}
                                        icon={SchoolRounded}
                                        primary={item.school}
                                        href={item.link}
                                        date={item.date}
                                    />
                                ))}
                            </Stack>
                        </SectionCard>
                    </Grid>

                    {/* 學習經歷 */}
                    <Grid item xs={12} md={6}>
                        <SectionCard id="教學經歷" title="教學經歷">
                            <Stack spacing={1.25}>
                                {EXPERIENCE_LIST.map((item) => (
                                    <RowCard
                                        key={`${item.title}-${item.date}`}
                                        icon={WorkHistoryRounded}
                                        primary={`${item.title}（${item.org}）`}
                                        date={item.date}
                                    />
                                ))}
                            </Stack>
                        </SectionCard>
                    </Grid>

                    {/* 專案計畫 */}
                    <Grid item xs={12}>
                        <SectionCard id="專案計畫" title="專案計畫">
                            <Grid container spacing={1.25}>
                                {PROJECT_LIST.map((p) => (
                                    <Grid item xs={12} md={6} key={`${p.title}-${p.date}`}>
                                        <RowCard
                                            icon={ScienceRounded}
                                            primary={p.title}
                                            date={p.date}
                                            people={`參與成員：${p.author}`}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </SectionCard>
                    </Grid>

                    {/* 競賽榮譽 */}
                    <Grid item xs={12}>
                        <SectionCard id="競賽榮譽" title="競賽榮譽">
                            <Grid container spacing={1.25}>
                                {AWARD_LIST.map((item) => (
                                    <Grid item xs={12} md={6} key={item.title}>
                                        <RowCard
                                            icon={EmojiEventsRounded}
                                            primary={item.title}
                                            people={`參與成員：${item.author}`}
                                            chips={item.awards}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </SectionCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SectionCard id="學業表現" title="學業表現">
                            {/* 學制切換（大學 / 研究所） */}
                            <Tabs
                                value={phase}
                                onChange={(_, v) => {
                                    setPhase(v);
                                    setTab(0); // 切換學制時把分類重置到第 1 個
                                }}
                                textColor="primary"
                                indicatorColor="primary"
                                variant="scrollable"
                                allowScrollButtonsMobile
                                scrollButtons="auto"
                                sx={{
                                    mb: 1.5,
                                    "& .MuiTab-root": { px: 1.5, minWidth: "auto" },
                                    "& .MuiTabs-indicator": { height: 3, borderRadius: 1.5 },
                                }}
                            >
                                <Tab label="大學" value="college" />
                                <Tab label="研究所" value="grad" />
                            </Tabs>

                            <Grid container spacing={2}>
                                {/* 左：圖表卡片 */}
                                <Grid item xs={12} md={6}>
                                    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, bgcolor: "transparent" }}>
                                        {chartData.length ? (
                                            <ResponsiveContainer width="100%" height={isPhone ? 220 : 300}>
                                                <ComposedChart data={chartData} margin={{ top: 8, right: 8, left: isPhone ? -6 : 0, bottom: isPhone ? 8 : 0 }}>

                                                    <defs>
                                                        <linearGradient id="gpaGrad" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="0%" stopColor={muiTheme.palette.primary.main} stopOpacity={0.35} />
                                                            <stop offset="100%" stopColor={muiTheme.palette.primary.main} stopOpacity={0.03} />
                                                        </linearGradient>
                                                        <linearGradient id="prGrad" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="0%" stopColor={muiTheme.palette.secondary.main} stopOpacity={0.35} />
                                                            <stop offset="100%" stopColor={muiTheme.palette.secondary.main} stopOpacity={0.03} />
                                                        </linearGradient>
                                                    </defs>

                                                    <CartesianGrid strokeDasharray="3 3" stroke={muiTheme.palette.divider} />
                                                    <XAxis
                                                        dataKey="semester"
                                                        tick={{ fill: muiTheme.palette.text.secondary, fontSize: isPhone ? 11 : 12 }}
                                                        tickMargin={8}
                                                        interval={isPhone ? 1 : 0}         // 手機只顯示隔一個
                                                        angle={isPhone ? -30 : 0}
                                                        textAnchor={isPhone ? "end" : "middle"}
                                                    />
                                                    <YAxis
                                                        yAxisId="left"
                                                        domain={[0, 4.3]}
                                                        ticks={[0, 1, 2, 3, 4]}
                                                        tick={{ fill: muiTheme.palette.text.secondary, fontSize: isPhone ? 11 : 12 }}
                                                    />
                                                    <YAxis
                                                        yAxisId="right"
                                                        orientation="right"
                                                        domain={[0, 100]}
                                                        allowDecimals={false}
                                                        tick={{ fill: muiTheme.palette.text.secondary, fontSize: isPhone ? 11 : 12 }}
                                                        hide={isPhone}
                                                    />

                                                    <RechartsTooltip content={<ChartTooltip theme={muiTheme} />} />
                                                    <Legend
                                                        wrapperStyle={{ color: muiTheme.palette.text.primary, display: isPhone ? "none" : "block" }}
                                                        payload={[
                                                            { value: "GPA", type: "line", color: muiTheme.palette.primary.main, id: "legend-gpa" },
                                                            { value: "PR", type: "line", color: muiTheme.palette.secondary.main, id: "legend-pr" }
                                                        ]}
                                                    />
                                                    <ReferenceLine yAxisId="left" y={4.0} stroke={muiTheme.palette.success.main} strokeDasharray="4 4" />

                                                    {!isPhone && <Area yAxisId="left" type="monotone" dataKey="GPA" fill="url(#gpaGrad)" stroke="none" />}
                                                    {!isPhone && <Area yAxisId="right" type="monotone" dataKey="PR" fill="url(#prGrad)" stroke="none" />}
                                                    <Line
                                                        yAxisId="left"
                                                        type="monotone"
                                                        name="GPA"
                                                        dataKey="GPA"
                                                        stroke={muiTheme.palette.primary.main}
                                                        strokeWidth={isPhone ? 2 : 2.2}
                                                        dot={{ r: isPhone ? 2.5 : 3 }}
                                                        activeDot={{ r: isPhone ? 4 : 5 }}
                                                    />
                                                    <Line
                                                        yAxisId="right"
                                                        type="monotone"
                                                        name="PR"
                                                        dataKey="PR"
                                                        stroke={muiTheme.palette.secondary.main}
                                                        strokeWidth={isPhone ? 2 : 2.2}
                                                        dot={{ r: isPhone ? 2.5 : 3 }}
                                                        activeDot={{ r: isPhone ? 4 : 5 }}
                                                    />
                                                </ComposedChart>
                                            </ResponsiveContainer>
                                        ) : (
                                            // 空狀態（研究所若尚未有資料）
                                            <Stack alignItems="center" justifyContent="center" sx={{ height: 300, color: "text.secondary" }}>
                                                <Typography variant="body2">目前尚無{phase === "grad" ? "研究所" : "大學"}資料</Typography>
                                            </Stack>
                                        )}
                                    </Paper>
                                </Grid>

                                {/* 右：課程表（分類 Tabs + 小統計 + 斑馬紋表格） */}
                                <Grid item xs={12} md={6}>
                                    {/* 分類 Tabs（依學制變化） */}
                                    <Tabs
                                        value={tab}
                                        onChange={(_, v) => setTab(v)}
                                        textColor="primary"
                                        indicatorColor="primary"
                                        variant="scrollable"
                                        allowScrollButtonsMobile
                                        scrollButtons="auto"
                                        sx={{
                                            mb: 1,
                                            "& .MuiTab-root": { px: 1.5, minWidth: "auto" },
                                            "& .MuiTabs-indicator": { height: 3, borderRadius: 1.5 },
                                        }}
                                    >
                                        {categoryLabels.map((lbl, i) => (
                                            <Tab key={lbl} label={lbl} value={i} />
                                        ))}
                                    </Tabs>

                                    {/* 小統計 */}
                                    {(() => {
                                        const list = courseSets[tab] || [];
                                        const creditSum = list.reduce((s, r) => s + r.credits, 0);
                                        const avgScore = list.length ? (list.reduce((s, r) => s + r.score, 0) / list.length).toFixed(1) : 0;
                                        return (
                                            <Stack direction="row" spacing={1.5} sx={{ mb: 1 }} color="text.secondary">
                                                <Chip size="small" label={`平均：${avgScore || "-"} 分`} />
                                                <Chip size="small" label={`學分合計：${creditSum || 0}`} />
                                                <Chip size="small" label={`科目：${list.length}`} />
                                            </Stack>
                                        );
                                    })()}

                                    {/* 表格 */}
                                    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                                        <Table size="small" sx={{ "& td, & th": { border: 0 } }}>
                                            <TableHead>
                                                <TableRow sx={{ bgcolor: (t) => t.palette.action.hover }}>
                                                    <TableCell sx={{ fontWeight: 700, letterSpacing: 0.3 }}>課程名稱</TableCell>
                                                    <TableCell align="right" sx={{ fontWeight: 700, letterSpacing: 0.3 }}>學分</TableCell>
                                                    <TableCell align="right" sx={{ fontWeight: 700, letterSpacing: 0.3 }}>分數</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {(courseSets[tab] || []).length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={3} align="center" sx={{ color: "text.secondary" }}>
                                                            目前尚無{phase === "grad" ? "研究所" : "大學"}課程資料
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    courseSets[tab].map((row, idx) => (
                                                        <TableRow
                                                            key={`${row.subject}-${idx}`}
                                                            sx={{
                                                                "&:nth-of-type(odd)": { bgcolor: (t) => t.palette.action.hover },
                                                                transition: "background-color .2s ease",
                                                                "&:hover": { bgcolor: (t) => t.palette.action.selected },
                                                            }}
                                                        >
                                                            <TableCell>{row.subject}</TableCell>
                                                            <TableCell align="right">{row.credits}</TableCell>
                                                            <TableCell align="right">{row.score} 分</TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </SectionCard>
                    </Grid>

                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export { PhoneAboutMe };
