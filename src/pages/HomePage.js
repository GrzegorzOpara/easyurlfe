import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Anchor, Table, Box, TableHeader, TableBody, TableCell, TableRow } from "grommet";

const HomePage = () => {
  let [urls, setUrls] = useState([])
  let {authTokens, logoutUser} = useContext(AuthContext)

  useEffect(() => {
    getUrls()
  }, [])

  let getUrls = async() => {

    let response = await fetch('http://127.0.0.1:8000/api/urls/', {
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

  return (
    
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
          </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  )
}

export { HomePage }
