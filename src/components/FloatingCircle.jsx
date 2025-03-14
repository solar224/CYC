import React, { useEffect, useState, useContext } from "react";
import "./css/FloatingCircle.css";
import { ThemeContext, LanguageContext } from "../App";
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


// icon
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { SnackbarProvider, useSnackbar } from 'notistack';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function FloatingCircle() {
    const [isOpen, setIsOpen] = useState(() => { return localStorage.getItem('isOpen') || 0 }); // 管理第二個圓圈是否展開的狀態
    const [showScrollToTop, setShowScrollToTop] = useState(false); // 控制是否顯示滾動到頂部按鈕
    const [isClosing, setIsClosing] = useState(false); // 用於追踪收起動畫
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { language, toggleLanguage } = useContext(LanguageContext);
    const [isOneHovered, setIsOneHovered] = useState(false);
    const [isTwoHovered, setIsTwoHovered] = useState(false);
    const [loclang, setLoclang] = useState(language);
    const [loctheme, setLocTheme] = useState(theme);
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);



    // 第二按紐
    const handSetOpen = () => {
        setOpen(true);
        setLoclang(language);
        setLocTheme(theme);
    }
    const handleClickLocLang = (p) => {
        setLoclang(p);
    };
    const handClickloctheme = (p) => {
        setLocTheme(p);
    }
    const handSetting = () => {
        if (loclang != language) toggleLanguage();
        if (loctheme != theme) toggleTheme();
        handleClose();
        enqueueSnackbar((language === 'en' ? "🚀 The settings were successfully modified." : "🚀 成功修改設定。"),
            {
                variant: "success",
                autoHideDuration: 3000,

            });
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleScrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); };
    const toggleSettings = () => {
        if (isOpen === 1) {
            // 先觸發收起動畫
            setIsClosing(true);
            setTimeout(() => {
                setIsOpen(0); // 在動畫結束後實際關閉
                setIsClosing(false);
            }, 300); // 與動畫時長一致
        } else {
            setIsOpen(1);
        }
    };
    useEffect(() => {
        // 當 activePage 變化時，將其儲存到 localStorage
        localStorage.setItem("isOpen", isOpen);
    }, [isOpen]);
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY; // 目前捲動的垂直位置
            // 判斷是否顯示 "返回頂部" 按鈕（當滾動超過 50px 才顯示）
            setShowScrollToTop(currentScrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <SnackbarProvider maxSnack={3}>

            <div
                className="floating-circle-container"
                style={{
                    bottom: "10px", paddingRight: "10px",
                    position: "sticky",
                    marginTop: "-120px", // 調整負數來讓元素向上移動與其他元件重疊
                }}
            >
                {/* 第一個圓圈：滾動到頁面頂部，根據 showScrollToTop 判斷是否顯示 */}
                <Tooltip title="回到最上面" placement="left">
                    <div
                        className={`floating-circle scroll-to-top-circle ${showScrollToTop ? "visible" : ""
                            }`}
                        style={{
                            transform: showScrollToTop
                                ? "translateY(0px)" // 從第二顆圓圈向上滑出
                                : "translateY(70px)", // 回到第二顆圓圈位置
                            opacity: showScrollToTop ? 1 : 0, // 控制透明度
                        }}
                        onMouseEnter={() => setIsOneHovered(true)}  // 滑鼠進入時切換
                        onMouseLeave={() => setIsOneHovered(false)} // 滑鼠離開時恢復

                        onClick={handleScrollToTop}
                    >
                        {isOneHovered ? (
                            <KeyboardDoubleArrowUpIcon className="icon" sx={{ fontSize: 30 }} />
                        ) : (
                            <KeyboardArrowUpIcon className="icon" sx={{ fontSize: 30 }} />
                        )}
                    </div>
                </Tooltip>
                {/* 第二個圓圈：設置按鈕 */}
                <Tooltip title={language === 'en' ? "setting" : "設定"} placement="left">
                    <div
                        className={`floating-circle settings-circle`}
                        onClick={() => handSetOpen(true)}
                        onMouseEnter={() => setIsTwoHovered(true)}  // 滑鼠進入時切換
                        onMouseLeave={() => setIsTwoHovered(false)} // 滑鼠離開時恢復
                    >
                        {isTwoHovered ? <SettingsRoundedIcon className="icon" sx={{ fontSize: 30 }} /> : <SettingsIcon className="icon" />}
                    </div>
                </Tooltip>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    fullWidth={1}
                    aria-describedby="alert-dialog-slide-description"
                    disableScrollLock
                    PaperProps={{
                        sx: {
                            backgroundColor: theme === 'dark' ? '#333' : '#fff',
                            color: theme === 'dark' ? '#fff' : '#000',
                        },
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handSetting();
                        }
                    }}
                >
                    <DialogTitle>{language === 'en' ? "🔧setting" : "🔧設定"}</DialogTitle>
                    <DialogContent >
                        <DialogContentText id="alert-dialog-slide-description" component="div">

                            <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                                <Typography variant="body1"
                                    sx={{
                                        mr: 1, color: theme === 'dark' ? '#ffffff' : '#000000'
                                    }} >
                                    {language === "zh" ? "顯示語言：" : "顯示語言："}
                                </Typography>
                                <Button color="success" onClick={() => handleClickLocLang('zh')} variant={loclang === "zh" ? "contained" : "outlined"} sx={{ mr: 1 }}>
                                    中文
                                </Button>
                                <Button color="success" onClick={() => handleClickLocLang('en')} variant={loclang === "en" ? "contained" : "outlined"}  >
                                    英文
                                </Button>

                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                                <Typography variant="body1"
                                    sx={{
                                        mr: 1, color: theme === 'dark' ? '#ffffff' : '#000000'
                                    }}>
                                    {language === "zh" ? "背景顏色：" : "背景顏色："}
                                </Typography>
                                <Button color="success" onClick={() => handClickloctheme('dark')} variant={loctheme === "dark" ? "contained" : "outlined"} sx={{ mr: 1 }}>
                                    深色
                                </Button>
                                <Button color="success" onClick={() => handClickloctheme('light')} variant={loctheme === "light" ? "contained" : "outlined"} >
                                    淺色
                                </Button>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                                <Typography variant="body1" sx={{ mr: 1, color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                                    {language === "zh" ? "文字大小：" : "文字大小："}
                                </Typography>
                                <Button color="success" variant="outlined" sx={{ mr: 1 }}>
                                    大
                                </Button>
                                <Button color="success" variant="outlined" sx={{ mr: 1 }}>
                                    中
                                </Button>
                                <Button color="success" variant="outlined">
                                    小
                                </Button>
                            </Box>


                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"outlined"} color="secondary" onClick={handleClose}>{language === 'en' ? "Cancel" : "取消"}</Button>
                        <Button variant={"contained"} color="success" onClick={handSetting}>{language === 'en' ? "Agree" : "確認"}</Button>
                    </DialogActions>
                </Dialog>
            </div >
        </SnackbarProvider>
    );

}
{/* 控制語言 (中、英) */ }
{/* <div className="floating-circle extra-circle">
                            <Tooltip title={(language === "zh" ? "中文" : "英文")} placement="left">
                                <div
                                    onClick={toggleLanguage}
                                    style={{
                                        backgroundColor: theme === "zh" ? "#555" : "#555",
                                        color: theme === "zh" ? "#555" : "#555",
                                        borderRadius: "50%",
                                        width: "47px",
                                        height: "47px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    {language === "zh" ? <GTranslateIcon className="icon-GTranslateIcon" /> : <AbcIcon className="icon-AbcIconIcon" />}
                                </div>
                            </Tooltip>
                        </div> */}
{/* 控制背景 (暗、亮) */ }
{/* <div className="floating-circle extra-circle">
                            <Tooltip title={(theme === "light" ? "淺色" : "深色")} placement="left">
                                <div
                                    onClick={toggleTheme}
                                    style={{
                                        backgroundColor: theme === "light" ? "#fff" : "#555",
                                        color: theme === "light" ? "#555" : "#fff",
                                        borderRadius: "50%",
                                        width: "47px",
                                        height: "47px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    {theme === "light" ? <LightModeIcon className="icon-LightModeIcon" /> : <NightlightIcon className="icon-NightlightIcon" />}
                                </div>
                            </Tooltip>
                        </div> */}
