import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoutes = () => {
    let user = useContext(AuthContext)
    return (
        user.user? <Outlet/> : null
    )
}

export { PrivateRoutes }