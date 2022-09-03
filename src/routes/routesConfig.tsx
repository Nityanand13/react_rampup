import { LoginPage } from '../containers/login'
import { HomePage } from '../containers/home'
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