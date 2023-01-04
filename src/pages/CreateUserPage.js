import { useEffect, useState } from "react";
import { Form, FormField, Text, Box, TextInput, Button, Tip } from "grommet";
import validator from 'validator';

const CreateUserPage = () => {

    const [email, setEmail] = useState(null)
    const [validEmail, setValidEmail] = useState(true)
    const [emailMatch, setEmailMatch] = useState(true)
    
    const [password, setPassword] = useState(null)
    const [validPassword, setValidPassword] = useState(true)
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    
    const [validForm, setValidForm] = useState(false)

    useEffect(() => {
        console.log(validEmail, validPassword, emailMatch, passwordsMatch, validForm)
        if (validEmail && validPassword && emailMatch && passwordsMatch)
            {
                setValidForm(true)
                console.log("changed to true")
            }
        else
            {
                setValidForm(false)
                console.log("changed to false")
            }
    }, [validEmail, validPassword, emailMatch, passwordsMatch])
    
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
        if (validator.isEmail(e)) {
            setValidEmail(true)
            setEmail(e)
        }
        else
            setValidEmail(false)
    }

    const handleSecondaryEmailChange = (e) => {
        if (e.target.value === email)
            setEmailMatch(true)
        else
            setEmailMatch(false)
    }

    return (
        <Box width='medium'>
            <Form onSubmit={(event) => handleSubmit(event)}>
                <Box pad="small">
                    <FormField>
                        <Text size="xsmall">login</Text><TextInput size="xsmall" name="username" ></TextInput>
                    </FormField>
                </Box>
                <Box pad="small">
                    <FormField>
                        <Text size="xsmall">password</Text><TextInput size="xsmall" type="password" name="passwordPrimary" onChange={(e) => handlePrimaryPasswordChange(e)}></TextInput>
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
                </Box>
            </Form>
        </Box>
    )
}

export default CreateUserPage