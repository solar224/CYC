import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export default function ToolLayout() {
    return (
        <Box
            component="main"
            sx={{
                width: "100%",
                minHeight: "100vh",
                height: "100vh",
                "@supports (height: 100dvh)": {
                    minHeight: "100dvh",
                    height: "100dvh",
                },
                overflow: "hidden",
                boxSizing: "border-box",
            }}
        >
            <Outlet />
        </Box>
    );
}
