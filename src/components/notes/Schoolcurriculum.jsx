import React from "react";
import { Grid, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Schoolcurriculum = () => {
    return (

        <div
            className="Schoolcurriculum"
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
            <main style={{ minHeight: "400px", flexGrow: 1 }}>
                <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                    {/* link test */}
                    <Button
                        color="inherit"
                        component={Link}
                        to="./language"
                        sx={{
                            textTransform: "none",
                            minWidth: 75,         // 固定最小寬度
                        }}
                    >
                        語文
                    </Button>



                </Container>

            </main>
        </div>
    );
};

export default Schoolcurriculum;