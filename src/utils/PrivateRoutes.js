import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import WelcomePage from "../pages/WelcomePage";



const PrivateRoutes = () => {
    let user = useContext(AuthContext)
    return (
        user.user? <Outlet/> : <WelcomePage />
    )
}

export { PrivateRoutes }