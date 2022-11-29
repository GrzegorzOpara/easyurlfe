import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    let {username} = useContext(AuthContext)
    return (
        <div>
            <Link to={'/'}>Home Page</Link>
            <span> | </span>
            <Link to={'/login'}>Login Page</Link>

            <p>Hello {username}</p>
        </div>
  )
}

export { Header }