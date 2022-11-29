import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const authenticated = false
    return (
        authenticated? <Outlet/> : <Navigate to="/login"/>
    )
}

export { PrivateRoutes }