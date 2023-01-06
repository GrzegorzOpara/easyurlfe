import { useEffect, useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { Form, FormField, Text, Box, TextInput, Button } from "grommet";
import validator from 'validator';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const CreateUserPage = () => {
    // state
    const [email, setEmail] = useState(null)
    const [validEmail, setValidEmail] = useState(false)
    const [emailMatch, setEmailMatch] = useState(false)
    const [validUsernameLen, setValidUsernameLen] = useState(false)
    
    const [password, setPassword] = useState(null)
    const [validPassword, setValidPassword] = useState(false)
    const [passwordsMatch, setPasswordsMatch] = useState(false)
    const [userAlreadyExists, setUserAlreadyExists] = useState(false)
    
    const [validForm, setValidForm] = useState(false)

    // auth
    let {user, username, loginUser, logoutUser} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (validEmail && validPassword && emailMatch && passwordsMatch && validUsernameLen)
            {
                setValidForm(true)
                // console.log("changed to true")
            }
        else
            {
                setValidForm(false) // should be false - testing
                // console.log("changed to false")
            }
    }, [validEmail, validPassword, emailMatch, passwordsMatch, validUsernameLen, validForm])

    const addUser = async(e) => {
        e.preventDefault()
        
        let response = await fetch(REACT_APP_API_URL + '/api/users/', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body:JSON.stringify({ 
            'username':e.target.username.value,
            'email':e.target.emailPrimary.value,
            'password':e.target.password.value})
          })
     
          if (response.status === 201) {
            loginUser(e)
          }
          else {
            console.log('Error adding new user!')
            setUserAlreadyExists(true)
          }
        }
        
    const validatePassword = (e) => {
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
        if (validator.isStrongPassword(e, passwordComplexity) === true)
            setValidPassword(true)
        else
        setValidPassword(false)
    }

    const handlePrimaryPasswordChange = (e) => {
        setPassword(e.target.value)
        validatePassword(e.target.value)
    }

    const handleSecondaryPasswordChange = (e) => {
        if (e.target.value === password)
            setPasswordsMatch(true)
        else
            setPasswordsMatch(false)
    }

    const validateEmail = (e) => {
        if (validator.isEmail(e)) {
            setValidEmail(true)
            setEmail(e)
        }
        else
            setValidEmail(false)
    }

    
    const handleUsernameChange = (e) => {
        if (e.target.value.length > 3 && validator.isAlphanumeric(e.target.value)) {
            setValidUsernameLen(true)
            setUserAlreadyExists(false)
            }
        else
            setValidUsernameLen(false)
    }

    const handleSecondaryEmailChange = (e) => {
        if (e.target.value === email)
            setEmailMatch(true)
        else
            setEmailMatch(false)
    }

    return (
        <Box fill justify="center" direction="row-responsive">
            <Box width='medium'>
                <Form onSubmit={(event) => addUser(event)}>
                    <Box pad="small">
                        <FormField>
                            <Text size="xsmall">login</Text><TextInput size="xsmall" name="username" onChange={(e) => handleUsernameChange(e)} ></TextInput>
                            {validUsernameLen? null : <Box>Username min. 4 characters, alphanumeric!</Box>}
                        </FormField>
                    </Box>
                    <Box pad="small">
                        <FormField>
                            <Text size="xsmall">password</Text><TextInput size="xsmall" type="password" name="password" onChange={(e) => handlePrimaryPasswordChange(e)}></TextInput>
                            {validPassword? null : <Box>Passwords doesn't meet complexity requirements</Box>}
                        </FormField>
                    </Box>
                    <Box pad="small">
                        <FormField>
                            <Text size="xsmall">repeat password</Text><TextInput size="xsmall" type="password" name="passwordSecondary" onChange={(e) => handleSecondaryPasswordChange(e)}></TextInput>
                            {passwordsMatch? null : <Box>Passwords doesn't match</Box>}
                        </FormField>
                    </Box>
                    <Box pad="small">
                        <FormField>
                            <Text size="xsmall">email</Text><TextInput size="xsmall" name="emailPrimary" onBlur={(e) => validateEmail(e.target.value)} ></TextInput>
                            {validEmail? null : <Box>The email address is not valid</Box>}
                        </FormField>
                    </Box>
                    <Box pad="small">
                        <FormField>
                            <Text size="xsmall">repeat email</Text><TextInput size="xsmall" name="emailSecondary" onChange={(e) => handleSecondaryEmailChange(e)}></TextInput>
                            {emailMatch? null : <Box>Email doesn't match</Box>}
                        </FormField>
                    </Box>
                    <Box pad="small">
                        <Button type="submit" label={<Text size="medium">Create User</Text>} primary={true} disabled={validForm? false : true}></Button>
                        {userAlreadyExists? <Box>This usernane is already taken!</Box> : null}
                    </Box>
                </Form>
            </Box>
        </Box>
    )
}

export default CreateUserPage