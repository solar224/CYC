import { Route, Routes } from "react-router-dom";
import { appDomainRoutes } from "./domains/appDomainRoutes";
import { notesDomainRoutes } from "./domains/notesDomainRoutes";
import { toolsDomainRoute } from "./domains/toolsDomainRoutes";
import DefaultLayout from "./layouts/DefaultLayout";
import ToolLayout from "./layouts/ToolLayout";

export default function AppRoutes({ theme }) {
    const defaultLayoutRoutes = [...appDomainRoutes, ...notesDomainRoutes];

    return (
        <Routes>
            <Route element={<DefaultLayout theme={theme} />}>
                {defaultLayoutRoutes.map((routeDef) => (
                    <Route
                        key={routeDef.id}
                        path={routeDef.path}
                        element={routeDef.element}
                    />
                ))}
            </Route>

            <Route path={toolsDomainRoute.path} element={<ToolLayout />}>
                {toolsDomainRoute.children.map((routeDef) => (
                    <Route
                        key={routeDef.id}
                        index={routeDef.index}
                        path={routeDef.path}
                        element={routeDef.element}
                    />
                ))}
            </Route>
        </Routes>
    );
}
