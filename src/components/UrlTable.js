import { Anchor, Table, Box, TableHeader, TableBody, TableCell, TableRow, Button, Tip } from "grommet";
import { Edit, Trash } from 'grommet-icons';

const UrlTable = ({filteredUrls, deleteUrl, setEditedRecord, setEditing}) => {
    return (
        <div>
        {filteredUrls.length !== 0 ? (
        <Box>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" size="medium" border="bottom">url</TableCell>
              <TableCell scope="col" size="medium" border="bottom">name</TableCell>
              <TableCell scope="col" size="xxsmall" border="bottom"><Box direction="row" justify="center">edit</Box></TableCell>
              <TableCell scope="col" size="xxsmall" border="bottom"><Box direction="row" justify="center">delete</Box></TableCell>
              <TableCell scope="col" size="xlarge" border="bottom">description</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...filteredUrls].sort((a, b) => b.id - a.id).map(url => (
              <TableRow key={url.id}>
                <TableCell scope='row'><Anchor href={url.url_link} label={url.url_link} /></TableCell>
                <TableCell scope='row'>{url.url_name}</TableCell>
                <TableCell scope='row'><Box direction="row" justify="center"><Button onClick={() => deleteUrl(url.id)}><Tip content="Delete"><Trash size="medium"/></Tip></Button></Box></TableCell>
                <TableCell scope='row'><Box direction="row" justify="center"><Button onClick={() => {setEditedRecord(url); setEditing(true)}}><Tip content="Edit"><Edit size="medium"/></Tip></Button></Box></TableCell>
                <TableCell scope='row'>{url.url_desc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Box>
        ) 
        : 
        ( 
        <Box pad="small">No Urls found!</Box>
        )
        }
        </div>
    )
}

export default UrlTable;