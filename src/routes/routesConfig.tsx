import { LoginPage, HomePage } from '../component/forms/login'

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
export default routesConfig