import './App.css';
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { Header } from './components/Header'
import { PrivateRoutes } from './utils/PrivateRoutes'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header/>
          <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route element={<HomePage/>} path="/" exact />
            </Route>
            <Route path="/login" element={<LoginPage/>}/>     
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
