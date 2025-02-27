import React, { useState, useEffect, useContext } from "react";
import { ThemeContext, LanguageContext } from "../App";
import { useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import anime from "animejs/lib/anime.es.js";
import axios from "axios";
import { Card, CardMedia, CardContent } from "@mui/material";
import { CardHeader, CardActions, Collapse } from "@mui/material";
import { Link } from "react-router-dom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import ClickAwayListener from '@mui/material/ClickAwayListener';

// 確保引入了相應的 CSS 文件
import "./css/Header.css";

// 引入圖片
import ycChanImage from "../images/YC-Chan_image.jpg";
const options = ["首頁", "關於我", "設定", "幫助"]; // for Header [Autocomplete]
function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        threshold: 0, // 在滾動多少像素後觸發
    });

    return React.cloneElement(children, {
        sx: {
            backgroundColor: "#24292e",
            opacity: trigger ? 0.85 : 1, // 根據滾動位置改變透明度
            transition: "opacity 0.3s", // 平滑過渡效果
        },
    });
}
const Header = () => {
    const location = useLocation();
    const { theme } = useContext(ThemeContext);
    const { language } = useContext(LanguageContext); // 主題狀態
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width: 900px)");
    const isMobile_els = useMediaQuery("(max-width: 1250px)");
    const [activePage, setActivePage] = useState(() => {
        return location.pathname;
    });
    const handleClickAway = () => setSearchopen(false);
    const handleFocus = () => setSearchopen(true);
    const [Searchopen, setSearchopen] = useState(false);

    // 設置當前選中的頁面
    useEffect(() => {
        setActivePage(location.pathname);
    }, [location.pathname]);
    // 當點擊事件發生時，讓正方形隨機移動與旋轉
    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    const Search = styled('div')(({ theme, open }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        border: '1px solid #333333', // 外圍增加黑色邊框
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        width: open ? '100%' : '40px', // 未點擊時顯示圖示，點擊後展開
        display: 'flex',
        alignItems: 'center',
        transition: theme.transitions.create('width', {
            duration: '500ms', // 延長動畫持續時間
            easing: theme.transitions.easing.easeInOut, // 設置動畫緩和效果
        }),
    }));

    const SearchIconWrapper = styled('div')({
        padding: '0 10px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer', // 讓搜尋圖示可點擊
    });

    const StyledInputBase = styled(InputBase)(({ theme, open }) => ({
        color: 'inherit',
        width: open ? '100%' : '0', // 點擊時展開，未點擊時隱藏
        opacity: open ? 1 : 0, // 未點擊時輸入框透明
        transition: theme.transitions.create(['width', 'opacity'], {
            duration: '500ms', // 延長動畫持續時間
            easing: theme.transitions.easing.easeInOut, // 設置動畫緩和效果
        }),
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: open ? theme.spacing(1) : 0, // 確保 padding 在展開時生效
        },
    }));

    const drawerContent = (
        <Box
            sx={{
                width: 250,
                backgroundColor: theme === "light" ? "#ffffff" : "#333333", // 根據theme設置背景顏色
                color: theme === 'light' ? 'black' : 'white', // 根據theme設置文字顏色
            }}
            role="presentation"
        >
            <Box sx={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Search open={Searchopen}>
                        <SearchIconWrapper onClick={handleFocus}>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            open={Searchopen}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onFocus={handleFocus}
                        />
                    </Search>
                </ClickAwayListener>
            </Box>
            <Box onClick={toggleDrawer(false)}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            component={Link}
                            to=""
                            sx={{
                                color: theme === 'light' ? 'black' : 'white',
                                '&:hover': {
                                    backgroundColor: theme === 'light' ? '#f0f0f0' : '#444',
                                },
                            }}
                        >
                            <ListItemText primary="首頁" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            component={Link}
                            to="/Aboutme"
                            sx={{
                                color: theme === 'light' ? 'black' : 'white',
                                '&:hover': {
                                    backgroundColor: theme === 'light' ? '#f0f0f0' : '#444',
                                },
                            }}
                        >
                            <ListItemText primary="關於我" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            component={Link}
                            to="/Contactme"
                            sx={{
                                color: theme === 'light' ? 'black' : 'white',
                                '&:hover': {
                                    backgroundColor: theme === 'light' ? '#f0f0f0' : '#444',
                                },
                            }}
                        >
                            <ListItemText primary="聯絡我" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider sx={{ backgroundColor: theme === 'light' ? 'black' : 'white' }} /> {/* 根據theme設置分隔線顏色 */}
            </Box>
        </Box >
    );

    useEffect(() => {
        // 初始隨機設置三個小正方形的位置與角度
        anime.set(".el", {
            translateX: () => anime.random(15, 285), // 隨機生成 X 軸位置
            translateY: () => anime.random(15, 35), // 隨機生成 Y 軸位置
            rotate: () => anime.random(0, 360), // 隨機角度
        });
    }, [isMobile_els]);
    return (
        <div >
            <ElevationScroll>
                <AppBar position="fixed">
                    <Container maxWidth='1'>
                        <Toolbar >
                            <IconButton
                                edge="start"
                                color="inherit"
                                sx={{
                                    mr: 2,
                                    display: { xs: "block", md: "none" }, // 小螢幕顯示，桌機隱藏
                                }}
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    flexGrow: 1,
                                    fontWeight: "bold",
                                    textAlign: isMobile ? "center" : "left",
                                }}
                            >
                                <a href="https://solar224.github.io/CYC/#/" style={{ textDecoration: "none", color: "inherit" }}>
                                    YC-Chan websites
                                </a>
                            </Typography>
                            {!isMobile && (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Button
                                        color="inherit"
                                        component={Link}
                                        to=""
                                        sx={{
                                            textTransform: "none",
                                            color: activePage === "/" ? "yellow" : "white",
                                            fontWeight: activePage === "/" ? "bold" : "",
                                            fontSize: activePage === "/" ? "1.02rem" : "1rem",
                                        }}
                                    >
                                        首頁
                                    </Button>
                                    <Button
                                        color="inherit"
                                        component={Link}
                                        to="/Aboutme"
                                        sx={{
                                            textTransform: "none",
                                            color: activePage === "/Aboutme" ? "yellow" : "white",
                                            fontWeight: activePage === "/Aboutme" ? "bold" : "",
                                            fontSize: activePage === "/Aboutme" ? "1.02rem" : "1rem",
                                        }}
                                    >
                                        關於我
                                    </Button>
                                    <Button
                                        color="inherit"
                                        component={Link}
                                        to="/Contactme"
                                        sx={{
                                            textTransform: "none",
                                            color: activePage === "/Contactme" ? "yellow" : "white",
                                            fontWeight: activePage === "/Contactme" ? "bold" : "",
                                            fontSize: activePage === "/Contactme" ? "1.02rem" : "1rem",
                                        }}
                                    >
                                        聯絡
                                    </Button>
                                    <Autocomplete
                                        size="small"
                                        disablePortal
                                        options={options}
                                        sx={{
                                            width: 300,
                                            ".MuiInputBase-input": {
                                                color: "white", // 修改輸入框文字顏色為白色
                                            },
                                            ".MuiInputLabel-root": {
                                                color: "white", // 修改標籤顏色為白色
                                            },
                                            // ".MuiOutlinedInput-notchedOutline": {
                                            //   borderColor: "gray", // 修改輸入框外框顏色為白色
                                            // },
                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "white", // 滑鼠懸停時外框保持白色
                                            },
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Search..."
                                                label="資訊查詢"
                                            />
                                        )}
                                    />
                                    <Box
                                        sx={{
                                            width: 40, // 圓框寬度
                                            height: 40, // 圓框高度
                                            borderRadius: "50%", // 圓形
                                            border: "1px solid white", // 邊框顏色與大小
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            overflow: "hidden", // 確保圖片不超出邊框
                                            backgroundColor: "gray", // 圓框背景顏色（無圖片時）
                                        }}
                                    >
                                        <img
                                            src={ycChanImage} // 自定義圖片 URL
                                            style={{
                                                width: "100%", // 圖片寬度填滿框
                                                height: "100%", // 圖片高度填滿框
                                                objectFit: "cover", // 確保圖片比例正確
                                            }}
                                            alt=""
                                        />
                                    </Box>
                                    {/* <Avatar alt="Remy Sharp" src={ycChanImage} /> */}

                                </Box>
                            )}
                        </Toolbar>
                    </Container>
                </AppBar>
            </ElevationScroll>
            {/* 手機板未完成 */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    "& .MuiDrawer-paper": {
                        backgroundColor: theme === "light" ? "#ffffff" : "#333333", // 根據 theme 設置背景色
                        color: theme === "light" ? "#000000" : "#ffffff", // 設置文字顏色
                    },
                }}
            >
                {drawerContent}
            </Drawer>

        </div >
    );
};
export default Header;