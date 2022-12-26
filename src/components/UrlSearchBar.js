import { Box, TextInput } from "grommet"

const UrlSearchBar = (props) => {  
    const handleChange = (event) => {
        props.onChange()
    }
    
    return (
      <Box fill direction="row-responsive">
      <Box pad="small">
          <TextInput plain placeholder="Search url" onChange={event => filterUrls(event.target.value)}></TextInput>
      </Box>
      </Box>
    )
  }
  
  export default UrlSearchBar;