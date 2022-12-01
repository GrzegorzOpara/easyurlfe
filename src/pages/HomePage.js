import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const HomePage = () => {
  let [urls, setUrls] = useState([])
  let {authTokens, logoutUser} = useContext(AuthContext)
  // let [username, setUsername] = useState(() => localStorage.getItem('username') ? localStorage.getItem('username') : null)

  useEffect(() => {
    // console.log('Wykonuje getUrls z tokenem: ')
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

    // console.log(response.status)

    if (response.status === 200) {
      // console.log('getUrls = 200')
      setUrls(data)
    } else if (response.statusText === 'Unauthorized') {
      // console.log('getUrls != 200')
      logoutUser()
    }
  }

  return (
    <div>
        <p>This are urls:</p>
        <ul>
          {urls.map(url => (
            <li key={url.id}>{url.url_name}</li>
          ))}
        </ul>
    </div>
  )
}

export { HomePage }
