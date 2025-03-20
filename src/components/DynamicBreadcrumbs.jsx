//***********************************************************************
// header：URL links
// 
//parameter：activePage (URL strings)
//
//***********************************************************************
import { Breadcrumbs, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


export default function DynamicBreadcrumbs({ activePage }) {
    const pathnames = activePage.split('/').filter(x => x);
    const nameMap = {
        "about-me": "關於我",
        "contact-me": "聯絡",
        "note": "筆記",

        "school-curriculum": "學校課程",
        "coding-practice": "程式練習",
        "other-practice": "其他",
    };
    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" sx={{ color: '#AAAAAA', margin: "0px" }} // 這裡設定顏色
            />}
            aria-label="breadcrumb" >
            <Button component={RouterLink} underline="hover" color="inherit" to="/" sx={{ color: '#FFFFFF', minWidth: '0px' }}>
                首頁
            </Button>
            {
                pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                        <Button
                            key={routeTo}
                            underline="hover"
                            sx={{
                                color: "#f39212",
                            }}>
                            {nameMap[name] || name}
                        </Button>
                    ) : (
                        <Button
                            component={RouterLink}
                            underline="hover"
                            to={routeTo}
                            key={routeTo}
                            sx={{
                                color: '#FFFFFF',
                                margin: "0px",
                            }}>
                            {nameMap[name] || name}
                        </Button>
                    );
                })
            }
        </Breadcrumbs >
    )
}
