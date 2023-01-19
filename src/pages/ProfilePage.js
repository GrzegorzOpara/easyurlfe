import React, { useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import validator from 'validator';
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const ProfilePage = () => {

    const {username, user, logoutUser, authTokens}  = useContext(AuthContext)
    const [validEmail, setValidEmail] = useState(true)
    const [validPassword, setValidPassword] = useState(true)
    const [passwordsMatch, setPasswordsMatch] = useState(true)

    const handleChangeSubmit = (e) => {
        e.preventDefault()
        let data = {}
        
        if (e.target.name === "email_change") {
            console.log(e.target.email.value)
            // let data = {"email":e.target.form.email.value}    
        }
        else if (e.target.name === "password_change") {
            console.log(e.target.password.value)
            // let data = {"email":e.target.password.value}    
        }
        
        //console.log(data)

    }

    const deleteUser = async() => {
        let response = await fetch(REACT_APP_API_URL + '/api/users/details', {
            method: 'DELETE',
            headers: {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
            }})
    
            if (response.status === 200) {
                // logoutUser()
            } else {
                console.log('Error deleting the user!')
            }
    }

    const validateEmail = (e) => {
        // validate email
        if (validator.isEmail(e.target.form.email.value) !== true) {
            setValidEmail(false)
        }
        else {
            setValidEmail(true)
        }
    }

    const validatePassword = (e) => {
        // validate password complexity
        const passwordComplexity = { 
            minLength: 8, 
            minLowercase: 1, 
            minUppercase: 1, 
            minNumbers: 1, 
            minSymbols: 0, 
            returnScore: false, 
            pointsPerUnique: 1, 
            pointsPerRepeat: 0.5, 
            pointsForContainingLower: 10, 
            pointsForContainingUpper: 10, 
            pointsForContainingNumber: 10, 
            pointsForContainingSymbol: 10
        }

        if (validator.isStrongPassword(e.target.form.password.value, passwordComplexity) !== true) {
            setValidPassword(false)
        }
        else {
            setValidPassword(true)
        }


        // validate password match
        if (e.target.form.password.value !== e.target.form.passwordSecondary.value) {
            setPasswordsMatch(false)
        } 
        else {
            setPasswordsMatch(true)
        }
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-xl-11">
                <div className="card text-black">
                <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Hello, {username}</p>

                        <form className="mx-1 mx-md-4" name="email_change" onSubmit={ (e) => handleChangeSubmit(e) }>
                        
                        <p className="text-start h5 fw-bold mb-1 mx-1 mx-md-3 mt-3">Change email address</p>
                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <label className="form-label" htmlFor="email">Email address</label>
                                <input type="email" name="email" className={validEmail ? "form-control" : "form-control is-invalid"} onChange={(e) => validateEmail(e)} />
                                <div className="invalid-feedback">Please provide a valid email</div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary">Change email</button>
                        </div>

                        </form>

                        <form className="mx-1 mx-md-4" name="password_change" onSubmit={ (e) => handleChangeSubmit(e) }>
                        
                        <p className="text-start h5 fw-bold mb-1 mx-1 mx-md-3 mt-3">Change password</p>
                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input type="password" name="password" className={validPassword ? "form-control" : "form-control is-invalid"} onChange={(e) => validatePassword(e)} />
                                <div className="invalid-feedback">Please provide a valid password (min. 8 characters, alphanumeric)</div>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <label className="form-label" htmlFor="passwordSecondary">Repeat your password</label>
                                <input type="password" name="passwordSecondary" className={passwordsMatch ? "form-control" : "form-control is-invalid"} onChange={(e) => validatePassword(e)} />
                                <div className="invalid-feedback">Please provide passwords that match</div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary">Change password</button>
                        </div>

                        </form>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="button" className="btn btn-danger" onClick={() => deleteUser()}>Delete user</button>
                        </div>

                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ProfilePage