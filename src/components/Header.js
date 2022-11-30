import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    let {user} = useContext(AuthContext)
    return (
        <div>
            <Link to={'/'}>Home Page</Link>
            <span> | </span>
            {user ? (
                <p>Logout</p>
            ) : (
                <Link to={'/login'}>Login Page</Link>
            )}
            {user && <p>Hello {user.user_id}</p>}
        </div>
  )
}

export { Header }