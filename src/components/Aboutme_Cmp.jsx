import React, { useState, useEffect, useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
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
// 引入圖片
import ycChanImage from "../images/YC-Chan_image.jpg";
import exploration from "../images/exploration.png";
import cpu from "../images/cpu.png";
import communication from "../images/communication.png";
import education from "../images/education.png";
import schoolbag from "../images/schoolbag.png";
import project from "../images/project.png";
import score from "../images/score.png";

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
const About = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { language, toggleLanguage } = useContext(LanguageContext); // 主題狀態
    const [activeSection, setActiveSection] = useState("學歷");
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

    return (
        <Box sx={{ maxWidth: "1100px", margin: "0 auto", padding: 5 }}>
            {/* 個人介紹 */}
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
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
                            <a href="https://www.nkust.edu.tw/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "rgb(0, 26, 194)" }}>
                                國立高雄科技大學 (NKUST)
                            </a> 的
                            <a href="https://ccee.nkust.edu.tw/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "rgb(0, 26, 194)" }}>
                                電腦與通訊工程系 (CCE)
                            </a>。
                            在今年暑假，我將會前往
                            <a href="https://www.nycu.edu.tw/nycu/ch/index" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "rgb(0, 26, 194)" }}>
                                國立陽明交通大學 (NYCU)
                            </a> 的
                            <a href="https://www.cs.nycu.edu.tw/intro/organization/data" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "rgb(0, 26, 194)" }}>
                                數據科學與工程研究所 (DSIE)
                            </a> 攻讀碩士學位。
                            {/* <br /><br /> */}
                        </Typography>
                        <Typography gutterBottom >
                            我的研究興趣，包括：
                        </Typography>
                        <br />
                        <Grid container sx={{ marginRight: "auto", width: "fit-content" }} spacing={9} justifyContent="flex-end">
                            <Grid item xs={4} display="flex" flexDirection="column" alignItems="center">
                                <img
                                    src={exploration}
                                    alt="exploration"
                                    style={{
                                        maxWidth: "70px",
                                        width: "100%",
                                    }}
                                />
                                <Typography gutterBottom variant="body2" sx={{ marginTop: 1, textAlign: "center" }}>
                                    資料分析
                                </Typography>
                            </Grid>
                            <Grid item xs={4} display="flex" flexDirection="column" alignItems="center">
                                <img
                                    src={communication}
                                    alt="communication"
                                    style={{
                                        maxWidth: "70px",
                                        width: "100%",
                                    }}
                                />
                                <Typography gutterBottom variant="body2" sx={{ marginTop: 1, textAlign: "center" }}>
                                    通訊設計
                                </Typography>
                            </Grid>
                            <Grid item xs={4} display="flex" flexDirection="column" alignItems="center">
                                <img
                                    src={cpu}
                                    alt="cpu"
                                    style={{
                                        maxWidth: "70px",
                                        width: "100%",
                                    }}
                                />
                                <Typography gutterBottom variant="body2" sx={{ marginTop: 1, textAlign: "center" }}>
                                    電路設計
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

            {/* 下方資訊 */}

            <Grid container spacing={4}>
                {/* 左側內容 */}
                <Grid item xs={12} md={2.5}>
                    <Paper
                        elevation={3}
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

                </Grid>

                {/* 右側內容 */}
                <Grid item xs={12} md={9.5}>
                    <Paper
                        elevation={3}
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

                    <Paper
                        elevation={3}
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
                            <Typography variant="h6">機率助教</Typography>
                            <Typography variant="subtitle1">2024年1月 - 2024年6月</Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>助教</strong>
                            </Typography>
                            <Typography variant="body2">
                                <strong>工作內容:</strong> 協助教授講解線性代數課程內容，解答學生疑問，並提供課後輔導。
                            </Typography>
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <Typography variant="h6">線性代數助教</Typography>
                            <Typography variant="subtitle1">2023年9月 - 2024年1月</Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>助教</strong>
                            </Typography>
                            <Typography variant="body2">
                                <strong>工作內容:</strong> 協助教授講解線性代數課程內容，解答學生疑問，並提供課後輔導。
                            </Typography>
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <Typography variant="h6">線性代數助教</Typography>
                            <Typography variant="subtitle1">2023年9月 - 2024年1月</Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>助教</strong>
                            </Typography>
                            <Typography variant="body2">
                                <strong>工作內容:</strong> 協助教授講解線性代數課程內容，解答學生疑問，並提供課後輔導。
                            </Typography>
                        </Box>
                    </Paper>

                    <Paper
                        elevation={3}
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
                    <Paper
                        elevation={3}
                        sx={{ padding: 2, marginBottom: 2 }}
                        id="學業表現"
                        onMouseEnter={() => setActiveSection("學業表現")}
                    >
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
                        <ul>
                            <li>國立彰化師範大學附屬高級工業職業學校 控制科</li>
                            <li>國立高雄科技大學 電腦與通訊工程系</li>
                            <li>國立陽明交通大學 數據科學與工程研究所</li>
                        </ul>
                    </Paper>
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
