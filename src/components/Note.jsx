import React, { useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { ThemeContext, LanguageContext } from "../App";
import { Link } from "react-router-dom";

const notes = [
    {
        title: "學校課程",
        image: "/images/school.jpg",
        link: "./school-curriculum"
    },
    {
        title: "程式練習",
        image: "/images/coding.jpg",
        link: "./coding-practice"
    },
    {
        title: "英文練習",
        image: "/images/english.jpg",
        link: "./english-practice"
    }
];

const Note = () => {
    const { theme } = useContext(ThemeContext);
    const themeObject = createTheme({ palette: { mode: theme === "light" ? "light" : "dark" } });

    return (
        <ThemeProvider theme={themeObject}>
            <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                <Grid container spacing={10} sx={{ my: 4 }}>
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
