import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from '../store';
import { Route } from "react-router-dom";

type PrivateRouteProps = {
    component: JSX.Element;
}

const PrivateRoute = ({
    component,
}: PrivateRouteProps): JSX.Element => {
    const { userLoggedIn } = useSelector((state) => state.user)
    const navigate = useNavigate();

    useEffect(() => {
        if (!userLoggedIn) {
            navigate("/login")
        }
    }, [userLoggedIn, navigate])

    return component;
}

export default PrivateRoute;
