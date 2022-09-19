import { LoginPage } from '../containers/login'
import { HomePage } from '../containers/home'
import { SearchPage } from '../containers/search'
const routesConfig: RouteConfig[] = [
    {
        path: '/',
        component: <HomePage />,
        private: true,
    },
    {
        path: '/search/:searchId',
        component: <SearchPage />,
        private: true,
    },
    {
        path: '/login',
        component: <LoginPage />,
        private: false,
    },
]
export default routesConfig