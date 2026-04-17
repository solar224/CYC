import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Footer from "../../components/Footer";
import FloatingCircle from "../../components/FloatingCircle";
import DynamicBackground from "../../components/DynamicBackground";
import PhoneHeader from "../../components/headerComponents/PhoneHeader";
import PcHeader from "../../components/headerComponents/PcHeader";
import ResponsiveLayout from "../../components/layout/ResponsiveLayout";

function AppHeader() {
    return <ResponsiveLayout mobile={<PhoneHeader />} desktop={<PcHeader />} />;
}

export default function DefaultLayout({ theme }) {
    return (
        <>
            <DynamicBackground theme={theme} />
            <AppHeader />
            <Box
                className="default-layout"
                sx={{
                    pt: {
                        xs: "var(--app-header-mobile)",
                        lg: "var(--app-header-desktop)",
                    },
                }}
            >
                <Outlet />
            </Box>
            <FloatingCircle />
            <Footer />
        </>
    );
}
