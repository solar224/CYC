import React, { useContext, useMemo } from "react";
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
import {
    Container,
    Grid,
    Typography,
    Box,
    Stack,
    Button,
    Paper,
    Chip,
} from "@mui/material";

import { ThemeContext } from "../../App";

const rowCardSx = (t) => ({
    p: 1.75,
    borderRadius: 1.5,
    bgcolor: "transparent",
    color: t.palette.text.primary,
    border: `1px solid ${t.palette.divider}`,
    transition: "border-color .2s ease",
    "&:hover": {
        borderColor: t.palette.text.disabled,
    },
});

const iconWrapSx = (t) => ({
    mt: 0.25,
    color: t.palette.text.secondary,
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
    textTransform: "none",
    fontSize: 12,
    fontWeight: 500,
    px: 1,
    py: 0.25,
    minWidth: "auto",
    borderRadius: 0.75,
    borderColor: th.palette.divider,
    color: th.palette.text.secondary,
    bgcolor: "transparent",
    "&:hover": {
        bgcolor: th.palette.action.hover,
        borderColor: th.palette.divider,
    },
});

const codeBtnSx = (th) => ({
    ...skillBtnSx(th),
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: 11,
});

const SectionCard = ({ id, title, children }) => (
    <Box id={id} sx={{ mb: 1.5 }}>
        <Typography variant="subtitle1" fontWeight={600} color="text.primary" sx={{ mb: 1.5 }}>
            {title}
        </Typography>
        {children}
    </Box>
);

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
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                        <Typography variant="h5" fontWeight={700} color="text.primary">
                                            詹宇宸
                                        </Typography>
                                        <Tooltip title="下載履歷" placement="right">
                                            <Button
                                                variant="text"
                                                size="small"
                                                sx={{
                                                    minWidth: "auto",
                                                    textTransform: "none",
                                                    fontSize: 12,
                                                    color: (t) => t.palette.text.secondary,
                                                    "&:hover": { bgcolor: (t) => t.palette.action.hover },
                                                }}
                                            >
                                                CV
                                            </Button>
                                        </Tooltip>
                                    </Stack>


                                    <Typography variant="body2" sx={{ lineHeight: 1.7, color: "text.secondary", mb: 2 }}>
                                        陽明交通大學數據科學與工程研究所。持續學習，期待將所學貢獻於社會。
                                    </Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 500, color: "text.disabled", textTransform: "uppercase", letterSpacing: 0.5 }}>
                                        興趣領域
                                    </Typography>
                                    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.75, mt: 0.5 }}>
                                        {SKILL_TAGS.map((t, i) => (
                                            <Button key={`${t}-${i}`} variant="outlined" size="small" disableElevation sx={(th) => skillBtnSx(th)}>
                                                {t}
                                            </Button>
                                        ))}
                                    </Stack>
                                    <Typography variant="caption" sx={{ mt: 1.5, fontWeight: 500, color: "text.disabled", textTransform: "uppercase", letterSpacing: 0.5 }}>
                                        技術棧
                                    </Typography>
                                    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.75, mt: 0.5 }}>
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
                </Grid>
            </Container>
        </ThemeProvider>
    );

};

export { PhoneAboutMe };
