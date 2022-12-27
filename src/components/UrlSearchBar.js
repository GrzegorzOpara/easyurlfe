import { Box, TextInput } from "grommet"

const UrlSearchBar = (props) => {  
    const filterUrls = (value) => {
        props.onChange(value)
    }
    
    return (
      <div>
        <Box direction="row-responsive">
        <Box fill pad="small">
            <TextInput plain placeholder="Search url" onChange={event => filterUrls(event.target.value)}></TextInput>
        </Box>
        </Box>
      </div>
    )
  }
  
  export default UrlSearchBar;