import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext()
export const AuthProvider = ({children}) => {

    const TEST = "TEST"
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    console.log('Api url:' + REACT_APP_API_URL + " " + TEST)


    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [username, setUsername] = useState(() => localStorage.getItem('username') ? localStorage.getItem('username') : null)
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    let loginUser = async (e) => {    
        e.preventDefault()
        
        const val = e.target.username.value
        setUsername(val)
        localStorage.setItem('username', val)

        let response = await fetch(REACT_APP_API_URL + '/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        }
        else {
            navigate('/')
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        localStorage.removeItem('username')
    }
    
    let updateToken = async () => {
        let response = await fetch(REACT_APP_API_URL + '/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        
        let data = await response.json()     

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))   
        } else {
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }

    let intervalCalc = (minutes) => {
        return minutes * 1000 * 60
    }

    useEffect(() => {

        if (loading && authTokens) {
            updateToken()
        } else if (loading) {
            setLoading(false)
        }

        let interval = setInterval(()=> {
            if(authTokens) {
                updateToken()
            }
        }, intervalCalc(14))

        return ()=> clearInterval(interval)
    
        // eslint-disable-next-line
    }, [authTokens, loading])

    let contextData = {
        user:user,
        username:username, 
        loginUser:loginUser,
        logoutUser:logoutUser,
        authTokens:authTokens
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}