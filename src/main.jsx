import React,{createContext, useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/app.scss';

//prevent redundant calling in api for endpoint
export const server = "https://nodejs-todo-app-hn9r.onrender.com/api/v1";

//we often use redux after login, but small project -> can use Context
export const Context = createContext({isAuthenticated: false});
//we need to create AppWrapper, to set value of isAuthenticated to true/false, we don't have it's setter function as of now, so need to workaround
const AppWrapper = ()=>{
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
    return (
      <>
      <Context.Provider value={
        {isAuthenticated, setIsAuthenticated, loading, setLoading, user, setUser}
      }>
      <App />
      </Context.Provider>
      </>
    )
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>,
)
