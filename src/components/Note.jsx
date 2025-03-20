import React, { useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Skeleton, Box } from "@mui/material";
import { ThemeContext, LanguageContext } from "../App";
import { Link } from "react-router-dom";

const notes = [
    {
        title: "學校課程",
        image: `${process.env.PUBLIC_URL}/coding.gif`,
        link: "./school-curriculum"
    },
    {
        title: "程式練習",
        image: `${process.env.PUBLIC_URL}/coding.gif`,
        link: "./coding-practice"
    },
    {
        title: "其他",
        image: `${process.env.PUBLIC_URL}/coding.gif`,
        link: "./other-practice"
    }
];

const Note = () => {
    const { theme } = useContext(ThemeContext);
    const themeObject = createTheme({ palette: { mode: theme === "light" ? "light" : "dark" } });

    return (

        <ThemeProvider theme={themeObject}>
            <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                <Grid container sx={{ my: 4 }}>
                    <Card
                        sx={{
                            width: "100%",
                            height: "600px",
                            borderRadius: 2,
                            backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.85)" : "rgba(3, 3, 3, 0.85)",
                            overflow: "hidden",
                            position: "relative", // 讓 Skeleton 可以絕對定位覆蓋 iframe
                            p: 0
                        }}
                    >
                        {/* iframe 行事曆 */}


                        {/* Skeleton 加載動畫，疊加在 `iframe` 上 */}
                        <iframe src="https://nervous-planet-079.notion.site/ebd/1bcc0d33e7e58026a538cf2a156b291d" width="100%" height="600" frameborder="0" />



                    </Card>
                </Grid>
                <Grid container spacing={3} sx={{ my: 4 }}>
                    {notes.map((note, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <Card>
                                <CardActionArea component={Link} to={note.link}>
                                    <CardMedia component="img" height="140" image={note.image} alt={note.title} />
                                    <CardContent>
                                        <Typography variant="h6" align="center">{note.title}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default Note;
