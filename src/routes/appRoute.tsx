import { Route } from "react-router-dom";
import PrivateRoute from "./privateRoute"
import { Navbar } from "../component/navbar"

type AppRouteProps = {
    component: JSX.Element;
    isPrivate: boolean;
}
const AppRoute = ({
    component,
    isPrivate
}: AppRouteProps):JSX.Element => (
    
    isPrivate ? <><Navbar/> <PrivateRoute component={component} /> </>: component
)


export default AppRoute