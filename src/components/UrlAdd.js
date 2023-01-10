const UrlAdd = ({addUrl}) => {
    return (
          <form className='d-flex flex-row my-2' onSubmit={ event => addUrl(event)}>
            <div className="col-2 m-1">
              <input className="form-control" id="url_link" placeholder="url" type="text" aria-label="url" />
            </div>
            <div className="col-2 m-1">
              <input className="form-control" id="url_name" placeholder="name" type="text" aria-label="name" />
            </div>
            <div className="col-6 m-1">
              <input className="form-control" id="url_desc" placeholder="description" type="text" aria-label="description" />
            </div>
            <div className="col-md m-1">
              <button className="btn btn-outline-success" type="submit">add</button>
            </div>
          </form>
    )

}

export default UrlAdd

