import { Form, FormField, Text, Box, TextInput, Button, Tip } from "grommet";
import { AddCircle } from 'grommet-icons';

const UrlAdd = ({editing, saveEditedUrl, addUrl, editedRecord, editRecord, cancelEdit}) => {
    return (
        <Box fill pad='small' direction="row-responsive">
        <Form style={{width: "100%"}} onSubmit={ event => addUrl(event)}>
          <Box width="1500px" fill direction='row-responsive'>
            <Box width="15%"><FormField><TextInput name="url_link" placeholder={<Text size="small">url</Text>}></TextInput></FormField></Box>
            <Box width="15%"><FormField><TextInput name="url_name" placeholder={<Text size="small">name</Text>}></TextInput></FormField></Box>
            <Box width="70%"><FormField><TextInput name="url_desc" placeholder={<Text size="small">description</Text>}></TextInput></FormField></Box>
            <Box justify="center" pad="small" direction="row">
              <Box pad="small"><Button type="submit" primary={false}>{<Tip content="Add"><AddCircle size="medium"/></Tip>}</Button></Box>
            </Box>
          </Box>    
        </Form>
        </Box>
    )
}

export default UrlAdd

