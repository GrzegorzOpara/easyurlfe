const UrlAdd = ({addUrl}) => {
    return (
        <div className='container-flex m-2'>
          <form className="row" onSubmit={ event => addUrl(event)}>
            <div className="col-2">
              <input className="form-control mx-1" id="url_link" placeholder="url" type="text" aria-label="url" />
            </div>
            <div className="col-2">
              <input className="form-control mx-1" id="url_name" placeholder="name" type="text" aria-label="name" />
            </div>
            <div className="col-7">
              <input className="form-control mx-1" id="url_desc" placeholder="description" type="text" aria-label="description" />
            </div>
            <div className="col-1">
              <button className="btn btn-outline-success mx-1" type="submit">add</button>
            </div>
          </form>
        </div>
    )

}

export default UrlAdd

