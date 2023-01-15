// import './App.css';
import HomePage from './pages/HomePage'
import Header from './components/Header'
import { PrivateRoutes } from './utils/PrivateRoutes'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateUserPage from './pages/CreateUserPage';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage'
import PasswordResetPage from './pages/PasswordResetPage';
import PasswordChangePage from './pages/PasswordChangePage';


function App() {
  return (
    <div className='container'>
      <Router>
        <AuthProvider>
          <Header/>
          <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route path="/" exact element={<HomePage />} />
            </Route>
            <Route path="/welcome" element={<WelcomePage />}/>
            <Route path="/create" element={<CreateUserPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/password-reset" exact element={<PasswordResetPage />}/>
            <Route path="/password-chnage/:encoded_pk/:token" element={<PasswordChangePage />}/>
          </Routes>
        </AuthProvider>
      </Router>   
    </div>
  );
}

export default App;
