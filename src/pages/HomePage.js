import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Anchor, Form, FormField, Table, Text, Box, TableHeader, TableBody, TableCell, TextInput, TableRow, Button } from "grommet";

export const HomePage = () => {
  let [urls, setUrls] = useState([])
  let [editedRecord, setEditedRecord] = useState([])
  let [editing, setEditing] = useState(false)
  let {authTokens, logoutUser} = useContext(AuthContext)

  let getUrls = async(e) => {
    let query = e ? e : ''

    let response = await fetch('http://127.0.0.1:8000/api/urls/?query=' + query, {
      metchod: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }
    })

    let data = await response.json()

    if (response.status === 200) {
      setUrls(data)
    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }

  let deleteUrl = async(id) => {
    //e.preventDefault()
    console.log('Exec delere url')

    let response = await fetch('http://127.0.0.1:8000/api/urls/' + id + '/', {
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
    console.log('Exec addUrl!')

    
    let response = await fetch('http://127.0.0.1:8000/api/urls/', {
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

    let getEditedRecord = async(e) => {
      setEditing(true)
      setEditedRecord(e.target.value)
      console.log(editedRecord)
    }
    
    let editUrl = async(e) => {

    }
    
   
    let editRecord = async(e) => {
      const newRecord = {...editedRecord, url_link: e.target.value}
      setEditedRecord(newRecord)   
    }

    useEffect(() => {
      getUrls()
    }, [])  

  return (
  <>
    <Box fill direction="row-responsive">
      <Box pad="small">
        <TextInput plain placeholder="Search url" onChange={event => getUrls(event.target.value)}></TextInput>
      </Box>
    </Box>
    <Box pad='small' direction="row-responsive">
    <Form onSubmit={editing ? event=>editUrl(event) : event=>addUrl(event)}>
      <Box direction='row'>
        <FormField><TextInput name="url_link" value={editing ? editedRecord.url_link : '' } onChange={editing ? (e) => editRecord(e): null } placeholder={<Text size="small">url</Text>}></TextInput></FormField>
        <FormField><TextInput name="url_name" value={editing ? editedRecord.url_name : '' } placeholder={<Text size="small">name</Text>}></TextInput></FormField>
        <FormField><TextInput name="url_desc" value={editing ? editedRecord.url_desc : '' } placeholder={<Text size="small">description</Text>}></TextInput></FormField>
        <Box justify="center" pad="small" direction="row">
          <Button pad="small" label={<Text size="medium">{editing ? 'save': 'add'}</Text>} type="submit" primary={false} />
          {editing ? <Button pad="small" label={<Text size="medium">cancel</Text>} primary={false} /> : null}
        </Box>
      </Box>    
    </Form>
    </Box>
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom">Link</TableCell>
          <TableCell scope="col" border="bottom">Name</TableCell>
          <TableCell scope="col" border="bottom">Description</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {urls.map(url => (
          <>
          <TableRow key={url.id}>
            <TableCell scope='row'><Anchor href={url.url_link} label={url.url_link} /></TableCell>
            <TableCell scope='row'>{url.url_name}</TableCell>
            <TableCell scope='row'>{url.url_desc}</TableCell>
            <TableCell scope='row'><Button label={<Text size="small">Delete</Text>} onClick={() => deleteUrl(url.id)}></Button></TableCell>
            <TableCell scope='row'><Button label={<Text size="small">Edit</Text>} onClick={() => {setEditedRecord(url); setEditing(true)}}></Button></TableCell>
          </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  </>
  )
}
