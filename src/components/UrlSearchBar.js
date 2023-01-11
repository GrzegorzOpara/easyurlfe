const UrlSearchBar = (props) => {  
    const filterUrls = (value) => {
        props.onChange(value)
    }
    
    return (
      <div className="row">
            <div className="col">
              <input className="form-control mx-1" placeholder="search" type="text" aria-label="search" onChange={event => filterUrls(event.target.value)} />
            </div>
      </div>
    )
  }
  
  export default UrlSearchBar;