import Contactme from "../../components/Contactme";
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
        id: "app.contact",
        path: APP_ROUTE_PATHS.CONTACT,
        element: (
            <ResponsiveLayout
                mobile={<Contactme calendarVariant="mobile" />}
                desktop={<Contactme calendarVariant="desktop" />}
            />
        ),
    },
];
