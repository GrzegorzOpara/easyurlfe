import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <div>
            <Link to={'/'}>Home Page</Link>
            <span> | </span>
            {user ? (
                <p onClick={logoutUser}>Logout</p>
            ) : (
                <Link to={'/login'}>Login Page</Link>
            )}
            {user && <p>Hello {user.username}</p>}
        </div>
  )
}

export { Header }