const UrlEdit = ({saveEditedUrl, editedRecord, editRecord, cancelEdit}) => {
    return (
        <form className='d-flex flex-row my-2' onSubmit={event=>saveEditedUrl(event)}>
            <div className="col-2 m-1">
              <input className="form-control" id="url_link" placeholder="url" type="text" aria-label="url" value={editedRecord.url_link} onChange={(e) => editRecord(e) }/>
            </div>
            <div className="col-2 m-1">
              <input className="form-control" id="url_name" placeholder="name" type="text" aria-label="name" value={editedRecord.url_name} onChange={(e) => editRecord(e) }/>
            </div>
            <div className="col-6 m-1">
              <input className="form-control" id="url_desc" placeholder="description" type="text" aria-label="description" value={editedRecord.url_desc} onChange={(e) => editRecord(e) }/>
            </div>
            <div className="col-md">
              <button className="btn btn-outline-success m-1" type="submit">save</button>
              <button className="btn btn-outline-danger m-1" onClick={ () => cancelEdit()}>cancel</button>
            </div>
        </form>
    )
}

export default UrlEdit