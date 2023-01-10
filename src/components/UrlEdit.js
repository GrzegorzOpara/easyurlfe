import { Form, FormField, Text, Box, TextInput, Button, Tip } from "grommet";
import { Save, Redo } from 'grommet-icons';

const UrlEdit = ({saveEditedUrl, editedRecord, editRecord, cancelEdit}) => {
    return (
      <div className='container-flex m-2'>
        <form className="row" onSubmit={event=>saveEditedUrl(event)}>
          <div className="col-2">
            <input className="form-control mx-1" id="url_link" placeholder="url" type="text" aria-label="url" value={editedRecord.url_link} onChange={(e) => editRecord(e) }/>
          </div>
          <div className="col-2">
            <input className="form-control mx-1" id="url_name" placeholder="name" type="text" aria-label="name" value={editedRecord.url_name} onChange={(e) => editRecord(e) }/>
          </div>
          <div className="col-6">
            <input className="form-control mx-1" id="url_desc" placeholder="description" type="text" aria-label="description" value={editedRecord.url_desc} onChange={(e) => editRecord(e) }/>
          </div>
          <div className="col-2">
            <button className="btn btn-outline-success mx-1" type="submit">save</button>
            <button className="btn btn-outline-success mx-1" onClick={ () => cancelEdit()}>cancel</button>
          </div>
        </form>
      </div>
    )
}

export default UrlEdit