const UrlTable = ({filteredUrls, deleteUrl, setEditedRecord, setEditing}) => {
    return (
        <div className="container-flex m-2'">
          {filteredUrls.length !== 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">url</th>
                <th scope="col">name</th>
                <th scope="col">delete|edit</th>
                <th scope="col">description</th>
              </tr>
            </thead>
            <tbody>
            {[...filteredUrls].sort((a, b) => b.id - a.id).map(url => (
              <tr key={url.id}>
                <th scope='col'><a href={url.url_link}>{url.url_link}</a></th>
                <th scope='col'>{url.url_name}</th>
                <th scope='col'>
                  <div className="d-flex">
                    <button className="btn btn-outline-danger mx-1" type="submit" onClick={() => deleteUrl(url.id)}>delete</button>
                    <button className="btn btn-outline-warning mx-1" type="submit" onClick={() => {setEditedRecord(url); setEditing(true)}}>edit</button>
                  </div>
                </th>
                <th scope='col'>{url.url_desc}</th>
              </tr>
            ))}
            </tbody>
          </table>
        ) 
        : 
        ( 
          <div className="container-flex m-5 text-center">
            <span className="h4">no urls found</span>
          </div>
        )
        }
        </div>
    )
}

export default UrlTable;