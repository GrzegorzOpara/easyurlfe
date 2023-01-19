import React, {useContext} from 'react'
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    let {user, username, logoutUser} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleButtonClick = (page) => {
        if (!page) 
            navigate('/')
        else 
            navigate('/' + page)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className='d-flex container align-items-center justify-content-between'>
                <div className="navbar-brand" onClick={() => handleButtonClick()}>
                    <div className="d-flex align-items-center">
                        <img src={process.env.PUBLIC_URL + "/favicon.ico"} alt="Easy Url header logo" width="40" height="40" className="d-inline-block align-text-center mx-2" />   
                        <span className='logo-text'>Easy Url - friendly links</span>
                    </div>
                </div>
            
            {user ? (
                <div className='d-flex align-items-center' >
                    <Link className='mx-2' to="/profile">{username}</Link>
                    <button type="button" className="btn btn-primary mx-1" onClick={logoutUser}>Logout</button>
                </div>
            ) : (
                <div className='d-flex align-items-center'>
                    <button type="button" className="btn btn-primary mx-1" onClick={() => handleButtonClick("login")}>Login</button>
                    <button type="button" className="btn btn-secondary mx-1" onClick={() => handleButtonClick("create")}>Sign up</button>
                </div>
            )
            }
            </div>
        </nav>
  )
}

export default Header;