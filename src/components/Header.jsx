import React, { useState, useEffect, useContext } from "react";
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
import "./css/Header.css"; // 確保引入了相應的 CSS 文件
import useScrollTrigger from "@mui/material/useScrollTrigger";
import ycChanImage from "../images/YC-Chan_image.jpg"; // 引入圖片

const API = "http://localhost:5000/api";
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
const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));
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

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const isMobile = useMediaQuery("(max-width: 900px)");
    const isMobile_els = useMediaQuery("(max-width: 1250px)");
    const [activePage, setActivePage] = useState(() => {
        // 從 localStorage 讀取資料，初始值為空字串
        return localStorage.getItem("activePage") || "";
    });
    const handlePageClick = (page) => {
        setActivePage(page); // 設置當前選中的頁面
    };
    // 當點擊事件發生時，讓正方形隨機移動與旋轉
    const handleClick = () => {
        anime({
            targets: ".el",
            translateX: () => anime.random(15, 285),
            translateY: () => anime.random(15, 35),
            rotate: () => anime.random(0, 360),
            duration: 1000,
            easing: "easeInOutQuad",
        });
        setIsClicked(!isClicked); // 切換點擊狀態
    };

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerContent = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
        >
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                />
            </Search>
            <List>
                {["關於我", "聯絡"].map((text, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton component="a" href={`#${text.toLowerCase()}`}>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );
    useEffect(() => {
        // 當 activePage 變化時，將其儲存到 localStorage
        localStorage.setItem("activePage", activePage);
    }, [activePage]);
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
                                *YC-Chan websites
                            </Typography>
                            {!isMobile_els && (
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: "300px",
                                        height: "50px",
                                        border: "0px solid #000",
                                        overflow: "hidden",
                                    }}
                                    onClick={handleClick}
                                >
                                    {/* 創建三個小正方形 */}
                                    {Array(8)
                                        .fill()
                                        .map((_, index) => (
                                            <Tooltip key={index} title={els[index]} arrow>
                                                <div
                                                    className="el"
                                                    style={{
                                                        position: "absolute",
                                                        width: "10px",
                                                        height: "10px",
                                                        backgroundColor: "green",
                                                    }}
                                                ></div>
                                            </Tooltip>
                                        ))}
                                </Box>
                            )}

                            {!isMobile && (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Button
                                        color="inherit"
                                        component={Link}
                                        to=""
                                        sx={{
                                            textTransform: "none",
                                            color: activePage === "" ? "yellow" : "white",
                                            fontWeight: activePage === "" ? "bold" : "",
                                            fontSize: activePage === "" ? "1.02rem" : "1rem",
                                        }}
                                        onClick={() => handlePageClick("")}
                                    >
                                        首頁
                                    </Button>
                                    <Button
                                        color="inherit"
                                        component={Link}
                                        to="/Aboutme"
                                        sx={{
                                            textTransform: "none",
                                            color: activePage === "Aboutme" ? "yellow" : "white",
                                            fontWeight: activePage === "Aboutme" ? "bold" : "",
                                            fontSize: activePage === "Aboutme" ? "1.02rem" : "1rem",

                                        }}
                                        onClick={() => handlePageClick("Aboutme")}
                                    >
                                        關於我
                                    </Button>
                                    <Button
                                        color="inherit"
                                        component={Link}
                                        to="/Contactme"
                                        sx={{
                                            textTransform: "none",
                                            color: activePage === "Contactme" ? "yellow" : "white",
                                            fontWeight: activePage === "Contactme" ? "bold" : "",
                                            fontSize: activePage === "Contactme" ? "1.02rem" : "1rem",

                                        }}
                                        onClick={() => handlePageClick("Contactme")}
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
                                                label="網站資訊"
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
                                </Box>
                            )}
                        </Toolbar>
                    </Container>
                </AppBar>
            </ElevationScroll>
            {/* 手機板未完成 */}
            {/* <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer> */}
        </div>
    );
};
export default Header;