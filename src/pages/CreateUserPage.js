import { useState } from "react";
import { Form, FormField, Text, Box, TextInput, Button, Tip } from "grommet";
import validator from 'validator';

const CreateUserPage = () => {

    const [email, setEmail] = useState(null)
    const [validEmail, setValidEmail] = useState(true)
    const [emailMatch, setEmailMatch] = useState(true)
    
    const [password, setPassword] = useState(null)
    const [validPassword, setValidPassword] = useState(true)
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    
    
    
    const handleSubmit = (e) => {
        // Handle submit form function
    }

    const validateUser = (e) => {
        // validate if username is correct (lenght, dubplicate, etc.)
    }

    const validatePassword = (e) => {
        if (validator.isStrongPassword(e) === true)
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
        setValidEmail(validator.isEmail(e))
        console.log(validator.isEmail(e))
    }

    return (
        <Box>
            <Form onSubmit={(event) => handleSubmit(event)}>
                <Box>
                    <FormField>
                        <TextInput name="username" ></TextInput>
                    </FormField>
                </Box>
                <Box>
                    <FormField>
                        <TextInput name="passwordPrimary" onChange={(e) => handlePrimaryPasswordChange(e)}></TextInput>
                        {validPassword? null : <Box>Passwords doesn't meet complexity requirements</Box>}
                    </FormField>
                </Box>
                <Box>
                    <FormField>
                        <TextInput name="passwordSecondary"  onChange={(e) => handleSecondaryPasswordChange(e)}></TextInput>
                        {passwordsMatch? null : <Box>Passwords doesn't match</Box>}
                    </FormField>
                </Box>
                <Box>
                    <FormField>
                        <TextInput name="emailPrimary" placeholder="email address" onBlur={(e) => validateEmail(e.target.value)} ></TextInput>
                        {validEmail? null : <Box>The email address is not valid</Box>}
                    </FormField>
                </Box>
                <Box>
                    <FormField>
                        <TextInput name="emailSecondary"></TextInput>
                    </FormField>
                </Box>
                <Box pad="small"><Button type="submit" primary={true}>Create User</Button></Box>
            </Form>
        </Box>
    )
}

export default CreateUserPage