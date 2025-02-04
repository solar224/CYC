import React, { useState, useEffect, useContext } from "react";
import { styled, alpha, ThemeProvider, createTheme } from "@mui/material/styles";
import { Tooltip, ButtonGroup, THEME_ID } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import anime from "animejs/lib/anime.es.js";
import { Grid, Paper } from "@mui/material";
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
    BarChart,
} from "recharts";
// 引入圖片
import ycChanImage from "../images/YC-Chan_image.jpg";
import exploration from "../images/exploration.png";
import cpu from "../images/cpu.png";
import communication from "../images/communication.png";
import education from "../images/education.png";
import schoolbag from "../images/schoolbag.png";
import project from "../images/project.png";
import score from "../images/score.png";
import algorithms from "../images/algorithms.png";

const options = ["About", "Projects", "Contact", "Settings", "Help"]; // for Header [Autocomplete]
const els = ["歡", "迎", "來", "到", "我", "的", "網", "站"];
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));


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
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { language, toggleLanguage } = useContext(LanguageContext); // 主題狀態
    const ThemeProviderTheme = createTheme({ palette: { mode: (theme == 'light' ? 'light' : 'dark') } });
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
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    const College_grades = [
        { semester: "大一上", GPA: 3.56, PR: 83.60, Credits: 27 },
        { semester: "大一下", GPA: 3.91, PR: 93.33, Credits: 22 },
        { semester: "大二上", GPA: 4.12, PR: 96.67, Credits: 26 },
        { semester: "大二下", GPA: 4.19, PR: 98.31, Credits: 23 },
        { semester: "大三上", GPA: 4.22, PR: 98.31, Credits: 21 },
        { semester: "大三下", GPA: 4.24, PR: 98.31, Credits: 15 },
        { semester: "大四上", GPA: 4.3, PR: 99.99, Credits: 10 },
        { semester: "大四下", GPA: 4.3, PR: 99.99, Credits: 8 },
    ];
    const Master_degree = [
        { semester: "碩一上", GPA: 3.56, PR: 83.60 },
        { semester: "碩一下", GPA: 3.91, PR: 93.33 },
        { semester: "碩二上", GPA: 4.12, PR: 96.67 },
        { semester: "碩二下", GPA: 4.19, PR: 98.31 },

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
            createData('演化式計算', 3, 99),
            createData('計算機組織', 3, 98),
            createData('巨量資料分析', 3, 95),
            createData('視窗程式設計', 3, 93),

        ],
        communications: [
            createData('通訊原理', 3, 99),
            createData('通訊工程', 3, 99),
            createData('電子電路', 3, 99),
            createData('數位電路', 3, 99),
            createData('富氏分析', 3, 98),
            createData('微處理器', 3, 99),
            createData('積體電路', 3, 99),
        ],
        others: [
            createData('機率', 3, 99),
            createData('線性代數', 3, 99),
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
        <Box sx={{ maxWidth: "1100px", margin: "0 auto", padding: 5 }}>
            {/* 個人介紹 */}
            <ThemeProvider theme={ThemeProviderTheme}>
                <Paper elevation={(theme == 'light' ? 3 : 3)} sx={{ padding: 2, marginBottom: 2 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4} style={{ padding: "3em", paddingBottom: "1em" }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img
                                src={ycChanImage}
                                alt="詹宇宸"
                                style={{
                                    maxWidth: "200px", // 最大寬度限制
                                    width: "100%",
                                    borderRadius: "",
                                }}
                            />

                            {/* <Typography variant="h5" gutterBottom>
                            {language == 'zh' ? '詹宇宸' : 'CHAN,YU-CHEN'}
                        </Typography> */}
                        </Grid>
                        <Grid item xs={12} md={8} style={{ padding: "2em" }}>
                            <br />
                            {/* gutterBottom */}
                            <Typography gutterBottom>
                                我是<strong>詹宇宸</strong>，目前就讀於
                                <a href="https://www.nkust.edu.tw/" target="_blank" rel="noopener noreferrer"
                                    style={{ textDecoration: "none", color: (theme == 'light' ? "rgb(0, 26, 194)" : "rgba(246, 255, 0, 0.82)") }}>
                                    國立高雄科技大學 (NKUST)
                                </a> 的
                                <a href="https://ccee.nkust.edu.tw/" target="_blank" rel="noopener noreferrer"
                                    style={{ textDecoration: "none", color: (theme == 'light' ? "rgb(0, 26, 194)" : "rgba(246, 255, 0, 0.82)") }}>
                                    電腦與通訊工程系 (CCE)
                                </a>。
                                在今年暑假，我將會前往
                                <a href="https://www.nycu.edu.tw/nycu/ch/index" target="_blank" rel="noopener noreferrer"
                                    style={{ textDecoration: "none", color: (theme == 'light' ? "rgb(0, 26, 194)" : "rgba(246, 255, 0, 0.82)") }}>
                                    國立陽明交通大學 (NYCU)
                                </a> 的
                                <a href="https://www.cs.nycu.edu.tw/intro/organization/data" target="_blank" rel="noopener noreferrer"
                                    style={{ textDecoration: "none", color: (theme == 'light' ? "rgb(0, 26, 194)" : "rgba(246, 255, 0, 0.82)") }}>
                                    數據科學與工程研究所 (DSIE)
                                </a> 攻讀碩士學位。
                            </Typography>
                            <Typography gutterBottom >
                                我的研究興趣：
                            </Typography>
                            <br />
                            <Grid container sx={{ width: "100%" }} justifyContent="space-between">
                                <Grid item xs={6} md={3} display="flex" flexDirection="column" alignItems="center" >
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
                                <Grid item xs={6} md={3} display="flex" flexDirection="column" alignItems="center">
                                    <img
                                        src={algorithms}
                                        alt="algorithms"
                                        style={{
                                            maxWidth: "70px",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                    <Typography gutterBottom variant="body2" sx={{ marginTop: 1, textAlign: "center" }}>
                                        <strong>程式撰寫</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={3} display="flex" flexDirection="column" alignItems="center">
                                    <img
                                        src={communication}
                                        alt="communication"
                                        style={{
                                            maxWidth: "70px",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                    <Typography gutterBottom variant="body2" sx={{ marginTop: 1, textAlign: "center" }}>
                                        <strong>通訊設計</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={3} display="flex" flexDirection="column" alignItems="center">
                                    <img
                                        src={cpu}
                                        alt="cpu"
                                        style={{
                                            maxWidth: "70px",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                    <Typography gutterBottom variant="body2" sx={{ marginTop: 1, textAlign: "center" }}>
                                        <strong>電路設計</strong>
                                    </Typography>
                                </Grid>


                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </ThemeProvider>
            {/* 下方資訊 */}

            <Grid container spacing={4}>
                {/* 左側內容 */}
                <Grid item xs={12} md={2.5}>
                    <ThemeProvider theme={ThemeProviderTheme}>
                        <Paper
                            elevation={(theme == 'light' ? 1 : 12)}
                            sx={{
                                padding: 0,
                                marginBottom: 2,
                                textAlign: "",
                                position: "sticky", // 固定位置
                                top: 80,           // 距離視窗頂部 10px，可根據需求調整
                                // zIndex: 1,         // 確保優先於其他元素顯示
                            }}
                        >
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography variant="h6">目錄</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <Button
                                            variant={activeSection === "學歷" ? "contained" : "outlined"}
                                            sx={{ width: "100%", marginBottom: 0.5 }}
                                            onClick={() => handleScrollTo("學歷")}
                                        >
                                            教育學歷
                                        </Button>
                                    </Typography>
                                    <Typography>
                                        <Button
                                            variant={activeSection === "教學經驗" ? "contained" : "outlined"}
                                            sx={{ width: "100%", marginBottom: 0.5 }}
                                            onClick={() => handleScrollTo("教學經驗")}
                                        >
                                            教學經驗
                                        </Button>
                                    </Typography>
                                    <Typography>
                                        <Button
                                            variant={activeSection === "專案" ? "contained" : "outlined"}
                                            sx={{ width: "100%", marginBottom: 0.5 }}
                                            onClick={() => handleScrollTo("專案")}
                                        >
                                            專案計畫
                                        </Button>
                                    </Typography>
                                    <Typography>
                                        <Button
                                            variant={activeSection === "學業表現" ? "contained" : "outlined"}
                                            sx={{ width: "100%", marginBottom: 0.5 }}
                                            onClick={() => handleScrollTo("學業表現")}
                                        >
                                            學業表現
                                        </Button>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Paper>
                    </ThemeProvider>

                </Grid>

                {/* 右側內容 */}
                <Grid item xs={12} md={9.5}>
                    <ThemeProvider theme={ThemeProviderTheme}>

                        <Paper
                            elevation={(theme == 'light' ? 1 : 12)}
                            sx={{ padding: 2, marginBottom: 2 }}
                            id="學歷"
                            onMouseEnter={() => setActiveSection("學歷")}
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
                                <li>國立彰師附工 控制科 (110 畢業)</li>
                                <li>國立高雄科技大學 電腦與通訊工程系 (在讀中)</li>
                                <li>國立陽明交通大學 數據科學與工程研究所 (未來)</li>
                            </ul>
                        </Paper>
                    </ThemeProvider>
                    <ThemeProvider theme={ThemeProviderTheme}>

                        <Paper
                            elevation={(theme == 'light' ? 1 : 12)}
                            sx={{ padding: 2, marginBottom: 2 }}
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
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography variant="body1" gutterBottom>
                                    <strong>暑期教師 [小學]</strong>
                                </Typography>
                                <Typography variant="body2">
                                    <strong>工作時間：</strong>2024年7月 - 2024年8月
                                </Typography>
                                <Typography variant="body2" >
                                    <strong>工作內容：</strong>教授講解國小課程內容，陪同學生寫作業。
                                </Typography>
                                <Typography variant="body2" >
                                    <strong>工作資料:</strong>
                                </Typography>
                            </Box>
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography variant="body1" gutterBottom>
                                    <strong>機率助教 [大學]</strong>
                                </Typography>
                                <Typography variant="body2">
                                    <strong>工作時間：</strong>2024年2月 - 2024年6月
                                </Typography>
                                <Typography variant="body2">
                                    <strong>工作內容:</strong> 協助教授講解機率課程內容，解答學生疑問，並提供課後輔導。
                                </Typography>
                                <Typography variant="body2" >
                                    <strong>工作資料:</strong>
                                </Typography>
                            </Box>
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography variant="body1" gutterBottom>
                                    <strong>線性代數助教 [大學]</strong>
                                </Typography>
                                <Typography variant="body2">
                                    <strong>工作時間：</strong>2023年9月 - 2024年1月
                                </Typography>
                                <Typography variant="body2">
                                    <strong>工作內容:</strong> 協助教授講解線性代數課程內容，解答學生疑問，並提供課後輔導。
                                </Typography>
                                <Typography variant="body2" >
                                    <strong>工作資料:</strong>
                                </Typography>
                            </Box>

                        </Paper>
                    </ThemeProvider>
                    <ThemeProvider theme={ThemeProviderTheme}>

                        <Paper
                            elevation={(theme == 'light' ? 1 : 12)}
                            sx={{ padding: 2, marginBottom: 2 }}
                            id="專案"
                            onMouseEnter={() => setActiveSection("專案")}
                        >
                            <Typography variant="h5" gutterBottom>
                                <img
                                    src={project}
                                    alt="project"
                                    style={{
                                        maxWidth: "20px",
                                        width: "100%",
                                    }}
                                /> 專案
                            </Typography>
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography variant="h6">自我創作</Typography>
                                <Typography variant="subtitle1">January 1880 - July 1890</Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Artist</strong>
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Summary:</strong> Independent artist specializing in emotive, vibrant works.
                                </Typography>
                            </Box>
                        </Paper>
                    </ThemeProvider>
                    <ThemeProvider theme={ThemeProviderTheme}>
                        <Paper
                            elevation={(theme == 'light' ? 1 : 12)}
                            sx={{ padding: 2, marginBottom: 2 }}
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
                                            color={showUndergrad ? "primary" : "inherit"}
                                        >
                                            大學
                                        </Button>
                                        <Button
                                            onClick={() => setShowUndergrad(false)}
                                            color={!showUndergrad ? "primary" : "inherit"}
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
                                                        tick={{ fill: theme === 'dark' ? '#fff' : '#000' }} // 設定刻度文字顏色
                                                        axisLine={{ stroke: theme === 'dark' ? '#fff' : '#000' }} // 設定X軸線條顏色
                                                    />
                                                    <YAxis
                                                        yAxisId="left"
                                                        orientation="left"
                                                        domain={[3.3, 4.3]}
                                                        label={{ value: "GPA", angle: -90, position: "insideLeft" }}
                                                        axisLine={{ stroke: theme === 'dark' ? '#fff' : '#000' }}  // 根據模式改變軸線顏色
                                                        tickLine={{ stroke: theme === 'dark' ? '#fff' : '#000' }}  // 根據模式改變刻度線顏色
                                                    />
                                                    <YAxis
                                                        yAxisId="right"
                                                        orientation="right"
                                                        domain={[0, 100]}
                                                        label={{ value: "班級 PR", angle: -90, position: "insideRight" }}
                                                        axisLine={{ stroke: theme === 'dark' ? '#fff' : '#000' }}  // 根據模式改變軸線顏色
                                                        tickLine={{ stroke: theme === 'dark' ? '#fff' : '#000' }}  // 根據模式改變刻度線顏色
                                                    />
                                                    <RechartsTooltip
                                                        contentStyle={{
                                                            backgroundColor: theme === 'dark' ? '#333' : '#fff', // 深色模式背景為深灰色，淺色模式為白色
                                                            color: theme === 'dark' ? '#fff' : '#000', // 文字顏色根據模式變化
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
                                            <ResponsiveContainer width="100%" height={250}>
                                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={Skill_distribution}>
                                                    <PolarGrid />
                                                    <PolarAngleAxis dataKey="subject" />
                                                    <PolarRadiusAxis />
                                                    <Radar name="技能評估" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.4} />
                                                    <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} />
                                                    {/* <Tooltip content={({ active, payload }) => {
                                                        if (active && payload && payload.length) {
                                                            return (
                                                                <div style={{ backgroundColor: "white", padding: "10px", border: "1px solid #ccc" }}>
                                                                    <p>{`技能: ${payload[0].payload.subject}`}</p>
                                                                    <p>{`評估分數: ${payload[0].value}`}</p>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    }} /> */}
                                                </RadarChart>
                                            </ResponsiveContainer>
                                            {/* 直方圖 */}
                                            <ResponsiveContainer width="100%" height={200}>
                                                <BarChart
                                                    width={500}
                                                    height={300}
                                                    data={data}
                                                    margin={{
                                                        top: 5,
                                                        right: 30,
                                                        left: 20,
                                                        bottom: 5,
                                                    }}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="pv" barSize={20} fill="#8884d8" />
                                                </BarChart>
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
                                                        tick={{ fill: theme === 'dark' ? '#fff' : '#000' }} // 設定刻度文字顏色
                                                        axisLine={{ stroke: theme === 'dark' ? '#fff' : '#000' }} // 設定X軸線條顏色
                                                    />
                                                    <YAxis
                                                        yAxisId="left"
                                                        orientation="left"
                                                        domain={[3.3, 4.3]}
                                                        label={{ value: "GPA", angle: -90, position: "insideLeft" }}
                                                        axisLine={{ stroke: theme === 'dark' ? '#fff' : '#000' }}  // 根據模式改變軸線顏色
                                                        tickLine={{ stroke: theme === 'dark' ? '#fff' : '#000' }}  // 根據模式改變刻度線顏色
                                                    />
                                                    <YAxis
                                                        yAxisId="right"
                                                        orientation="right"
                                                        domain={[0, 100]}
                                                        label={{ value: "班級 PR", angle: -90, position: "insideRight" }}
                                                        axisLine={{ stroke: theme === 'dark' ? '#fff' : '#000' }}  // 根據模式改變軸線顏色
                                                        tickLine={{ stroke: theme === 'dark' ? '#fff' : '#000' }}  // 根據模式改變刻度線顏色
                                                    />
                                                    <RechartsTooltip
                                                        contentStyle={{
                                                            backgroundColor: theme === 'dark' ? '#333' : '#fff', // 深色模式背景為深灰色，淺色模式為白色
                                                            color: theme === 'dark' ? '#fff' : '#000', // 文字顏色根據模式變化
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
                    </ThemeProvider>

                </Grid>
            </Grid>
        </Box >
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
