/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { Context,server } from '../main';
import Loader from '../components/Loader'
import { Navigate } from 'react-router-dom';
const Profile = () => {
  const { isAuthenticated, user, loading} = useContext(Context);
console.log(user);
  return (
    loading ? <Loader/> : (isAuthenticated ? <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div> : <Navigate to={"/login"}/>)
  )
}

export default Profile