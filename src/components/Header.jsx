import React, { useState, useEffect, useContext } from "react";
import { ThemeContext, LanguageContext } from "../App";
import { useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
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
import InputBase from "@mui/material/InputBase";
import { Link } from "react-router-dom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { ListItemIcon, Tooltip, Slide } from '@mui/material';
// icon
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import BookIcon from '@mui/icons-material/Book';
import CloseIcon from '@mui/icons-material/Close';
// CSS 
import "./css/Header.css";

// 引入圖片
import ycChanImage from "../images/person.png";
// 動態
import DynamicBreadcrumbs from "./DynamicBreadcrumbs"


const options = ["首頁", "關於我", "設定", "幫助"]; // for Header [Autocomplete]

const Header = () => {
    const location = useLocation();
    const { theme } = useContext(ThemeContext);
    const { language } = useContext(LanguageContext); // 主題狀態
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width: 965px)");
    const handleClickAway = () => setSearchopen(false);
    const handleFocus = () => setSearchopen(true);
    const [Searchopen, setSearchopen] = useState(false);
    const [dynamicBreadcrumbsOpen, setDynamicBreadcrumbsOpen] = useState(true);
    const [activePage, setActivePage] = useState(() => { return location.pathname; });
    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setDrawerOpen(open);
    };


    // 選單項目或空白區域點擊時，關閉選單
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

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between", // 讓標題與關閉按鈕分開
                    alignItems: "center",
                    padding: "10px 15px",
                    backgroundColor: theme === "light" ? "#f5f5f5" : "#222",
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: 'bold',
                        textAlign: isMobile ? 'center' : 'left',
                        alignItems: 'center',
                        display: 'flex',
                        gap: 1,
                    }}
                >

                    <img
                        src={`${process.env.PUBLIC_URL}/logo.png`}
                        alt="詹宇宸"
                        style={{
                            maxWidth: '50px',
                            width: '50px',
                            borderRadius: "10px"

                        }}
                    />
                    YC-Chan
                </Typography>
                <IconButton onClick={toggleDrawer(false)} sx={{ color: theme === "light" ? "#000" : "#fff" }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider sx={{ backgroundColor: theme === "light" ? "black" : "white" }} />

            <Box sx={{ paddingTop: '20px', paddingLeft: '10px', paddingRight: '10px', paddingBottom: '20px' }}>
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
            <List>

                <ListItem disablePadding sx={{ paddingTop: '2px', paddingLeft: '5px', paddingRight: '5px', paddingBottom: '2px' }}>
                    <ListItemButton
                        onClick={toggleDrawer(false)}
                        component={Link}
                        to="/"
                        sx={{
                            color: theme === 'light' ? 'black' : 'white',
                            bgcolor: activePage === "/" ? (theme === 'light' ? '#e0e0e0' : '#555') : 'transparent',
                            border: activePage === "/" ? '1px solid' : 'none',
                            borderColor: activePage === "/" ? (theme === 'light' ? '#888' : '#aaa') : 'none',
                            borderRadius: activePage === "/" ? '8px' : '0',
                            '&:hover': {
                                backgroundColor: theme === 'light' ? '#f0f0f0' : '#444',
                            },
                            // 增加過渡動畫
                            transition: 'background-color 0.2s ease-in-out',
                        }}
                    >
                        <ListItemIcon sx={{ color: 'inherit' }}>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="首頁" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ paddingTop: '2px', paddingLeft: '5px', paddingRight: '5px', paddingBottom: '2px' }}>
                    <ListItemButton
                        onClick={toggleDrawer(false)}
                        component={Link}
                        to="/about-me"
                        sx={{
                            color: theme === 'light' ? 'black' : 'white',
                            bgcolor: activePage === "/about-me" ? (theme === 'light' ? '#e0e0e0' : '#555') : 'transparent',
                            border: activePage === "/about-me" ? '1px solid' : 'none',
                            borderColor: activePage === "/about-me" ? (theme === 'light' ? '#888' : '#aaa') : 'none',
                            borderRadius: activePage === "/about-me" ? '8px' : '0',
                            '&:hover': {
                                backgroundColor: theme === 'light' ? '#f0f0f0' : '#444',
                            },
                            transition: 'background-color 0.2s ease-in-out',
                        }}
                    >
                        <ListItemIcon sx={{ color: 'inherit' }}>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="關於我" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ paddingTop: '2px', paddingLeft: '5px', paddingRight: '5px', paddingBottom: '2px' }}>
                    <ListItemButton
                        onClick={toggleDrawer(false)}
                        component={Link}
                        to="/contact-me"
                        sx={{
                            color: theme === 'light' ? 'black' : 'white',
                            bgcolor: activePage === "/contact-me" ? (theme === 'light' ? '#e0e0e0' : '#555') : 'transparent',
                            border: activePage === "/contact-me" ? '1px solid' : 'none',
                            borderColor: activePage === "/contact-me" ? (theme === 'light' ? '#888' : '#aaa') : 'none',
                            borderRadius: activePage === "/contact-me" ? '8px' : '0',
                            '&:hover': {
                                backgroundColor: theme === 'light' ? '#f0f0f0' : '#444',
                            },
                            transition: 'background-color 0.2s ease-in-out',
                        }}
                    >
                        <ListItemIcon sx={{ color: 'inherit' }}>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary="聯絡我" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ paddingTop: '2px', paddingLeft: '5px', paddingRight: '5px', paddingBottom: '2px' }}>
                    <ListItemButton
                        onClick={toggleDrawer(false)}
                        component={Link}
                        to="/note"
                        sx={{
                            color: theme === 'light' ? 'black' : 'white',
                            bgcolor: !(activePage === "/" || activePage === "/about-me" || activePage === "/contact-me") ? (theme === 'light' ? '#e0e0e0' : '#555') : 'transparent',
                            border: !(activePage === "/" || activePage === "/about-me" || activePage === "/contact-me") ? '1px solid' : 'none',
                            borderColor: !(activePage === "/" || activePage === "/about-me" || activePage === "/contact-me") ? (theme === 'light' ? '#888' : '#aaa') : 'none',
                            borderRadius: !(activePage === "/" || activePage === "/about-me" || activePage === "/contact-me") ? '8px' : '0',
                            '&:hover': {
                                backgroundColor: theme === 'light' ? '#f0f0f0' : '#444',
                            },
                            transition: 'background-color 0.2s ease-in-out',
                        }}
                    >
                        <ListItemIcon sx={{ color: 'inherit' }}>
                            <BookIcon />
                        </ListItemIcon>
                        <ListItemText primary="筆記" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box >
    );
    // 設置當前選中的頁面
    useEffect(() => {
        setActivePage(location.pathname);
        setDynamicBreadcrumbsOpen(true);
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY === 0) {
                setDynamicBreadcrumbsOpen(true); // 向上滾動，顯示
            } else if (currentScrollY < prevScrollY.current) {
                setDynamicBreadcrumbsOpen(true); // 向上滾動，顯示
            } else {
                setDynamicBreadcrumbsOpen(false); // 向下滾動，隱藏
            }
            prevScrollY.current = currentScrollY;
        };

        const prevScrollY = { current: window.scrollY };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function ElevationScroll(props) {
        const { children } = props;
        const trigger = useScrollTrigger({
            threshold: 0, // 在滾動多少像素後觸發
        });
        return React.cloneElement(children, {
            sx: {
                backgroundColor: "#222222", //控制 Header 背景顏色
                opacity: trigger ? 0.85 : 1, // 根據滾動位置改變透明度
                transition: "opacity 0.3s", // 平滑過渡效果
            },
        });
    }
    return (
        <div >
            <ElevationScroll>
                <AppBar position="fixed" >
                    <Container maxWidth='1'>
                        <Toolbar >
                            {isMobile && (
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    sx={{
                                        mr: 2,
                                        display: { xs: "block" }, // 小螢幕顯示，桌機隱藏
                                    }}
                                    onClick={toggleDrawer(true)}
                                >
                                    {drawerOpen ? <CloseIcon /> : <MenuIcon />}
                                </IconButton>
                            )}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    gap: 2,
                                    flexGrow: 1,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{
                                        fontWeight: 'bold',
                                        textAlign: isMobile ? 'center' : 'left',
                                    }}
                                >
                                    <a
                                        href="https://solar224.github.io/CYC/#/"
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <img
                                            src={`${process.env.PUBLIC_URL}/logo.png`}
                                            alt="詹宇宸"
                                            style={{
                                                maxWidth: '50px',
                                                width: '50px',
                                                borderRadius: "10px"

                                            }}
                                        />
                                        YC-Chan
                                    </a>
                                </Typography>
                            </Box>
                            {!isMobile && (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Button
                                        color="inherit"
                                        variant={activePage === "/" ? "outlined" : "text"}
                                        component={Link}
                                        to=""
                                        sx={{
                                            color: activePage === "/" ? "white" : "rgba(255, 255, 255, 0.8)",
                                            textTransform: "none",
                                            minWidth: 70,
                                            "&:hover": {
                                                bgcolor: "rgba(255,255,255,0.1)",
                                            },
                                        }}
                                    >
                                        首頁
                                    </Button>

                                    <Button
                                        color="inherit"
                                        variant={activePage === "/about-me" ? "outlined" : "text"}
                                        component={Link}
                                        to="/about-me"
                                        sx={{
                                            color: activePage === "/about-me" ? "white" : "rgba(255, 255, 255, 0.8)",
                                            textTransform: "none",
                                            minWidth: 75,
                                            "&:hover": {
                                                bgcolor: "rgba(255,255,255,0.1)",
                                            },
                                        }}
                                    >
                                        關於我
                                    </Button>

                                    <Button
                                        color="inherit"
                                        variant={activePage === "/contact-me" ? "outlined" : "text"}
                                        component={Link}
                                        to="/contact-me"
                                        sx={{
                                            color: activePage === "/contact-me" ? "white" : "rgba(255, 255, 255, 0.8)",
                                            textTransform: "none",
                                            minWidth: 70,
                                            "&:hover": {
                                                bgcolor: "rgba(255,255,255,0.1)",
                                            },
                                        }}
                                    >
                                        聯絡
                                    </Button>

                                    <Button
                                        color="inherit"
                                        variant={!(activePage === "/" || activePage === "/about-me" || activePage === "/contact-me") ? "outlined" : "text"}
                                        sx={{
                                            color: !(activePage === "/" || activePage === "/about-me" || activePage === "/contact-me") ? "white" : "rgba(255, 255, 255, 0.8)",
                                            minWidth: 70,
                                            textTransform: "none",
                                            "&:hover": {
                                                bgcolor: "rgba(255,255,255,0.1)",
                                            },
                                        }}
                                        component={Link}
                                        to="/note"
                                    >
                                        筆記
                                    </Button>
                                    <Autocomplete
                                        size="small"
                                        disablePortal
                                        options={options}
                                        sx={{
                                            width: 300,
                                            "& .MuiOutlinedInput-root": {
                                                // "& fieldset": {
                                                //     borderColor: "white",
                                                // },
                                                "&:hover fieldset": {
                                                    borderColor: "white",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "white",
                                                },
                                            },
                                            "& .MuiInputBase-input": {
                                                color: "white",
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: "white", // 未上移時半透明白色
                                            },
                                            "& .MuiInputLabel-root.Mui-focused": {
                                                color: "white", // 聚焦時label白色
                                            },
                                            "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                                                color: "rgba(255,255,255,0.7)", // 上移後固定白色
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
                                        <Tooltip title={(language === "zh" ? "詹宇宸" : "YC-chen")} placement="bottom">
                                            <img
                                                src={ycChanImage} // 自定義圖片 URL
                                                style={{
                                                    width: "100%", // 圖片寬度填滿框
                                                    height: "100%", // 圖片高度填滿框
                                                    objectFit: "cover", // 確保圖片比例正確
                                                }}
                                                alt=""
                                            />
                                        </Tooltip>
                                    </Box>
                                    {/* <Avatar alt="Remy Sharp" src={ycChanImage} /> */}

                                </Box>
                            )}
                        </Toolbar>
                    </Container>
                </AppBar>
            </ElevationScroll>
            {/* 手機 */}
            <Slide direction="down" in={dynamicBreadcrumbsOpen} mountOnEnter unmountOnExit>
                <Tooltip title="索引導覽" placement="bottom">
                    <Box
                        style={{
                            position: 'fixed',
                            top: 70,
                            left: 2,
                            marginRight: 5,
                            backgroundColor: theme === "dark" ? 'rgba(34, 34, 34, 0.85)' : 'rgba(34, 34, 34, 0.85)',
                            padding: '4px 8px',
                            borderRadius: "10px",
                            zIndex: 1,
                        }}
                    >
                        <DynamicBreadcrumbs activePage={activePage} />
                    </Box>
                </Tooltip>
            </Slide>


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