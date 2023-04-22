import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { Context, server } from './main';
function App() {
  const { setUser, setIsAuthenticated, setLoading } = useContext(Context);

  useEffect(() => { //always calling get my profile -> so when refresh als, user details are saved in the session
    setLoading(true);
    axios.get(`${server}/users/me`, {
      withCredentials: true
    }).then(response => {
      setUser(response.data.user);
      setIsAuthenticated(true);
      setLoading(false);
      // eslint-disable-next-line no-unused-vars
    }).catch((error) => {
      //we can give error here, -> error.data.message -> but we are passing error from backend
      setUser({})//setting user as null
      setIsAuthenticated(false);  //as user is not logged in
      setLoading(false);

    })
  }, [])
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;