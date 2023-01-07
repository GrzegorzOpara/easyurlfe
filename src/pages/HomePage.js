import React, { useEffect, useState, useContext, useCallback } from 'react'
import { Box } from "grommet";
import { AuthContext } from '../context/AuthContext'
import UrlSearchBar from '../components/UrlSearchBar';
import UrlTable from '../components/UrlTable';
import UrlAdd from '../components/UrlAdd';
import UrlEdit from '../components/UrlEdit';
import Fuse from 'fuse.js';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
export const HomePage = () => {
  // urls
  let [urls, setUrls] = useState([])
  let [filteredUrls, setFilteredUrls] = useState([]);
  
  // editing record
  let [editedRecord, setEditedRecord] = useState([])
  let [editing, setEditing] = useState(false)
  
  // auth
  let {authTokens, logoutUser} = useContext(AuthContext)

  // filter records by search text
  const filterUrls = useCallback( (event) => {
    if (event === "") 
      {
        setFilteredUrls(urls)
      }
    else {
      let filteredData = []

      const options = {
        includeScore: true,
        findAllMatches: true,
        keys: ['url_link', 'url_name', 'url_desc']
      }
      
      const fuse = new Fuse(urls, options)
      const fuseResults = fuse.search(event)
      
      fuseResults.forEach(a => filteredData.push(a.item))

      setFilteredUrls(filteredData);
    };  
    
  }, [urls])

  let getUrls = async(e) => {
    let query = e ? e : ''

    let response = await fetch(REACT_APP_API_URL + '/api/urls/?query=' + query, {
      metchod: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }
    })

    let data = await response.json()

    if (response.status === 200) {
      setUrls(data)
      setFilteredUrls(data)
    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }

  let deleteUrl = async(id) => {
    let response = await fetch(REACT_APP_API_URL + '/api/urls/' + id + '/', {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }})

      await response.json()

      if (response.status === 200) {
        getUrls()
      } else {
        console.log('Error deleting the entry!')
      }
  } 

  let addUrl = async(e) => {
    e.preventDefault()
    
    let response = await fetch(REACT_APP_API_URL + '/api/urls/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      },
      body:JSON.stringify({ 
        'url_link':e.target.url_link.value,
        'url_name':e.target.url_name.value,
        'url_desc':e.target.url_desc.value})
      })

      await response.json()

      if (response.status === 201) {
        getUrls()
        e.target.reset();
      } else {
        console.log('Error adding new entry!')
      }
  }
    
  let saveEditedUrl = async(e) => {
    let response = await fetch(REACT_APP_API_URL + '/api/urls/' + editedRecord.id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      },
      body:JSON.stringify({ 
        'url_link':editedRecord.url_link,
        'url_name':editedRecord.url_name,
        'url_desc':editedRecord.url_desc})
      })
    
    await response.json()

      if (response.status === 200) {
        getUrls()
        setEditing(false)
        e.target.reset();
      } else {
        console.log('Error updating the entry!')
      }
    
    cancelEdit(); 
  }
  
  let editRecord = async(e) => {
    const newRecord = {...editedRecord, [e.target.name]: e.target.value}
    setEditedRecord(newRecord)   
    
  }
  
  let cancelEdit = async() => {
    setEditing(false); 
    setEditedRecord([])   
  }

  useEffect(() => {
    getUrls()
    // eslint-disable-next-line
  }, [])  

  return (
  <Box>
    <UrlSearchBar onChange={filterUrls}/>
    {editing ? 
    <UrlEdit editRecord={editRecord} saveEditedUrl={saveEditedUrl} editedRecord={editedRecord} cancelEdit={cancelEdit}/>
    :
    <UrlAdd editRecord={editRecord} saveEditedUrl={saveEditedUrl} addUrl={addUrl} editedRecord={editedRecord} cancelEdit={cancelEdit}/>
    }
    <UrlTable filteredUrls={filteredUrls} setEditing={setEditing} setEditedRecord={setEditedRecord} deleteUrl={deleteUrl}/>   
  </Box>
  )
}
