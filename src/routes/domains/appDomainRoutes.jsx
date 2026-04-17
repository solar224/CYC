import Project from "../../components/Project";
import Home from "../../components/Home";
import Note from "../../components/Note";
import ResponsiveLayout from "../../components/layout/ResponsiveLayout";
import { APP_ROUTE_PATHS } from "../../config/app.constants";

export const appDomainRoutes = [
    {
        id: "app.home",
        path: APP_ROUTE_PATHS.HOME,
        element: <ResponsiveLayout mobile={<Home layoutKind="mobile" />} desktop={<Home layoutKind="desktop" />} />,
    },
    {
        id: "app.note",
        path: APP_ROUTE_PATHS.NOTE,
        element: <Note />,
    },
    {
        id: "app.project",
        path: APP_ROUTE_PATHS.PROJECT,
        element: (
            <ResponsiveLayout
                mobile={<Project />}
                desktop={<Project />}
            />
        ),
    },
];
