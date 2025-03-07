//***********************************************************************
// header：URL links
// 
//parameter：activePage (URL strings)
//
//***********************************************************************
import React, { useState, useEffect, useContext } from "react";
import { Breadcrumbs, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function DynamicBreadcrumbs({ activePage }) {
    const pathnames = activePage.split('/').filter(x => x);
    const nameMap = {
        "about-me": "關於我",
        "contact-me": "聯絡",
        "school-curriculum": "學校課程",
        "procedural-exercises": "程式練習",
        "english-practice": "英文練習",
    };
    return (
        <Breadcrumbs aria-label="breadcrumb" >
            {/* 在這裡增加一個 "/" */}
            <Button component={RouterLink} underline="hover" color="inherit" to="/" sx={{ color: '#AAAAAA', minWidth: '0px' }}>
                首頁
            </Button>
            {
                pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                        <Typography key={routeTo} underline="hover" sx={{ color: '#28a745', minWidth: '0px' }}>
                            {nameMap[name] || name}
                        </Typography>
                    ) : (
                        <Button component={RouterLink} underline="hover" color="inherit" to={routeTo} key={routeTo} sx={{ color: '#AAAAAA', minWidth: '0px' }}>
                            {nameMap[name] || name}
                        </Button>
                    );
                })
            }
        </Breadcrumbs >
    )
}
