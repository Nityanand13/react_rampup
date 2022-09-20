import { LoginPage } from '../containers/login'
import { HomePage } from '../containers/home'
import { SearchPage } from '../containers/search'
import { ProfilePage } from '../containers/profile'
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
        path: '/profile/:profileId',
        component: <ProfilePage />,
        private: true,
    },
    {
        path: '/login',
        component: <LoginPage />,
        private: false,
    },
]
export default routesConfig