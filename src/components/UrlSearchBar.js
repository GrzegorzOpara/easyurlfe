import { Box, TextInput } from "grommet"

const UrlSearchBar = (props) => {  
    const filterUrls = (value) => {
        props.onChange(value)
    }
    
    return (
      <div className="container-flex m-2">
            <input className="form-control mx-1" placeholder="search" type="text" aria-label="search" onChange={event => filterUrls(event.target.value)} />
      </div>
    )
  }
  
  export default UrlSearchBar;