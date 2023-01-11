import { useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import validator from 'validator';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const CreateUserPage = () => {
    // state
    const [validEmail, setValidEmail] = useState(true)
    const [validUsername, setValidUsername] = useState(true)
    
    const [validPassword, setValidPassword] = useState(true)
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [userDontExist, setUserDontExist] = useState(true)
    
    // auth
    let {loginUser} = useContext(AuthContext)

    const validateEmail = (e) => {
        // validate email
        if (validator.isEmail(e.target.form.reg_email.value) !== true) {
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

        if (validator.isStrongPassword(e.target.form.reg_password.value, passwordComplexity) !== true) {
            setValidPassword(false)
        }
        else {
            setValidPassword(true)
        }


        // validate password match
        if (e.target.form.reg_password.value !== e.target.form.reg_passwordSecondary.value) {
            setPasswordsMatch(false)
        } 
        else {
            setPasswordsMatch(true)
        }
    }

    const validateUser = (e) => { 
        // validate user len and alphanumeric
        setUserDontExist(true)

        if (validator.isLength(e.target.form.reg_username.value, {min: 4}) && validator.isAlphanumeric(e.target.form.reg_username.value)) {
            setValidUsername(true)
        }
        else {
            setValidUsername(false)
        }   
    }

    const addUser = async(e) => {
        e.preventDefault()
  
        let response = await fetch(REACT_APP_API_URL + '/api/users/', {
            method: 'POST',
            headers: {
            'Content-Type':'application/json'
            },
            body:JSON.stringify({ 
            'username':e.target.reg_username.value,
            'email':e.target.reg_email.value,
            'password':e.target.reg_password.value})
        })
    
        if (response.status === 201) {
            loginUser(e)
        }
        else {
            // console.log('Error adding new user!')
            setUserDontExist(false)
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

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                        <form className="mx-1 mx-md-4" onSubmit={(e) => addUser(e)}>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <label className="form-label" htmlFor="reg_username">Username</label>
                                <input type="text" id="reg_username" className={(validUsername && userDontExist) ? "form-control" : "form-control is-invalid"} onChange={(e) => {validateUser(e)}} />
                                {<div className="invalid-feedback">{userDontExist? "Please provide a valid username (min. 4 characters, at least 1 upper-case, 1 lower-case and 1 number)" : "This user aleady exists"}</div>}
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <label className="form-label" htmlFor="reg_email">Your Email</label>
                                <input type="email" id="reg_email" className={validEmail ? "form-control" : "form-control is-invalid"} onChange={(e) => validateEmail(e)} />
                                <div className="invalid-feedback">Please provide a valid email</div>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <label className="form-label" htmlFor="reg_password">Password</label>
                                <input type="password" id="reg_password" className={validPassword ? "form-control" : "form-control is-invalid"} onChange={(e) => validatePassword(e)} />
                                <div className="invalid-feedback">Please provide a valid password (min. 8 characters, alphanumeric)</div>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <label className="form-label" htmlFor="reg_passwordSecondary">Repeat your password</label>
                                <input type="password" id="reg_passwordSecondary" className={passwordsMatch ? "form-control" : "form-control is-invalid"} onChange={(e) => validatePassword(e)} />
                                <div className="invalid-feedback">Please provide passwords that match</div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary btn-lg">Register</button>
                        </div>

                        </form>

                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default CreateUserPage