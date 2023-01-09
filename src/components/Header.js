import React, {useContext} from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { Button, Form, FormField, TextInput, Text, Box } from "grommet";

const Header = () => {
    let {user, username, loginUser, logoutUser} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleRegister = () => {
        navigate('/create')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand h1">EasyUrl</span>
            {user ? (
                <div className='container-fluid'>
                    <p>{username}</p>
                    <button type="button" className="btn btn-primary" onClick={logoutUser}>Logout</button>
                </div>
            ) : (
                <div className='container'>
                    <div className='row'>
                        <form className="d-flex" onSubmit={(event)=>loginUser(event)}>
                            <div className='col mx-3'><input className="form-control mr-sm-2" id="username" type="text" aria-label="username" /></div>
                            <div className='col mx-3'><input className="form-control mr-sm-2" id="password" type="password" aria-label="password" /></div>
                            <div className='col mx-3'>
                                <button className="btn btn-outline-success mx-1" type="submit">Login</button>
                                <button className="btn btn-outline-success mx-1" type="button" onClick={handleRegister}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
        </nav>
  )
}

export { Header }