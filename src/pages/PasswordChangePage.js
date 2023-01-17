import validator from 'validator';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const PasswordChangePage = () => {
    // API CALL: localhost:8000/api/users/password-reset/NDg/bi13vi-a2bf021b2a11316b59f199f4a9ad5f07/
    // LINK: localhost:3000/password-chnage/NDg/bi2h8g-cc60025f66395b6fb37b9812229c1aef/
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    const [validPassword, setValidPassword] = useState(false)
    const [passwordsMatch, setPasswordsMatch] = useState(false)
    const navigate = useNavigate()

    let params = useParams();

    const changePassword = async(e) => {
        e.preventDefault()

        console.log(e)
        
        let response = await fetch(REACT_APP_API_URL + '/api/users/password-reset/' + params.encoded_pk + '/' + params.token + '/', {
          method: 'PATCH',
          headers: {
            'Content-Type':'application/json'
          },
          body:JSON.stringify({'password':e.target.change_password.value})
          })
    
          await response.json()
    
          if (response.status === 200) {
            navigate('/login')
          } else {
            navigate('/password-reset')
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

        if (validator.isStrongPassword(e.target.form.change_password.value, passwordComplexity) !== true) {
            setValidPassword(false)
        }
        else {
            setValidPassword(true)
        }


        // validate password match
        if (e.target.form.change_password.value !== e.target.form.change_passwordSecondary.value) {
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
                    <div className="col-md-11 col-lg-7 col-xl-6 order-2 order-lg-1">

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Set up new password</p>

                        <form className="mx-1 mx-md-4" onSubmit={ (e) => changePassword(e) }>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <label className="form-label" htmlFor="change_password">Password</label>
                                <input type="password" id="change_password" className={validPassword ? "form-control" : "form-control is-invalid"} onChange={(e) => validatePassword(e)} />
                                <div className="invalid-feedback">Please provide a valid password (min. 8 characters, alphanumeric)</div>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <label className="form-label" htmlFor="change_passwordSecondary">Repeat your password</label>
                                <input type="password" id="change_passwordSecondary" className={passwordsMatch ? "form-control" : "form-control is-invalid"} onChange={(e) => validatePassword(e)} />
                                <div className="invalid-feedback">Please provide passwords that match</div>
                            </div>
                        </div>
                        
                        <div className="d-flex justify-content-center mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary btn-lg" disabled={!(validPassword && passwordsMatch)}>Change password</button>
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

export default PasswordChangePage