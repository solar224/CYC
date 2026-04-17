import { Route, Routes } from "react-router-dom";
import Contactme from "../components/Contactme";
import Home from "../components/Home";
import Note from "../components/Note";
import NoteDetail from "../components/NoteDetail";
import NotesHome from "../components/Note";
import Tools from "../components/Tools";
import ResponsiveLayout from "../components/layout/ResponsiveLayout";
import { APP_ROUTES } from "../config/constants";
import SketchCanvas from "../project/RoughFrame/SketchCanvas";

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path={APP_ROUTES.HOME}
                element={<ResponsiveLayout mobile={<Home layoutKind="mobile" />} desktop={<Home layoutKind="desktop" />} />}
            />
            <Route path={APP_ROUTES.NOTE} element={<Note />} />
            <Route
                path={APP_ROUTES.CONTACT}
                element={
                    <ResponsiveLayout
                        mobile={<Contactme calendarVariant="mobile" />}
                        desktop={<Contactme calendarVariant="desktop" />}
                    />
                }
            />
            <Route path={APP_ROUTES.TOOLS} element={<Tools />} />
            <Route path={APP_ROUTES.ROUGHFRAME} element={<SketchCanvas />} />
            <Route path={APP_ROUTES.NOTES} element={<NotesHome />} />
            <Route path={APP_ROUTES.NOTE_DETAIL} element={<NoteDetail />} />
        </Routes>
    );
}
