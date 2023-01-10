import { useEffect, useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import validator from 'validator';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const CreateUserPage = () => {
    // state
    const [email, setEmail] = useState(null)
    const [validEmail, setValidEmail] = useState(false)
    const [validUsername, setValidUsername] = useState(false)
    
    const [password, setPassword] = useState(null)
    const [validPassword, setValidPassword] = useState(false)
    const [passwordsMatch, setPasswordsMatch] = useState(false)
    const [userAlreadyExists, setUserAlreadyExists] = useState(false)
    
    const [validForm, setValidForm] = useState(false)

    // auth
    let {loginUser} = useContext(AuthContext)

    useEffect(() => {
        if (validEmail && validPassword && passwordsMatch && validUsername)
            {
                setValidForm(true)
                // console.log("changed to true")
            }
        else
            {
                setValidForm(false) // should be false - testing
                // console.log("changed to false")
            }
    }, [validEmail, validPassword, passwordsMatch, validUsername, validForm])

    const validateForm = (e) => {
        
        console.log(e.username.value)

        let validForm = true

        // validate user len and alphanumeric
        if (validator.isLength(e.username.value, {min: 4}) && validator.isAlphanumeric(e.username.value)) {
            setValidUsername(false)
            validForm = false
        }

        // validate email
        console.log(e.email.value)
        if (validator.isEmail(e.email.value) !== true) {
            setValidEmail(false)
            validForm = false
        }

        // validate password complexity
        const passwordComplexity = { 
            minLength: 12, 
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

        console.log(e.password.value)
        console.log(e.passwordSecondary.value)
        if (validator.isStrongPassword(e.password.value, passwordComplexity) !== true) {
            setValidPassword(false)
            validForm = false
        }

        // validate password match
        if (e.password.value !== e.passwordSecondary.value) {
            setPasswordsMatch(false)
            validForm = false
        }

        return validateForm
            
    }

    const addUser = async(e) => {
        e.preventDefault()

        validateForm(e.target.form)
        // console.log(e.target.form.username.value)
        
        // let response = await fetch(REACT_APP_API_URL + '/api/users/', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type':'application/json'
        //   },
        //   body:JSON.stringify({ 
        //     'username':e.target.username.value,
        //     'email':e.target.email.value,
        //     'password':e.target.password.value})
        //   })
     
        //   if (response.status === 201) {
        //     loginUser(e)
        //   }
        //   else {
        //     console.log('Error adding new user!')
        //     setUserAlreadyExists(true)
        //   }
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

                        <form className="mx-1 mx-md-4">

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <input type="text" id="username" className="form-control" />
                                <label className="form-label" for="username">Username</label>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <label className="form-label" for="email">Your Email</label>
                                <input type="email" id="email" className="form-control" />
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <input type="password" id="password" className="form-control" />
                            <label className="form-label" for="password">Password</label>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <input type="password" id="passwordSecondary" className="form-control" />
                            <label className="form-label" for="passwordSecondary">Repeat your password</label>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary btn-lg" onClick={(e) => addUser(e)}>Register</button>
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