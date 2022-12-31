// import './App.css';
import { HomePage } from './pages/HomePage'
import { Header } from './components/Header'
import { PrivateRoutes } from './utils/PrivateRoutes'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Grommet } from 'grommet';
import CreateUserPage from './pages/CreateUserPage';
import WelcomePage from './pages/WelcomePage';

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
              <Route path="/" exact element={<HomePage />} />
            </Route>
            <Route path="/welcome" element={<WelcomePage />}/>
            <Route path="/create" element={<CreateUserPage />}/>
          </Routes>
        </AuthProvider>
      </Router>
    </Grommet>
    
  );
}

export default App;
