import React, {useContext} from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    let {user, username, loginUser, logoutUser} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleRegister = () => {
        navigate('/create')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light my-2">
                <div className='container col-1'>
                    <div className='align-self-center'>
                        <span className="navbar-brand h1">EasyUrl</span>
                    </div>
                </div>
            {user ? (
                <div className='container justify-content-end' >
                    <div className='d-flex align-self-center mx-1'>
                        <span>{username}</span>
                    </div>
                    <button type="button" className="btn btn-primary mx-1" onClick={logoutUser}>Logout</button>
                </div>
            ) : (
                <div className='container justify-content-end'>
                    <form className="d-flex" onSubmit={(event)=>loginUser(event)}>
                        <input className="form-control mx-1" id="username" placeholder="login" type="text" aria-label="username" />
                        <input className="form-control mx-1" id="password" placeholder="password" type="password" aria-label="password" />
                        <button className="btn btn-outline-primary mx-1" type="submit">Login</button>
                        <button className="btn btn-outline-primary mx-1" type="button" onClick={handleRegister}>Register</button>
                    </form>
                </div>
            )}
            
        </nav>
  )
}

export { Header }