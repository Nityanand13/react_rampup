import { BrowserRouter, Routes, Route } from "react-router-dom";
import routesConfig from "./routesConfig";
import AppRoute from "./appRoute";
import React from "react";
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {routesConfig.map(routeConfig => (
                    <Route 
                        key={routeConfig.path}
                        path={routeConfig.path}
                        element={
                            <AppRoute
                                component={routeConfig.component}
                                isPrivate={routeConfig.private}
                            />
                        }
                    />
                ))}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
