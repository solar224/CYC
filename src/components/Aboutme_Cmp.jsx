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
import { Grid, Paper, Container, Tooltip } from "@mui/material";
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

// 動態
import Mimictypingeffects from "./effects/Mimictypingeffects"



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
    const { theme } = useContext(ThemeContext);
    const { language } = useContext(LanguageContext); // 主題狀態
    const ThemeProviderTheme = createTheme({ palette: { mode: (theme === 'light' ? 'light' : 'dark') } });
    const [activeSection, setActiveSection] = useState("學歷");
    const [showUndergrad, setShowUndergrad] = useState(true); // 控制顯示狀態 (true=大學, false=研究所)
    const [value, setValue] = useState(0);
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
        const headerOffset = 80; // 固定的 header 高度（單位：像素）
        const elementPosition = element.getBoundingClientRect().top; // 元素相對於視窗的距離
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    };
    const handleTeachButtonClick = (title) => {
        alert(`你點擊了教學經驗 ${title}`);
    }
    const handleProjectButtonClick = (title) => {
        alert(`你點擊了專案計畫 ${title}`);
    }
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
    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', my: 4 }}>
            {/* 個人介紹 */}
            <ThemeProvider theme={ThemeProviderTheme}>
                <Paper
                    id="關於我"
                    elevation={(theme === 'light' ? 3 : 3)}
                    onMouseEnter={() => setActiveSection("關於我")}
                    sx={{ width: "100%", my: 4, marginBottom: 2, backgroundColor: theme === 'light' ? "rgba(255, 255, 255, 0.85)" : "rgba(3, 3, 3, 0.85)" }}
                >
                    <Grid
                        container
                        justifyContent="center"
                        alignItems='center'
                    >
                        <Grid
                            item
                            xs={12} md={4}
                            style={{ padding: "1em" }}
                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <Tooltip title={(language === "zh" ? "AI 生圖" : "AI Generating Graphs")} placement="bottom">
                                <img
                                    src={`${process.env.PUBLIC_URL}/YC-Chan_image.jpg`}
                                    alt="詹宇宸"
                                    style={{
                                        maxWidth: "200px", // 最大寬度限制
                                        width: "100%",
                                        borderRadius: "10px",
                                    }}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12} md={8} style={{ padding: "1em" }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 2 }}>
                                {/* <Mimictypingeffects text="關於我" speed={0} variant="h4" /> */}
                                <Typography variant="h4">關於我</Typography>
                                <Tooltip title={(language === "zh" ? "履歷表" : "curriculum vitae")} placement="left">
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            color: "#28a745", // 綠色文字
                                            borderColor: "#28a745", // 綠色邊框
                                            "&:hover": {
                                                backgroundColor: "rgba(40, 167, 69, 0.1)", // 綠色背景 (淡淡的)
                                                borderColor: "#218838", // 深綠色邊框
                                            },
                                        }}>
                                        CV
                                    </Button>
                                </Tooltip>
                            </Box>
                            <Typography
                                gutterBottom
                                sx={{
                                    minHeight: { xs: "168px", sm: "130px", md: "100px" }, // 設定最小寬度，確保顯示區塊穩定
                                    display: "inline-block", // 避免 Typography 收縮
                                    marginBottom: 2,
                                }}>
                                我是詹宇宸，大學就讀國立高雄科技大學 (NKUST) 的電腦與通訊工程系 (CCE)。
                                在學期間有幸接觸到競程，在教授與學長的指導下多次參加程式相關競賽。
                                除了競程，我對於電子通訊技術也非常有興趣~歡迎指導交流~
                                我的研究興趣：
                                <Mimictypingeffects
                                    textList={["資料分析", "程式撰寫", "通訊設計", "電路設計"]}
                                    speed={50}
                                    variant="body"
                                    repeat={1}
                                />
                            </Typography>
                            <Grid container sx={{ width: "100%" }} justifyContent="space-between">
                                <Grid item xs={3} md={3} display="flex" flexDirection="column" alignItems="center" >
                                    <img
                                        src={exploration}
                                        alt="exploration"
                                        style={{
                                            maxWidth: "70px",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                    <Typography gutterBottom variant="body2" sx={{ marginTop: 1, textAlign: "center" }}>
                                        <strong>資料分析</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} md={3} display="flex" flexDirection="column" alignItems="center">
                                    <img
                                        src={algorithms}
                                        alt="algorithms"
                                        style={{
                                            maxWidth: "70px",
                                            width: "100%",
                                            height: "100%",
                                        }} />
                                    <Typography gutterBottom variant="body2" sx={{ marginTop: 1, textAlign: "center" }}>
                                        <strong>程式撰寫</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} md={3} display="flex" flexDirection="column" alignItems="center">
                                    <img
                                        src={communication}
                                        alt="communication"
                                        style={{
                                            maxWidth: "70px",
                                            width: "100%",
                                            height: "100%",
                                        }} />
                                    <Typography gutterBottom variant="body2" sx={{ marginTop: 1, textAlign: "center" }}>
                                        <strong>通訊設計</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} md={3} display="flex" flexDirection="column" alignItems="center">
                                    <img
                                        src={cpu}
                                        alt="cpu"
                                        style={{
                                            maxWidth: "70px",
                                            width: "100%",
                                            height: "100%",
                                        }} />
                                    <Typography gutterBottom variant="body2" sx={{ marginTop: 1, textAlign: "center" }}>
                                        <strong>電路設計</strong>
                                    </Typography>
                                </Grid>


                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                {/* 下方資訊 */}

                <Grid container spacing={{ xs: 1, sm: 2 }}>
                    {/* 左側內容 */}
                    <Grid item xs={12} md={2.5}>
                        <Accordion
                            defaultExpanded
                            sx={{
                                position: "sticky", // 固定位置
                                top: 80,           // 距離視窗頂部 10px，可根據需求調整
                                // zIndex: 1,         // 確保優先於其他元素顯示
                                backgroundColor: theme === 'light' ? "rgba(255, 255, 255, 0.85)" : "rgba(20, 20, 20, 0.50)",
                            }}>
                            <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <Typography variant="h6">目錄</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <AccordionDetails>
                                    {[
                                        "關於我",
                                        "教育學歷",
                                        "教學經驗",
                                        "專案計畫",
                                        "學業表現",
                                    ].map((section) => (
                                        <Typography key={section}>
                                            <Button
                                                variant={activeSection === section ? "contained" : "outlined"}
                                                sx={{
                                                    width: "100%",
                                                    marginBottom: 0.5,
                                                    color:
                                                        theme === "dark"
                                                            ? activeSection === section
                                                                ? "#333333"
                                                                : "#ffffff"
                                                            : activeSection === section
                                                                ? "#ffffff"
                                                                : "#333333",
                                                    backgroundColor:
                                                        theme === "dark"
                                                            ? activeSection === section
                                                                ? "#ffffff"
                                                                : "#333333"
                                                            : activeSection === section
                                                                ? "#333333"
                                                                : "#ffffff",
                                                    border: `1px solid ${theme === "dark" || activeSection === section
                                                        ? "#ffffff"
                                                        : "#333333"
                                                        }`,
                                                    "&:hover": {
                                                        backgroundColor:
                                                            theme === "dark"
                                                                ? activeSection === section
                                                                    ? "#e0e0e0"
                                                                    : "#555555"
                                                                : activeSection === section
                                                                    ? "#222222"
                                                                    : "#aaaaaa",
                                                    },
                                                }}
                                                onClick={() => handleScrollTo(section)}
                                            >
                                                {section}
                                            </Button>
                                        </Typography>
                                    ))}
                                </AccordionDetails>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                    {/* 右側內容 */}
                    <Grid item xs={12} md={9.5}>
                        <Paper
                            elevation={(theme === 'light' ? 1 : 12)}
                            sx={{
                                padding: 2,
                                marginBottom: 2,
                                backgroundColor: theme === 'light' ? "rgba(255, 255, 255, 0.85)" : "rgba(3, 3, 3, 0.85)"
                            }}
                            id="教育學歷"
                            onMouseEnter={() => setActiveSection("教育學歷")}
                        >
                            <Typography variant="h5" gutterBottom>
                                <img
                                    src={education}
                                    alt="education"
                                    style={{
                                        maxWidth: "20px",
                                        width: "100%",
                                    }}
                                /> 教育學歷
                            </Typography>
                            <ul>
                                <Typography variant="body1" gutterBottom>
                                    <li>
                                        <Tooltip title={(language === "zh" ? "進入官網" : "Go to the official website")} placement="right">
                                            <a href="https://www.cs.nycu.edu.tw/intro/organization/cybersecurity" target="_blank" rel="noopener noreferrer"
                                                style={{ textDecoration: "none", color: (theme === 'light' ? "#333333" : "rgb(255, 255, 255)") }}>
                                                2025 ~ 2027 | 國立陽明交通大學 數據科學與工程研究所
                                            </a>
                                        </Tooltip>
                                    </li>
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <li>
                                        <Tooltip title={(language === "zh" ? "進入官網" : "Go to the official website")} placement="right">
                                            <a href="https://ccee.nkust.edu.tw/" target="_blank" rel="noopener noreferrer"
                                                style={{ textDecoration: "none", color: (theme === 'light' ? "#333333" : "rgb(255, 255, 255)") }}>
                                                2021 ~ 2025 | 國立高雄科技大學 電腦與通訊工程系
                                            </a>
                                        </Tooltip>
                                    </li>
                                </Typography>

                                <Typography variant="body1" gutterBottom>
                                    <li>
                                        <Tooltip title={(language === "zh" ? "進入官網" : "Go to the official website")} placement="right">
                                            <a href="https://w3.sivs.chc.edu.tw/files/13-1000-15978.php" target="_blank" rel="noopener noreferrer"
                                                style={{ textDecoration: "none", color: (theme === 'light' ? "#333333" : "rgb(255, 255, 255)") }}>
                                                2019 ~ 2021 | 國立彰師附工 控制科
                                            </a>
                                        </Tooltip>
                                    </li>
                                </Typography>
                            </ul>
                        </Paper>

                        <Paper
                            elevation={(theme === 'light' ? 1 : 12)}
                            sx={{
                                padding: 2,
                                marginBottom: 2,
                                backgroundColor: theme === 'light' ? "rgba(255, 255, 255, 0.85)" : "rgba(3, 3, 3, 0.85)"
                            }}
                            id="教學經驗"
                            onMouseEnter={() => setActiveSection("教學經驗")}
                        >
                            <Typography variant="h5" gutterBottom>
                                <img
                                    src={schoolbag}
                                    alt="schoolbag"
                                    style={{
                                        maxWidth: "20px",
                                        width: "100%",
                                    }}
                                /> 教學經驗
                            </Typography>
                            <ul>
                                {[
                                    { id: 1, date: "2024/7 ~ 2024/8", title: "暑期教師", titleen: "Summer Teacher", level: "小學" },
                                    { id: 2, date: "2024/2 ~ 2024/6", title: "機率助教", titleen: "Chance Teaching Assistant", level: "大學", },
                                    { id: 3, date: "2023/9 ~ 2024/1", title: "線性代數助教", titleen: "Teaching assistant in linear algebra", level: "大學" },
                                ].map((item) => (
                                    <Box
                                        key={item.id}
                                        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}
                                    >
                                        <Typography variant="body1" >
                                            <li>{item.date} | {item.title} - {item.level}</li>
                                        </Typography>
                                        <Tooltip title={(language === "zh" ? item.title : item.titleen)} placement="left">
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => handleTeachButtonClick(item.id)}
                                                sx={{
                                                    color: "#28a745", // 綠色文字
                                                    borderColor: "#28a745", // 綠色邊框
                                                    "&:hover": {
                                                        backgroundColor: "rgba(40, 167, 69, 0.1)", // 綠色背景 (淡淡的)
                                                        borderColor: "#218838", // 深綠色邊框
                                                    },
                                                }}
                                            >
                                                教學資料
                                            </Button>
                                        </Tooltip>
                                    </Box>
                                ))}
                            </ul>


                        </Paper>

                        <Paper
                            elevation={(theme === 'light' ? 1 : 12)}
                            sx={{
                                padding: 2,
                                marginBottom: 2,
                                backgroundColor: theme === 'light' ? "rgba(255, 255, 255, 0.85)" : "rgba(3, 3, 3, 0.85)"
                            }}
                            id="專案計畫"
                            onMouseEnter={() => setActiveSection("專案計畫")}
                        >
                            <Typography variant="h5" gutterBottom>
                                <img
                                    src={project}
                                    alt="project"
                                    style={{
                                        maxWidth: "20px",
                                        width: "100%",
                                    }}
                                /> 專案計畫
                            </Typography>
                            <ul>
                                {[
                                    { id: 1, date: "2024/7 ~ 2024/8", title: "專題", level: "nan", description: "test1" },
                                    { id: 2, date: "2024/2 ~ 2024/6", title: "課堂專題1", level: "大學", description: "test2" },
                                    { id: 3, date: "2023/9 ~ 2024/1", title: "課堂專題2", level: "大學", description: "test3" },
                                ].map((item) => (
                                    <>
                                        <Box
                                            key={item.id}
                                            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}
                                        >
                                            <Typography variant="body1" >
                                                <li>{item.date} | {item.title} - {item.level}</li>
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => handleProjectButtonClick(item.id)}
                                                sx={{
                                                    color: "#28a745", // 綠色文字
                                                    borderColor: "#28a745", // 綠色邊框
                                                    "&:hover": {
                                                        backgroundColor: "rgba(40, 167, 69, 0.1)", // 綠色背景 (淡淡的)
                                                        borderColor: "#218838", // 深綠色邊框
                                                    },
                                                }}
                                            >
                                                相關資料
                                            </Button>
                                        </Box>
                                        <Box><Typography variant="body1" > {item.description}</Typography></Box>
                                    </>
                                ))}
                            </ul>
                        </Paper>

                        <Paper
                            elevation={(theme === 'light' ? 1 : 12)}
                            sx={{
                                padding: 2,
                                marginBottom: 2,
                                backgroundColor: theme === 'light' ? "rgba(255, 255, 255, 0.85)" : "rgba(3, 3, 3, 0.85)"
                            }}
                            id="學業表現"
                            onMouseEnter={() => setActiveSection("學業表現")}
                        >
                            <Grid container>
                                <Grid md={6} xs={6}>
                                    <Typography variant="h5" gutterBottom>
                                        <img
                                            src={score}
                                            alt="score"
                                            style={{
                                                maxWidth: "20px",
                                                width: "100%",
                                            }}
                                        /> 學業表現
                                    </Typography>
                                </Grid>
                                {/* 切換按鈕 */}
                                <Grid item xs={6} md={6} display="flex" justifyContent="flex-end">
                                    <ButtonGroup variant="text">
                                        <Button
                                            onClick={() => setShowUndergrad(true)}
                                            sx={{
                                                color: showUndergrad ? "#28a745" : "inherit", // 選中時變綠色
                                                "&:hover": { color: "#218838" }, // 滑鼠懸停時變深綠色
                                            }}
                                        >
                                            大學
                                        </Button>
                                        <Button
                                            onClick={() => setShowUndergrad(false)}
                                            sx={{
                                                color: !showUndergrad ? "#28a745" : "inherit", // 選中時變綠色
                                                "&:hover": { color: "#218838" }, // 滑鼠懸停時變深綠色
                                            }}
                                        >
                                            研究所
                                        </Button>
                                    </ButtonGroup>

                                </Grid>
                            </Grid>
                            <br />
                            <Grid container>
                                {/* 大學圖表 */}
                                {showUndergrad && (
                                    <>
                                        <Grid item xs={12} md={12}>
                                            <ResponsiveContainer width="100%" height={250}>
                                                <ComposedChart data={College_grades} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                                                    <CartesianGrid strokeDasharray="1 1" stroke="#ddd" />
                                                    <XAxis dataKey="semester"
                                                        tick={{ fill: theme === 'dark' ? '#fff' : '#333' }} // 設定刻度文字顏色
                                                        axisLine={{ stroke: theme === 'dark' ? '#fff' : '#333' }} // 設定X軸線條顏色
                                                    />
                                                    <YAxis
                                                        yAxisId="left"
                                                        orientation="left"
                                                        domain={[0, 4.3]}
                                                        label={{ value: "GPA", angle: -90, position: "insideLeft" }}
                                                        axisLine={{ stroke: theme === 'dark' ? '#fff' : '#333' }}  // 根據模式改變軸線顏色
                                                        tickLine={{ stroke: theme === 'dark' ? '#fff' : '#333' }}  // 根據模式改變刻度線顏色
                                                    />
                                                    <YAxis
                                                        yAxisId="right"
                                                        orientation="right"
                                                        domain={[0, 100]}
                                                        label={{ value: "班級 PR", angle: -90, position: "insideRight" }}
                                                        axisLine={{ stroke: theme === 'dark' ? '#fff' : '#333' }}  // 根據模式改變軸線顏色
                                                        tickLine={{ stroke: theme === 'dark' ? '#fff' : '#333' }}  // 根據模式改變刻度線顏色
                                                    />
                                                    <RechartsTooltip
                                                        contentStyle={{
                                                            backgroundColor: theme === 'dark' ? '#333' : '#fff', // 深色模式背景為深灰色，淺色模式為白色
                                                            color: theme === 'dark' ? '#fff' : '#333', // 文字顏色根據模式變化
                                                            border: '1px solid', // 可以添加邊框以增強可視化效果
                                                            borderColor: theme === 'dark' ? '#444' : '#ccc', // 邊框顏色
                                                        }}
                                                    />
                                                    <Legend />
                                                    {/* 學分數的 Bar */}
                                                    <Bar
                                                        yAxisId="right"
                                                        dataKey="Credits"
                                                        fill="#ff7300"
                                                        barSize={2.5}
                                                        name="學分"
                                                    />
                                                    {/* GPA 線條 */}
                                                    <Line yAxisId="left" type="monotone" name="GPA" dataKey="GPA" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                                                    {/* 班級排名線條 */}
                                                    <Line yAxisId="right" type="monotone" name="PR" dataKey="PR" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 8 }} />
                                                    <Brush dataKey="semester" height={10} stroke="#8884d8" />
                                                </ComposedChart>
                                            </ResponsiveContainer>
                                        </Grid>
                                        <Grid item xs={12} md={5.9}>
                                            <Box sx={{ width: '100%' }}>
                                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                                        <Tab label="資工" {...a11yProps(0)} />
                                                        <Tab label="通訊" {...a11yProps(1)} />
                                                        <Tab label="其他" {...a11yProps(2)} />
                                                    </Tabs>
                                                </Box>
                                                {/* 資工 */}
                                                <CustomTabPanel value={value} index={0}>
                                                    <TableContainer component={Paper}>
                                                        <Table size="small" aria-label="grades table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <StyledTableCell>課程名稱</StyledTableCell>
                                                                    <StyledTableCell align="right">學分</StyledTableCell>
                                                                    <StyledTableCell align="right">分數</StyledTableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {College_grades_Group["cs"].map((row, index) => (
                                                                    <StyledTableRow key={`${row.name}-${index}`}>
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
                                                </CustomTabPanel>
                                                {/* 通訊 */}
                                                <CustomTabPanel value={value} index={1}>
                                                    <TableContainer component={Paper}>
                                                        <Table size="small" aria-label="grades table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <StyledTableCell>課程名稱</StyledTableCell>
                                                                    <StyledTableCell align="right">學分</StyledTableCell>
                                                                    <StyledTableCell align="right">分數</StyledTableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {College_grades_Group["communications"].map((row, index) => (
                                                                    <StyledTableRow key={`${row.name}-${index}`}>
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
                                                </CustomTabPanel>
                                                <CustomTabPanel value={value} index={2}>
                                                    <TableContainer component={Paper}>
                                                        <Table size="small" aria-label="grades table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <StyledTableCell>課程名稱</StyledTableCell>
                                                                    <StyledTableCell align="right">學分</StyledTableCell>
                                                                    <StyledTableCell align="right">分數</StyledTableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {College_grades_Group["others"].map((row, index) => (
                                                                    <StyledTableRow key={`${row.name}-${index}`}>
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
                                                </CustomTabPanel>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={0.2} />

                                        <Grid item xs={12} md={5.9} sx={{ mt: 2 }}>
                                            {/* 雷達圖 */}
                                            <ResponsiveContainer width="100%" height={300}>
                                                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={Skill_distribution}>
                                                    <PolarGrid />
                                                    <PolarAngleAxis dataKey="subject" stroke={theme === 'dark' ? '#fff' : '#333'}
                                                        tick={{ dy: 5 }} // 使用 dy 調整標籤距離
                                                    /> {/* 設置軸標籤字體顏色 */}
                                                    <PolarRadiusAxis stroke={theme === 'dark' ? '#fff' : '#333'} /> {/* 設置輻射軸字體顏色 */}
                                                    <Radar name="技能評估" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.4}

                                                    />
                                                </RadarChart>
                                            </ResponsiveContainer>
                                            {/* 直方圖 */}
                                            <ResponsiveContainer width="100%" height={200}>
                                                <ComposedChart data={College_Fractions} margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                }}>
                                                    <CartesianGrid strokeDasharray="1 1" stroke="#ddd" />

                                                    <YAxis
                                                        axisLine={{ stroke: theme === 'dark' ? '#fff' : '#333' }}  // 根據模式改變軸線顏色
                                                        tickLine={{ stroke: theme === 'dark' ? '#fff' : '#333' }}  // 根據模式改變刻度線顏色
                                                    />
                                                    <XAxis
                                                        dataKey="name"
                                                        tick={{ fill: theme === 'dark' ? '#fff' : '#333' }} // 設定刻度文字顏色
                                                        axisLine={{ stroke: theme === 'dark' ? '#fff' : '#333' }} // 設定X軸線條顏色
                                                    />

                                                    <RechartsTooltip
                                                        contentStyle={{
                                                            backgroundColor: theme === 'dark' ? '#333' : '#fff', // 深色模式背景為深灰色，淺色模式為白色
                                                            color: theme === 'dark' ? '#fff' : '#333', // 文字顏色根據模式變化
                                                            border: '1px solid', // 可以添加邊框以增強可視化效果
                                                            borderColor: theme === 'dark' ? '#444' : '#ccc', // 邊框顏色
                                                        }}
                                                    />
                                                    <Legend />
                                                    {/* 學分數的 Bar */}
                                                    <Bar
                                                        dataKey="aa"
                                                        fill="#8884d8"
                                                        barSize={20} name="A+"
                                                    />
                                                    <Bar
                                                        dataKey="a"
                                                        fill="#82ca9d"
                                                        barSize={20} name="A"
                                                    />
                                                    <Bar
                                                        dataKey="as"
                                                        fill="#ff7300"
                                                        barSize={20}
                                                        name="A-"
                                                    />
                                                </ComposedChart>
                                            </ResponsiveContainer>
                                        </Grid>
                                    </>
                                )}

                                {/* 研究所圖表 */}
                                {!showUndergrad && (
                                    <>
                                        <Grid item xs={12} md={12}>
                                            <ResponsiveContainer width="100%" height={250}>
                                                <ComposedChart data={College_grades} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                                                    <CartesianGrid strokeDasharray="1 1" stroke="#ddd" />
                                                    <XAxis dataKey="semester"
                                                        tick={{ fill: theme === 'dark' ? '#fff' : '#333' }} // 設定刻度文字顏色
                                                        axisLine={{ stroke: theme === 'dark' ? '#fff' : '#333' }} // 設定X軸線條顏色
                                                    />
                                                    <YAxis
                                                        yAxisId="left"
                                                        orientation="left"
                                                        domain={[0, 4.3]}
                                                        label={{ value: "GPA", angle: -90, position: "insideLeft" }}
                                                        axisLine={{ stroke: theme === 'dark' ? '#fff' : '#333' }}  // 根據模式改變軸線顏色
                                                        tickLine={{ stroke: theme === 'dark' ? '#fff' : '#333' }}  // 根據模式改變刻度線顏色
                                                    />
                                                    <YAxis
                                                        yAxisId="right"
                                                        orientation="right"
                                                        domain={[0, 100]}
                                                        label={{ value: "班級 PR", angle: -90, position: "insideRight" }}
                                                        axisLine={{ stroke: theme === 'dark' ? '#fff' : '#333' }}  // 根據模式改變軸線顏色
                                                        tickLine={{ stroke: theme === 'dark' ? '#fff' : '#333' }}  // 根據模式改變刻度線顏色
                                                    />
                                                    <RechartsTooltip
                                                        contentStyle={{
                                                            backgroundColor: theme === 'dark' ? '#333' : '#fff', // 深色模式背景為深灰色，淺色模式為白色
                                                            color: theme === 'dark' ? '#fff' : '#333', // 文字顏色根據模式變化
                                                            border: '1px solid', // 可以添加邊框以增強可視化效果
                                                            borderColor: theme === 'dark' ? '#444' : '#ccc', // 邊框顏色
                                                        }}
                                                    />
                                                    <Legend />
                                                    {/* 學分數的 Bar */}
                                                    <Bar
                                                        yAxisId="right"
                                                        dataKey="Credits"
                                                        fill="#ff7300"
                                                        barSize={2.5}
                                                        name="學分"
                                                    />
                                                    {/* GPA 線條 */}
                                                    <Line yAxisId="left" type="monotone" name="GPA" dataKey="GPA" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                                                    {/* 班級排名線條 */}
                                                    <Line yAxisId="right" type="monotone" name="PR" dataKey="PR" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 8 }} />
                                                    <Brush dataKey="semester" height={10} stroke="#8884d8" />
                                                </ComposedChart>
                                            </ResponsiveContainer>
                                        </Grid>
                                        <Grid item xs={12} md={5.9}>
                                            {/* <Box sx={{ width: '100%' }}>
                                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                                        <Tab label="資工" {...a11yProps(0)} />
                                                        <Tab label="通訊" {...a11yProps(1)} />
                                                        <Tab label="其他" {...a11yProps(2)} />
                                                    </Tabs>
                                                </Box>
                                                <CustomTabPanel value={value} index={0}>

                                                </CustomTabPanel>
                                                <CustomTabPanel value={value} index={1}>
                                                    Item Two
                                                </CustomTabPanel>
                                                <CustomTabPanel value={value} index={2}>
                                                    Item Three
                                                </CustomTabPanel>
                                            </Box> */}
                                        </Grid>
                                        <Grid item xs={12} md={0.2} />
                                        <Grid item xs={12} md={5.9}>


                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Paper>
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
