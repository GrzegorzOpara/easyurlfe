import validator from 'validator';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const PasswordResetPage = () => {

    const [validEmail, setValidEmail] = useState(true)
    const navigate = useNavigate()

    const validateEmail = (e) => {
        // validate email
        if (validator.isEmail(e.target.form.reset_email.value) !== true) {
            setValidEmail(false)
        }
        else {
            setValidEmail(true)
        }
    }

    let requestPasswordReset = async(e) => {
        e.preventDefault()

        let response = await fetch(REACT_APP_API_URL + '/users/request-password-reset/', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body:JSON.stringify({'url_link':e.target.form.reset_email.value})
        })
    
          await response.json()
    
          if (response.status === 200) {
            console.log('Password reset link sent to email address!')
            navigate('/')
          } else {
            console.log('Error adding new entry')
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

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Password reset</p>

                        <form className="mx-1 mx-md-4" onSubmit={ (e) => requestPasswordReset(e) }>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <label className="form-label" htmlFor="reset_email">Please provide an email address used for registration</label>
                                <input type="text" id="reset_email" className={validEmail ? "form-control" : "form-control is-invalid"} onChange={(e) => validateEmail(e)} />
                                <div className="invalid-feedback">Please provide a valid email</div>
                            </div>                            
                        </div>
                        <div className="d-flex flex-row mb-3">
                            <p className="text-justify m-3">If the address exists in our records you should recive an email shortly. Please follow the instruction icluded to set up new password.</p>
                        </div>
                        
                        <div className="d-flex justify-content-center mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary btn-lg" >Send a reset link</button>
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

export default PasswordResetPage