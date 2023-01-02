import { Form, FormField, Text, Box, TextInput, Button, Tip } from "grommet";

const CreateUserPage = () => {

    const handleSubmit = (e) => {
        // Handle submit form function
    }

    const validateUser = (e) => {
        // validate if username is correct (lenght, dubplicate, etc.)
    }

    const validatePassword = (e) => {
        // validate if password is fine (complexity, match 1 & 2)
    }

    const validateEmail = (e) => {
        // validate if password is fine (complexity, match 1 & 2)
    }

    return (
        <Box>
            <Form onSubmit={(event) => handleSubmit(event)}>
                <Box>
                    <FormField>
                        <TextInput name="username"></TextInput>
                    </FormField>
                </Box>
                <Box>
                    <FormField>
                        <TextInput name="password"></TextInput>
                    </FormField>
                </Box>
                <Box>
                    <FormField>
                        <TextInput name="password2"></TextInput>
                    </FormField>
                </Box>
                <Box>
                    <FormField>
                        <TextInput name="email1"></TextInput>
                    </FormField>
                </Box>
                <Box>
                    <FormField>
                        <TextInput name="email2"></TextInput>
                    </FormField>
                </Box>
                <Box pad="small"><Button type="submit" primary={true}>Create User</Button></Box>
            </Form>
        </Box>
    )
}

export default CreateUserPage