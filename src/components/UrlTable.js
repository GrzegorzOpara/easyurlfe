const UrlTable = ({filteredUrls, deleteUrl, setEditedRecord, setEditing}) => {
    return (
        <div className="container-flex m-2'">
          {filteredUrls.length !== 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col-2">url</th>
                <th scope="col-2">name</th>
                <th scope="col-1">delete / edit</th>
                <th scope="col">description</th>
              </tr>
            </thead>
            <tbody>
            {[...filteredUrls].sort((a, b) => b.id - a.id).map(url => (
              <tr key={url.id}>
                <th scope='col'><a href={url.url_link}>{url.url_link}</a></th>
                <th scope='col'>{url.url_name}</th>
                <th scope='col'><button className="btn btn-outline-danger mx-1" type="submit" onClick={() => deleteUrl(url.id)}>delete</button><button className="btn btn-outline-warning mx-1" type="submit" onClick={() => {setEditedRecord(url); setEditing(true)}}>edit</button></th>
                <th scope='col'>{url.url_desc}</th>
              </tr>
            ))}
            </tbody>
          </table>
        ) 
        : 
        ( 
          <span className="h1">no urls found</span>
        )
        }
        </div>
    )
}

export default UrlTable;