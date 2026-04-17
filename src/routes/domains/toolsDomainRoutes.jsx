import Tools from "../../components/Tools";
import { TOOLS_ROUTE_PATHS, TOOLS_ROUTE_SEGMENTS } from "../../config/tools.constants";
import SketchCanvas from "../../project/RoughFrame/SketchCanvas";

export const toolsDomainRoute = {
    id: "tools.root",
    path: TOOLS_ROUTE_PATHS.ROOT,
    children: [
        {
            id: "tools.index",
            index: true,
            element: <Tools />,
        },
        {
            id: "tools.roughframe",
            path: TOOLS_ROUTE_SEGMENTS.ROUGHFRAME,
            element: <SketchCanvas />,
        },
    ],
};
