import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthContext = createContext()

export {AuthContext} 

export const AuthProvider = ({children}) => {
    
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [username, setUsername] = useState(() => localStorage.getItem('username') ? localStorage.getItem('username') : null)
    let [loading, setLoading] = useState(true)

    // console.log('auth token:', authTokens)
    // console.log('loading = ', loading)
    // let [username, setUsername] = useState('Wyjsciowa wartosc') // => localStorage.getItem('username') ? localStorage.getItem('username') : null)

    const navigate = useNavigate()

    let loginUser = async (e ) => {
        e.preventDefault()

        setUsername(e.target.username.value)

        let response = await fetch('http://127.0.0.1:8000/api/token/', {
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
            console.log("Username : ", username)
            localStorage.setItem('authTokens', JSON.stringify(data))
            localStorage.setItem('username', username)
            navigate('/')
        }
        else {
            navigate('/')
        }
    }

    let logoutUser = () => {
        // console.log('Logout!')
        setAuthTokens(null)
        setUser(null)
        setUsername(null)
        localStorage.removeItem('authTokens')
        localStorage.removeItem('username')
        navigate('/login')
    }
    
    let updateToken = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        
        let data = await response.json()     

        // console.log(response.status)

        if (response.status === 200) {
            setAuthTokens(data)
            // console.log(authTokens)
            setUser(jwt_decode(data.access))
            // console.log(user)
            localStorage.setItem('authTokens', JSON.stringify(data))   
            // console.log('token updated')
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
            // // console.log('Wykonuje update tokenow na podst. refresh', authTokens?.refresh)
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