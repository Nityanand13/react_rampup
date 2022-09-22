import { Route } from "react-router-dom";

import PrivateRoute from "./privateRoute"

type AppRouteProps = {
    component: JSX.Element;
    isPrivate: boolean;
}
const AppRoute = ({
    component,
    isPrivate
}: AppRouteProps):JSX.Element => (
    isPrivate ? <PrivateRoute component={component} /> : component
)

export default AppRoute;
