import React, {useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import { Button, Form, FormField, TextInput, Tag, Text, Box } from "grommet";

const Header = () => {
    let {user, username, loginUser, logoutUser} = useContext(AuthContext)
    return (
        <div>
            {user ? (
                <>
                <Box justify = "end" direction="row-responsive" border={{color:"brand", size: "medium", side: "bottom"}}>
                    <Box pad='small' alignSelf='center'>
                        <Text size="medium">{username}</Text>
                    </Box>
                    <Box pad='small'>
                        <Button label={<Text size="medium">Logout</Text>} onClick={logoutUser} primary={true} />
                    </Box>
                </Box>
                </>
            ) : (
                <>
                <Box pad='small' justify = "end" direction="row-responsive" border={{color:"brand", size: "medium", side: "bottom"}}>
                    <Form
                    onSubmit={(event)=>loginUser(event)} >
                        <Box direction="row">
                            <FormField>
                                <TextInput name="username" placeholder={<Text size="small"><i>Username</i></Text>}/>
                            </FormField>
                            <FormField>
                                <TextInput name="password" placeholder={<Text size="small"><i>Password</i></Text>} type='password'/>
                            </FormField>
                            <Box justify="center" pad="small">
                                <Button label={<Text size="medium">Login</Text>} type="submit" primary={true} />
                            </Box>
                        </Box>
                    </Form>
                    </Box>
                </>
            )}
            
        </div>
  )
}

export { Header }