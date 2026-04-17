import NoteDetail from "../../components/NoteDetail";
import NotesHome from "../../components/Note";
import { NOTES_ROUTE_PATHS } from "../../config/notes.constants";

export const notesDomainRoutes = [
    {
        id: "notes.home",
        path: NOTES_ROUTE_PATHS.HOME,
        element: <NotesHome />,
    },
    {
        id: "notes.detail",
        path: NOTES_ROUTE_PATHS.DETAIL,
        element: <NoteDetail />,
    },
];
