// import './App.css';
import { HomePage } from './pages/HomePage'
import { Header } from './components/Header'
import { PrivateRoutes } from './utils/PrivateRoutes'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateUserPage from './pages/CreateUserPage';
import WelcomePage from './pages/WelcomePage';

function App() {
  return (
    <div className='container-lg'>
      <Router>
        <AuthProvider>
          <Header/>
          <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route path="/" exact element={<HomePage />} />
            </Route>
            <Route path="/welcome" element={<WelcomePage />}/>
            <Route path="/create" element={<CreateUserPage />}/>
          </Routes>
        </AuthProvider>
      </Router>   
    </div>
  );
}

export default App;
