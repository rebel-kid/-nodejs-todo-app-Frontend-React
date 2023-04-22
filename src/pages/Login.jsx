/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context,server } from '../main';
import { toast } from 'react-hot-toast';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);


  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(email, password);
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/users/login`,
        { email, password },  //data need to send, can pass JSON object variable or direct
        { headers: { "Content-Type": "application/json" }, withCredentials: true }  //we need to set withCredentials true, otherwise cookie will not be set
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
    setEmail("");
    setPassword("");
  };

  if(isAuthenticated) return <Navigate to={"/"}/>

  return (
    <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
        <input
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
          />
          <button type='submit' disabled={loading}>Login</button>
          <h4>Or</h4>
          <Link to={"/register"}>Sign Up</Link>
        </form>
      </section>
    </div>
  )
}

export default Login