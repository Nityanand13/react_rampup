import { LoginPage } from '../containers/login'
import { HomePage } from '../containers/home'
import React from "react";
const routesConfig: RouteConfig[] = [
    {
        path: '/',
        component: <HomePage />,
        private: true,
    },
    {
        path: '/login',
        component: <LoginPage />,
        private: false,
    },
]

export default routesConfig;
