import { Form, FormField, Text, Box, TextInput, Button, Tip } from "grommet";
import { Save, Redo } from 'grommet-icons';

const UrlEdit = ({saveEditedUrl, editedRecord, editRecord, cancelEdit}) => {
    return (
        <Box fill pad='small' direction="row-responsive">
        <Form style={{width: "100%"}} onSubmit={event=>saveEditedUrl(event)}>
          <Box width="1500px" fill direction='row-responsive'>
            <Box width="15%"><FormField><TextInput name="url_link" value={editedRecord.url_link} onChange={(e) => editRecord(e) } placeholder={<Text size="small">url</Text>}></TextInput></FormField></Box>
            <Box width="15%"><FormField><TextInput name="url_name" value={editedRecord.url_name} onChange={(e) => editRecord(e) } placeholder={<Text size="small">name</Text>}></TextInput></FormField></Box>
            <Box width="70%"><FormField><TextInput name="url_desc" value={editedRecord.url_desc} onChange={(e) => editRecord(e) } placeholder={<Text size="small">description</Text>}></TextInput></FormField></Box>
            <Box justify="center" pad="small" direction="row">
              <Box pad="small"><Button type="submit" primary={false}>{<Tip content="Save"><Save size="medium"/></Tip>}</Button></Box>
              <Box pad="small">{<Button onClick={ () => cancelEdit() }><Tip content="Cancel"><Redo size="medium"/></Tip></Button>}</Box>
            </Box>
          </Box>    
        </Form>
        </Box>
    )
}

export default UrlEdit