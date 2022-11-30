import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthContext = createContext()

export {AuthContext} 

export const AuthProvider = ({children}) => {
    // localstorage.getitem(accessTokens)
    let [authTokens, setAuthTokens] = useState(null)
    let [user, setUser] = useState(null)

    const navigate = useNavigate()

    let loginUser = async (e ) => {
        console.log('Form submitted!')
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        console.log('data:', data)

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        }
        else {
            alert = 'Something went wrong!'
        }

        console.log('response :', response)
    }

    let contextData = {
        user:user, 
        loginUser:loginUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )

}