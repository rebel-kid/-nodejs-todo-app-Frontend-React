/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

  const submitHandler = async (event) => {
    setLoading(true);
    event.preventDefault();
    console.log(name, email, password);
    try {
      const { data } = await axios.post(
        `${server}/users/new`,
        { name, email, password },  //data need to send, can pass JSON object variable or direct
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
    setName("");
    setEmail("");
    setPassword("");
  };
  //if authenticated, then show home page to user
  if(isAuthenticated) return <Navigate to={"/"}/>
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Name"
          />
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
          <button type="submit" disabled={loading}>Sign Up</button>
          <h4>Or</h4>
          <Link to={"/login"}>Login</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
