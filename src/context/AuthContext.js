import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
// import { async } from "q";

export const AuthContext = createContext()
export const AuthProvider = ({children}) => {

    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [username, setUsername] = useState(() => localStorage.getItem('username') ? localStorage.getItem('username') : null)
    let [email, setEmail] = useState(() => localStorage.getItem('email') ? localStorage.getItem('email') : null)
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    let getUserDetails = async () => {
        
        let response = await fetch(REACT_APP_API_URL + '/api/users/details/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        
        let data = await response.json()   

        if (response.status === 200) {
            localStorage.setItem('email', data.email)
            setEmail(data.email)
        }
        else {
            console.log('Error getting user details')
        }
    }

    let loginUser = async (e) => {    
        e.preventDefault()

        // set username and password depending if it comes from header on registration form
        const username = e.target.username ? e.target.username.value : e.target.reg_username.value
        const password = e.target.password ? e.target.password.value : e.target.reg_password.value
        
        setUsername(username)
        localStorage.setItem('username', username)

        let response = await fetch(REACT_APP_API_URL + '/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':username, 'password':password})
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
        localStorage.removeItem('email')
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
        email:email,
        loginUser:loginUser,
        logoutUser:logoutUser,
        authTokens:authTokens,
        getUserDetails:getUserDetails
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}