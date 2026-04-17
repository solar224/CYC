import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export default function ToolLayout() {
    return (
        <Box className="tool-layout" component="main">
            <Outlet />
        </Box>
    );
}
