// import './App.css';
import { HomePage } from './pages/HomePage'
// import { LoginPage } from './pages/LoginPage'
import { Header } from './components/Header'
import { PrivateRoutes } from './utils/PrivateRoutes'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Grommet } from 'grommet';

const theme = {
  global: {
    input: {
      font: {
        size: '20px',
        weight: 100
      }
    },
    font: {
      family: 'Roboto',
      weight: 100,
      size: '15px',
      height: '20px',
    },
    tip: {
      content: {
        background: { opacity: false },
      }
    },
  },
};

function App() {
  return (
    
    <Grommet theme = {theme}>
      <Router>
        <AuthProvider>
          <Header/>
          <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route element={<HomePage/>} path="/" exact />
            </Route>
            {/* <Route path="/login" element={<LoginPage/>}/> */}
          </Routes>
        </AuthProvider>
      </Router>
    </Grommet>
    
  );
}

export default App;
