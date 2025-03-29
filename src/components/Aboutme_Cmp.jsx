import React, { useState, useEffect, useContext } from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { ButtonGroup } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import anime from "animejs/lib/anime.es.js";
import { Grid, Paper, Container, Tooltip, Card, CardContent, Stack, ListItemButton, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeContext, LanguageContext } from "../App";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useMediaQuery from "@mui/material/useMediaQuery";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    Legend,
    ResponsiveContainer,
    Brush,
    Radar,
    Bar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
} from "recharts";

// 引入圖片
import exploration from "../images/exploration.png";
import cpu from "../images/cpu.png";
import communication from "../images/communication.png";
import education from "../images/education.png";
import schoolbag from "../images/schoolbag.png";
import project from "../images/project.png";
import score from "../images/score.png";
import algorithms from "../images/algorithms.png";
import trophy from "../images/trophy.png";


// 動態
import Mimictypingeffects from "./effects/Mimictypingeffects";



const Section = ({ id, title, children }) => {
    useEffect(() => {
        // console.log("");
        // 使用 anime.js 動畫效果來改變寬度
        anime({
            targets: ".avatar-box",
            width: ["0px", "100px"], // 從 28px 過渡到 100%
            easing: "easeInOutQuad", // 緩動效果
            direction: "normal", // 正常動畫方向
            duration: 1500, // 動畫持續時間
        });
    }, []);
    return (
        <Container id={id} sx={{ my: 4 }}>
            <Box
                className="avatar-box" // 新增 class 來應用動畫
                sx={{
                    width: 0, // 初始寬度
                    height: 1, // 高度
                    border: "1px solid gray", // 邊框顏色與大小
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden", // 確保圖片不超出邊框
                    backgroundColor: "gray", // 圓框背景顏色（無圖片時）
                    mr: 1.5,
                }}
            />
            <Typography
                variant="h4"
                component="h2"
                sx={{ mb: 2, fontWeight: "bold" }}
            >
                {title}
            </Typography>
            {children}
        </Container>
    );
};

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function createData(subject, credits, score) {
    return { subject, credits, score };
}
// ---------------------------------------------------------------------------
const About = () => {
    const isMobile = useMediaQuery("(max-width: 965px)");
    const { theme } = useContext(ThemeContext);
    const { language } = useContext(LanguageContext); // 主題狀態
    const ThemeProviderTheme = createTheme({ palette: { mode: (theme === 'light' ? 'light' : 'dark') } });
    const College_Fractions = [
        {
            name: '資工',
            aa: 24,
            a: 6,
            as: 3,
        },
        {
            name: '通訊',
            aa: 27,
            a: 3,
            as: 6,
        },
        {
            name: '其他',
            aa: 9,
            a: 3,
            as: 18,
        },

    ];
    const College_grades = [
        { semester: "大一上", GPA: 3.56, PR: 83.60, Credits: 27 },
        { semester: "大一下", GPA: 3.91, PR: 93.33, Credits: 22 },
        { semester: "大二上", GPA: 4.12, PR: 96.67, Credits: 26 },
        { semester: "大二下", GPA: 4.19, PR: 98.31, Credits: 23 },
        { semester: "大三上", GPA: 4.22, PR: 98.31, Credits: 21 },
        { semester: "大三下", GPA: 4.24, PR: 98.31, Credits: 15 },
        { semester: "大四上", GPA: 3.48, PR: 45.76, Credits: 10 },
        { semester: "大四下", GPA: 0, PR: 0, Credits: 0 },
    ];
    const Master_degree = [
        { semester: "碩一上", GPA: 0, PR: 0 },
        { semester: "碩一下", GPA: 0, PR: 0 },
        { semester: "碩二上", GPA: 0, PR: 0 },
        { semester: "碩二下", GPA: 0, PR: 0 },

    ];
    const Skill_distribution = [
        { subject: '資料分析', score: 90, fullMark: 100 },
        { subject: '通訊設計', score: 60, fullMark: 100 },
        { subject: '程式撰寫', score: 87, fullMark: 100 },
        { subject: '電路設計', score: 20, fullMark: 100 },
        { subject: '修課學分', score: 95, fullMark: 100 },
        { subject: '成績平均', score: 99, fullMark: 100 },
    ];
    const College_grades_Group = {
        cs: [
            createData('演算法', 3, 99),
            createData('組合語言', 3, 100),
            createData('離散數學', 3, 98),
            createData('資料結構', 3, 88),
            createData('作業系統', 3, 97),
            createData('電腦網路', 3, 95),
            createData('演化式計算', 3, 99),
            createData('計算機組織', 3, 98),
            createData('巨量資料分析', 3, 95),
            createData('視窗程式設計', 3, 93),
            createData('電腦圖學', 3, 93),


        ],
        communications: [
            createData('電路學', 3, 88),
            createData('通訊原理', 3, 99),
            createData('通訊工程', 3, 99),
            createData('電子電路', 3, 99),
            createData('數位電路', 3, 99),
            createData('數位電子電路', 3, 99),
            createData('富氏分析', 3, 98),
            createData('微處理器', 3, 99),
            createData('積體電路', 3, 99),
            createData('數位設計', 3, 99),
            createData('信號與系統', 3, 85),
            createData('生醫訊號處理', 3, 93),


        ],
        others: [
            createData('物理(一)', 3, 74),
            createData('物理(二)', 3, 86),
            createData('微積分(一)', 3, 87),
            createData('微積分(二)', 3, 92),
            createData('微分方程', 3, 97),
            createData('程式設計(一)', 3, 81),
            createData('程式設計(二)', 3, 87),
            createData('機率', 3, 99),
            createData('線性代數', 3, 99),
            createData('數值方法', 3, 88),

        ],
    };
    const Master_Degree_Group = {
        cs: [
            createData('Data Structures', 90, 3),
            createData('Algorithms', 85, 3),
        ],
        communications: [
            createData('Wireless Networks', 88, 3),
            createData('Signal Processing', 82, 3),
        ],
        others: [
            createData('Mathematics', 95, 3),
            createData('Physics', 89, 2),
        ],
    };
    const awardList = [
        { title: "第 29 屆全國大專校院資訊應用服務創新競賽", Awards: "教育 AI 組佳作、AI 工具應用組第二名", author: "金鴻翔、薛榆杰、曾敬淇、詹宇宸" },
        { title: "國立高雄科技大學電資學院院專題", Awards: "特優", author: "金鴻翔、薛榆杰、曾敬淇、詹宇宸" },
        { title: "第九屆全國科技大專校院程式競賽", Awards: "銅獎", author: "金鴻翔、詹宇宸" },
        { title: "國立高雄科技大學電腦與通訊工程系專題", Awards: "第二名", author: "金鴻翔、薛榆杰、曾敬淇、詹宇宸" },
        { title: "國立高雄科技大學校園創意發想競賽", Awards: "優等", author: "金鴻翔、薛榆杰、詹宇宸" },
        { title: "2024 教育大數據分析競賽", Awards: "入圍決賽", author: "金鴻翔、薛榆杰、曾敬淇、詹宇宸" },
        { title: "第 48 屆國際大學生程式設計競賽亞洲區桃園站", Awards: "", author: "薛榆杰、詹宇宸、徐國章" },
        { title: "第八屆全國科技大專校院程式競賽", Awards: "銀獎", author: "林垣志、詹宇宸" },
    ];
    const [activeSection, setActiveSection] = useState("關於我");
    const [showUndergrad, setShowUndergrad] = useState(true); // 控制顯示狀態 (true=大學, false=研究所)
    const [value, setValue] = useState(0);
    const [awardShowAll, setAwardShowAll] = useState(false);
    const visibleItems = awardShowAll ? awardList : awardList.slice(0, 3);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // Table 調色
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.common.black : '#BBBBBB',  // 深色模式為黑色，淺色模式為灰色
            color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black, // 深色模式為白色，淺色模式為黑色
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black, // 文字顏色根據模式調整
        },
    }));
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const handleScrollTo = (section) => {
        setActiveSection(section);
        const element = document.getElementById(section);
        const headerOffset = 70; // 固定的 header 高度（單位：像素）
        const elementPosition = element.getBoundingClientRect().top; // 元素相對於視窗的距離
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    };
    const GradesTable = ({ data }) => (
        <TableContainer component={Paper} sx={{ backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.6)", boxShadow: "none" }} elevation={0}>
            <Table size="small" aria-label="grades table">
                <TableHead sx={{ backgroundColor: "rgba(0,0,0,0.2)", boxShadow: "none" }}>
                    <TableRow sx={{ backgroundColor: "rgba(0,0,0,0)" }}>
                        <StyledTableCell sx={{ backgroundColor: "rgba(0,0,0,0) !important" }}>
                            課程名稱
                        </StyledTableCell>
                        <StyledTableCell sx={{ backgroundColor: "rgba(0,0,0,0) !important" }} align="right">
                            學分
                        </StyledTableCell>
                        <StyledTableCell sx={{ backgroundColor: "rgba(0,0,0,0) !important" }} align="right">
                            分數
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <StyledTableRow key={`${row.subject}-${index}`}>
                            <TableCell component="th" scope="row">
                                {row.subject}
                            </TableCell>
                            <TableCell align="right">{row.credits}</TableCell>
                            <TableCell align="right">{row.score} 分</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            {/* 個人介紹 */}
            <ThemeProvider theme={ThemeProviderTheme}>
                <Grid container spacing={2} sx={{ my: 4 }}>
                    <Grid item xs={12} sm={12} md={12} sx={{ display: "flex", justifyContent: "center" }}>
                        <Paper
                            id="關於我"
                            elevation={theme === "light" ? 3 : 12}
                            sx={{
                                padding: 3,
                                borderRadius: 4,
                                marginBottom: 2,
                                backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.92)" : "rgba(18, 18, 18, 0.92)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    boxShadow: 6,
                                    transform: "translateY(-2px)",
                                },
                            }}
                            onMouseEnter={() => setActiveSection("關於我")}
                        >
                            <Grid container spacing={2} alignItems="center">
                                {/* Avatar */}
                                <Grid item xs={12} md={4} display="flex" justifyContent="center">
                                    <Tooltip title={language === "zh" ? "AI 生圖" : "AI Generating Graphs"} placement="bottom">
                                        <Box
                                            component="img"
                                            src={`${process.env.PUBLIC_URL}/YC-Chan_image.jpg`}
                                            alt="詹宇宸"
                                            sx={{
                                                maxWidth: 200,
                                                width: "100%",
                                                borderRadius: 3,
                                                boxShadow: 3,
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    transform: "scale(1.05)",
                                                    boxShadow: 6,
                                                },
                                            }}
                                        />
                                    </Tooltip>
                                </Grid>

                                {/* About Text */}
                                <Grid item xs={12} md={8}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Typography variant="h4" fontWeight="bold">
                                            關於我
                                        </Typography>
                                        <Tooltip title={language === "zh" ? "履歷表" : "Curriculum Vitae"} placement="left">
                                            <Button variant="outlined" size="small">
                                                CV
                                            </Button>
                                        </Tooltip>
                                    </Box>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            lineHeight: 1.8,
                                            mb: 2,
                                        }}
                                    >
                                        我是詹宇宸，大學就讀國立高雄科技大學 (NKUST) 電腦與通訊工程系 (CCE)。
                                        在學期間積極參與競賽並多次獲獎，並對電子通訊技術與程式設計充滿熱情。
                                        我的研究興趣包含：
                                        <Mimictypingeffects
                                            textList={["資料分析", "程式撰寫", "通訊設計", "電路設計"]}
                                            speed={80}
                                            variant="body"
                                            repeat={1}
                                        />
                                    </Typography>

                                    {/* Skills Icons */}
                                    <Grid container spacing={2}>
                                        {[
                                            { icon: exploration, label: "資料分析" },
                                            { icon: algorithms, label: "程式撰寫" },
                                            { icon: communication, label: "通訊設計" },
                                            { icon: cpu, label: "電路設計" },
                                        ].map((item, index) => (
                                            <Grid item xs={3} key={index} display="flex" flexDirection="column" alignItems="center">
                                                <Box
                                                    component="img"
                                                    src={item.icon}
                                                    alt={item.label}
                                                    sx={{
                                                        width: 60,
                                                        height: 60,
                                                        transition: "all 0.3s",
                                                        "&:hover": {
                                                            transform: "scale(1.1)",
                                                        },
                                                    }}
                                                />
                                                <Typography variant="body2" sx={{ mt: 1, textAlign: "center", fontWeight: "bold" }}>
                                                    {item.label}
                                                </Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>

                    </ Grid>

                    {/* 下方資訊 */}
                    <Grid item xs={12} sm={12} md={12} sx={{ display: "flex", justifyContent: "center" }}>

                        <Grid container spacing={{ xs: 1, sm: 2 }}>
                            {/* 左側內容 */}
                            {!isMobile && (
                                <Grid item xs={12} md={2.5}>
                                    <Accordion
                                        defaultExpanded
                                        elevation={theme === "light" ? 1 : 12}
                                        sx={{
                                            position: "sticky",
                                            top: 70,
                                            borderRadius: 4,
                                            backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.85)" : "rgba(20, 20, 20, 0.5)",
                                            backdropFilter: "blur(6px)",
                                            overflow: "hidden",
                                            boxShadow: theme === "light" ? 2 : 8,
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                boxShadow: 6,
                                                transform: "translateY(-2px)",
                                            },
                                        }}
                                    >
                                        {/* Header */}
                                        <AccordionSummary
                                            expandIcon={<ArrowDropDownIcon />}
                                            aria-controls="panel2-content"
                                            id="panel2-header"
                                            sx={{
                                                backgroundColor: theme === "light" ? "rgba(240,240,240,0.9)" : "rgba(40,40,40,0.9)",
                                                "&:hover": {
                                                    backgroundColor: theme === "light" ? "rgba(230,230,230,1)" : "rgba(50,50,50,1)",
                                                },
                                                borderTopLeftRadius: 4,
                                                borderTopRightRadius: 4,
                                            }}
                                        >
                                            <Typography variant="h6" fontWeight="bold">
                                                📂 目錄
                                            </Typography>
                                        </AccordionSummary>

                                        {/* List */}
                                        <AccordionDetails
                                            sx={{
                                                padding: 0,
                                                borderBottomLeftRadius: 4,
                                                borderBottomRightRadius: 4,
                                            }}
                                        >
                                            <List disablePadding>
                                                {[
                                                    "關於我",
                                                    "教育學歷",
                                                    "學習經歷",
                                                    "專案計畫",
                                                    "競賽榮譽",
                                                    "學業表現",
                                                ].map((section) => (
                                                    <ListItemButton
                                                        key={section}
                                                        selected={activeSection === section}
                                                        onClick={() => handleScrollTo(section)}
                                                        sx={{
                                                            px: 2,
                                                            py: 1,
                                                            mx: 1,
                                                            my: 0.5,
                                                            borderRadius: 2,
                                                            transition: "all 0.3s",
                                                            color: theme === "light" ? "#333" : "#fff",
                                                            "&.Mui-selected": {
                                                                backgroundColor: theme === "light" ? "#333" : "#fff",
                                                                color: theme === "light" ? "#fff" : "#333",
                                                                "&:hover": {
                                                                    backgroundColor: theme === "light" ? "#555" : "#e0e0e0",
                                                                },
                                                            },
                                                            "&:hover": {
                                                                backgroundColor: theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
                                                            },
                                                        }}
                                                    >
                                                        <Typography variant="body1">{section}</Typography>
                                                    </ListItemButton>
                                                ))}
                                            </List>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            )}
                            {/* 右側內容 */}
                            <Grid item xs={12} md={isMobile ? 12 : 9.5}>
                                <Paper
                                    elevation={theme === "light" ? 1 : 12}
                                    sx={{
                                        padding: 3,
                                        borderRadius: 4,
                                        marginBottom: 2,
                                        backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.92)" : "rgba(18, 18, 18, 0.92)",
                                        transition: "all 0.3s",
                                        "&:hover": {
                                            boxShadow: 6,
                                        },
                                    }}
                                    id="教育學歷"
                                    onMouseEnter={() => setActiveSection("教育學歷")}
                                >
                                    {/* 標題 */}
                                    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                        <Box component="img" src={education} alt="education" sx={{ width: 24 }} />
                                        <Typography variant="h5" fontWeight="bold">
                                            教育學歷
                                        </Typography>
                                    </Stack>

                                    {/* 學歷內容 */}
                                    <Stack spacing={1.5}>
                                        {[
                                            // { date: "2025 ~ 2027", school: "國立陽明交通大學 數據科學與工程研究所", link: "https://www.cs.nycu.edu.tw/intro/organization/cybersecurity" },
                                            { date: "2021/9 ~ 2025/6", school: "國立高雄科技大學 電腦與通訊工程系", link: "https://ccee.nkust.edu.tw/" },
                                            { date: "2019/9 ~ 2021/6", school: "國立彰師附工 控制科", link: "https://w3.sivs.chc.edu.tw/files/13-1000-15978.php" },
                                        ].map((item, index) => (
                                            <Box
                                                key={`edu-${index}`}
                                                sx={{
                                                    padding: 2,
                                                    borderRadius: 3,
                                                    backgroundColor: theme === "light" ? "rgba(240,240,240,0.7)" : "rgba(30,30,30,0.85)",
                                                    transition: "all 0.3s",
                                                    "&:hover": {
                                                        boxShadow: 4,
                                                        transform: "translateY(-3px)",
                                                    },
                                                }}
                                            >
                                                <Typography variant="body2" color="text.secondary" mb={0.5}>
                                                    📅 {item.date}
                                                </Typography>
                                                <Tooltip title={language === "zh" ? "進入官網" : "Go to official site"} placement="right">
                                                    <Typography
                                                        variant="body1"
                                                        fontWeight="bold"
                                                        component="a"
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        sx={{
                                                            textDecoration: "none",
                                                            color: theme === "light" ? "#333" : "#fff",
                                                            transition: "color 0.3s",
                                                            "&:hover": {
                                                                color: "#f39212",
                                                            },
                                                        }}
                                                    >
                                                        🎓 {item.school}
                                                    </Typography>
                                                </Tooltip>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Paper>



                                <Paper
                                    elevation={theme === "light" ? 1 : 12}
                                    sx={{
                                        padding: 3,
                                        borderRadius: 4,
                                        marginBottom: 2,
                                        backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.92)" : "rgba(18, 18, 18, 0.92)",
                                        transition: "all 0.3s",
                                        "&:hover": {
                                            boxShadow: 6,
                                        },
                                    }}
                                    id="學習經歷"
                                    onMouseEnter={() => setActiveSection("學習經歷")}
                                >
                                    {/* 標題 */}
                                    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                        <Box component="img" src={schoolbag} alt="schoolbag" sx={{ width: 24 }} />
                                        <Typography variant="h5" fontWeight="bold">
                                            學習經歷
                                        </Typography>
                                    </Stack>

                                    {/* 經歷內容 */}
                                    <Stack spacing={1.5}>
                                        {[
                                            { date: "2024/7 ~ 2024/8", title: "暑期教師", titleen: "Summer Teacher", level: "小學", levelen: "elementary school" },
                                            { date: "2024/2 ~ 2024/6", title: "機率助教", titleen: "Chance Teaching Assistant", level: "大學", levelen: "university" },
                                            { date: "2023/9 ~ 2024/1", title: "線性代數助教", titleen: "Teaching assistant in linear algebra", level: "大學", levelen: "university" },
                                        ].map((item, id) => (
                                            <Box
                                                key={`teach-${id}`}
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: 0.5,
                                                    padding: 2,
                                                    borderRadius: 3,
                                                    backgroundColor: theme === "light" ? "rgba(240,240,240,0.7)" : "rgba(30,30,30,0.85)",
                                                    transition: "all 0.3s",
                                                    "&:hover": {
                                                        boxShadow: 4,
                                                        transform: "translateY(-3px)",
                                                    },
                                                }}
                                            >
                                                <Typography variant="body2" color="text.secondary">
                                                    📅 {item.date}
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold">
                                                    🎯 {(language === "zh") ? item.title : item.titleen}
                                                    ({(language === "zh") ? item.level : item.levelen})
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Paper>



                                <Paper
                                    elevation={theme === "light" ? 1 : 12}
                                    sx={{
                                        padding: 3,
                                        borderRadius: 4,
                                        marginBottom: 2,
                                        backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.92)" : "rgba(18, 18, 18, 0.92)",
                                        transition: "all 0.3s",
                                        "&:hover": {
                                            boxShadow: 6,
                                        },
                                    }}
                                    id="專案計畫"
                                    onMouseEnter={() => setActiveSection("專案計畫")}
                                >
                                    {/* 標題 */}
                                    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                        <Box component="img" src={project} alt="project" sx={{ width: 24 }} />
                                        <Typography variant="h5" fontWeight="bold">
                                            專案計畫
                                        </Typography>
                                    </Stack>

                                    {/* 專案內容 */}
                                    <Stack spacing={2}>
                                        {[
                                            { date: "2023/7 ~ 2024/6", title: "運算思維差異化教學平臺", author: "金鴻翔、薛榆杰、曾敬淇、詹宇宸" },
                                            { date: "2024/2 ~ 2024/6", title: "禁忌搜索與模擬退火結合貪婪匹配最佳化方法", author: "詹宇宸" },
                                            { date: "2024/2 ~ 2024/6", title: "考量樂觀偏差現象的哈里斯鷹最佳化方法應用於手術時間預測", author: "薛榆杰、詹宇宸" },
                                            { date: "2023/9 ~ 2024/1", title: "超參數優化梯度提升樹解決手術時間預測問題", author: "詹宇宸" },
                                        ].map((item, index) => (
                                            <Box
                                                key={`project-${index}`}
                                                sx={{
                                                    padding: 2,
                                                    borderRadius: 3,
                                                    backgroundColor: theme === "light" ? "rgba(245,245,245,0.8)" : "rgba(30,30,30,0.85)",
                                                    boxShadow: 2,
                                                    transition: "all 0.3s",
                                                    "&:hover": {
                                                        boxShadow: 6,
                                                        transform: "translateY(-3px)",
                                                    },
                                                }}
                                            >
                                                <Typography variant="body2" color="text.secondary" mb={0.5}>
                                                    📅 {item.date}
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    fontWeight="bold"
                                                    gutterBottom
                                                    sx={{ lineHeight: 1.6 }}
                                                >
                                                    📌 {item.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    👥 參與成員：{item.author}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Paper>


                                <Paper
                                    elevation={theme === "light" ? 1 : 12}
                                    sx={{
                                        padding: 3,
                                        borderRadius: 4,
                                        marginBottom: 2,
                                        backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.92)" : "rgba(18, 18, 18, 0.92)",
                                        transition: "all 0.3s",
                                        "&:hover": {
                                            boxShadow: 6,
                                        },
                                    }}
                                    id="競賽榮譽"
                                    onMouseEnter={() => setActiveSection("競賽榮譽")}
                                >
                                    {/* 標題 */}
                                    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                        <Box component="img" src={trophy} alt="trophy" sx={{ width: 28 }} />
                                        <Typography variant="h5" fontWeight="bold">
                                            競賽榮譽
                                        </Typography>
                                    </Stack>

                                    {/* 卡片 */}
                                    <Grid container spacing={2}>
                                        {visibleItems.map((item, index) => (
                                            <Grid item xs={12} sm={6} md={4} key={`trophy-${index}`} display="flex">
                                                <Card
                                                    sx={{
                                                        width: "100%",
                                                        minHeight: 220,
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "space-between",
                                                        borderRadius: 3,
                                                        boxShadow: 3,
                                                        background: theme === "light"
                                                            ? "linear-gradient(135deg, #ffffff, #f7f7f7)"
                                                            : "linear-gradient(135deg, #1f1f1f, #2b2b2b)",
                                                        transition: "all 0.3s",
                                                        "&:hover": {
                                                            transform: "translateY(-4px)",
                                                            boxShadow: 8,
                                                        },
                                                    }}
                                                >
                                                    <CardContent
                                                        sx={{
                                                            flexGrow: 1,
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            justifyContent: "space-between",
                                                        }}
                                                    >
                                                        <Box>
                                                            <Typography
                                                                variant="subtitle1"
                                                                fontWeight="bold"
                                                                gutterBottom
                                                                sx={{
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    display: "-webkit-box",
                                                                    WebkitLineClamp: 2,
                                                                    WebkitBoxOrient: "vertical",
                                                                }}
                                                            >
                                                                🏆 {item.title}
                                                            </Typography>
                                                            {item.Awards && (
                                                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                                                    獲獎：{item.Awards}
                                                                </Typography>
                                                            )}
                                                        </Box>

                                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                            參與成員：{item.author}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>

                                    {/* 更多按鈕 */}
                                    <Box display="flex" justifyContent="flex-end" mt={2}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => setAwardShowAll(!awardShowAll)}
                                            endIcon={awardShowAll ? "▲" : "▼"}
                                            sx={{
                                                borderRadius: 2,
                                                textTransform: "none",
                                                paddingX: 2,
                                                paddingY: 0.8,
                                            }}
                                        >
                                            {awardShowAll ? "收合" : "查看更多"}
                                        </Button>
                                    </Box>
                                </Paper>


                                <Paper
                                    elevation={theme === "light" ? 1 : 12}
                                    sx={{
                                        padding: 3,
                                        borderRadius: 4,
                                        marginBottom: 2,
                                        backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.92)" : "rgba(18, 18, 18, 0.92)",
                                        transition: "all 0.3s",
                                        "&:hover": {
                                            boxShadow: 6,
                                        },
                                    }}
                                    id="學業表現"
                                    onMouseEnter={() => setActiveSection("學業表現")}
                                >
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item xs={12} md={6} display="flex" alignItems="center">
                                            <Box
                                                component="img"
                                                src={score}
                                                alt="score"
                                                sx={{ width: 24, mr: 1 }}
                                            />
                                            <Typography variant="h5" fontWeight="bold">
                                                學業表現
                                            </Typography>
                                        </Grid>

                                        {/* 切換按鈕 */}
                                        <Grid item xs={12} md={6} display="flex" justifyContent="flex-end">
                                            <ButtonGroup variant="outlined" size="small">
                                                <Button
                                                    variant={showUndergrad ? "contained" : "outlined"}
                                                    onClick={() => setShowUndergrad(true)}
                                                >
                                                    大學
                                                </Button>
                                                <Button
                                                    variant={!showUndergrad ? "contained" : "outlined"}
                                                    onClick={() => setShowUndergrad(false)}
                                                >
                                                    研究所
                                                </Button>
                                            </ButtonGroup>
                                        </Grid>
                                    </Grid>

                                    <Divider sx={{ my: 2 }} />

                                    <Grid container spacing={2}>
                                        {/* 大學資料 */}
                                        {showUndergrad && (
                                            <>
                                                {/* GPA Chart */}
                                                <Grid item xs={12} md={12}>
                                                    <ResponsiveContainer width="100%" height={250}>
                                                        <ComposedChart data={College_grades} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                                                            <CartesianGrid strokeDasharray="1 1" stroke="#ddd" />
                                                            <XAxis dataKey="semester" tick={{ fill: theme === "dark" ? "#fff" : "#333" }} />
                                                            <YAxis
                                                                yAxisId="left"
                                                                orientation="left"
                                                                domain={[0, 4.3]}
                                                                label={{ value: "GPA", angle: -90, position: "insideLeft" }}
                                                            />
                                                            <YAxis
                                                                yAxisId="right"
                                                                orientation="right"
                                                                domain={[0, 100]}
                                                                label={{ value: "班級 PR", angle: -90, position: "insideRight" }}
                                                            />
                                                            <RechartsTooltip
                                                                contentStyle={{
                                                                    backgroundColor: theme === "dark" ? "#333" : "#fff",
                                                                    color: theme === "dark" ? "#fff" : "#333",
                                                                    border: "1px solid",
                                                                    borderColor: theme === "dark" ? "#444" : "#ccc",
                                                                }}
                                                            />
                                                            <Legend />
                                                            <Bar yAxisId="right" dataKey="Credits" fill="#ff7300" barSize={2.5} name="學分" />
                                                            <Line yAxisId="left" type="monotone" name="GPA" dataKey="GPA" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                                                            <Line yAxisId="right" type="monotone" name="PR" dataKey="PR" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 8 }} />
                                                            <Brush dataKey="semester" height={10} stroke="#8884d8" />
                                                        </ComposedChart>
                                                    </ResponsiveContainer>
                                                </Grid>

                                                {/* 學科表 & 雷達圖 */}
                                                <Grid item xs={12} md={6}>
                                                    <Box sx={{ width: "100%" }}>
                                                        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 1 }}>
                                                            <Tabs value={value} onChange={handleChange}>
                                                                <Tab label="資工" {...a11yProps(0)} />
                                                                <Tab label="通訊" {...a11yProps(1)} />
                                                                <Tab label="其他" {...a11yProps(2)} />
                                                            </Tabs>
                                                        </Box>

                                                        <CustomTabPanel value={value} index={0}>
                                                            <GradesTable data={College_grades_Group["cs"]} />
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={value} index={1}>
                                                            <GradesTable data={College_grades_Group["communications"]} />
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={value} index={2}>
                                                            <GradesTable data={College_grades_Group["others"]} />
                                                        </CustomTabPanel>
                                                    </Box>
                                                </Grid>

                                                <Grid item xs={12} md={6}>
                                                    <ResponsiveContainer width="100%" height={300}>
                                                        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={Skill_distribution}>
                                                            <PolarGrid />
                                                            <PolarAngleAxis dataKey="subject" stroke={theme === "dark" ? "#fff" : "#333"} tick={{ dy: 5 }} />
                                                            <PolarRadiusAxis stroke={theme === "dark" ? "#fff" : "#333"} />
                                                            <Radar name="技能評估" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.4} />
                                                        </RadarChart>
                                                    </ResponsiveContainer>

                                                    <ResponsiveContainer width="100%" height={200}>
                                                        <ComposedChart data={College_Fractions} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                            <CartesianGrid strokeDasharray="1 1" stroke="#ddd" />
                                                            <YAxis />
                                                            <XAxis dataKey="name" tick={{ fill: theme === "dark" ? "#fff" : "#333" }} />
                                                            <RechartsTooltip
                                                                contentStyle={{
                                                                    backgroundColor: theme === "dark" ? "#333" : "#fff",
                                                                    color: theme === "dark" ? "#fff" : "#333",
                                                                    border: "1px solid",
                                                                    borderColor: theme === "dark" ? "#444" : "#ccc",
                                                                }}
                                                            />
                                                            <Legend />
                                                            <Bar dataKey="aa" fill="#8884d8" barSize={20} name="A+" />
                                                            <Bar dataKey="a" fill="#82ca9d" barSize={20} name="A" />
                                                            <Bar dataKey="as" fill="#ff7300" barSize={20} name="A-" />
                                                        </ComposedChart>
                                                    </ResponsiveContainer>
                                                </Grid>
                                            </>
                                        )}

                                        {/* 研究所資料 */}
                                        {!showUndergrad && (
                                            <Grid item xs={12}>
                                                <ResponsiveContainer width="100%" height={250}>
                                                    <ComposedChart data={College_grades} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                                                        <CartesianGrid strokeDasharray="1 1" stroke="#ddd" />
                                                        <XAxis dataKey="semester" tick={{ fill: theme === "dark" ? "#fff" : "#333" }} />
                                                        <YAxis yAxisId="left" orientation="left" domain={[0, 4.3]} label={{ value: "GPA", angle: -90, position: "insideLeft" }} />
                                                        <YAxis yAxisId="right" orientation="right" domain={[0, 100]} label={{ value: "班級 PR", angle: -90, position: "insideRight" }} />
                                                        <RechartsTooltip
                                                            contentStyle={{
                                                                backgroundColor: theme === "dark" ? "#333" : "#fff",
                                                                color: theme === "dark" ? "#fff" : "#333",
                                                                border: "1px solid",
                                                                borderColor: theme === "dark" ? "#444" : "#ccc",
                                                            }}
                                                        />
                                                        <Legend />
                                                        <Bar yAxisId="right" dataKey="Credits" fill="#ff7300" barSize={2.5} name="學分" />
                                                        <Line yAxisId="left" type="monotone" name="GPA" dataKey="GPA" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                                                        <Line yAxisId="right" type="monotone" name="PR" dataKey="PR" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 8 }} />
                                                        <Brush dataKey="semester" height={10} stroke="#8884d8" />
                                                    </ComposedChart>
                                                </ResponsiveContainer>
                                            </Grid>
                                        )}
                                    </Grid>
                                </Paper>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </ThemeProvider>

        </Container >
    );
};

const Projects = () => (
    <Section id="projects" title="Projects">
        <List>
            <ListItem>
                <ListItemText
                    primary="Project 1"
                    secondary={
                        <>
                            Description of your project.{" "}
                            <a href="#" style={{ textDecoration: "none", color: "#0366d6" }}>
                                Learn more
                            </a>
                        </>
                    }
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="Project 2"
                    secondary={
                        <>
                            Description of your project.{" "}
                            <a href="#" style={{ textDecoration: "none", color: "#0366d6" }}>
                                Learn more
                            </a>
                        </>
                    }
                />
            </ListItem>
        </List>
    </Section>
);

const Contact = () => (
    <Section id="contact" title="Contact Me">
        <Typography variant="body1">
            Feel free to reach out via email at{" "}
            <a href="mailto:your-email@example.com" style={{ color: "#0366d6" }}>
                C110110157@nkust.edu.tw
            </a>
        </Typography>
    </Section>
);


export { About, Projects, Contact };
