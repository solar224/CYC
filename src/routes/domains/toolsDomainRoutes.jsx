import { TOOLS_ROUTE_PATHS } from "../../config/tools.constants";
import SketchCanvas from "../../side-tool/RoughFrame/SketchCanvas";

export const toolsDomainRoute = {
    id: "tools.roughframe.root",
    path: TOOLS_ROUTE_PATHS.ROUGHFRAME,
    children: [
        {
            id: "tools.roughframe",
            index: true,
            element: <SketchCanvas />,
        },
    ],
};
