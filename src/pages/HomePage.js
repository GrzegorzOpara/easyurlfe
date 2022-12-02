import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

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
      console.log('2')
      logoutUser()
    }
  }

  return (
    <div>
        <ul>
          {urls.map(url => (
            <li key={url.id}>{url.url_link} - {url.url_name} - {url.url_desc}</li>
          ))}
        </ul>
    </div>
  )
}

export { HomePage }
