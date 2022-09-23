import PrivateRoute from "./privateRoute";
import { Navbar } from "../components/navbar";
import { Route } from "react-router-dom";

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

export default AppRoute;
