import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import Navbar from './Common/NavBar/Navbar'

const ProtectedRoute = () => {
    const token = localStorage.getItem("token")

  return (
    <div>
        {
            token ? <>
            <Navbar/>
            <Outlet/>
            
            </> : <Navigate to={"/login"}/>
        }
    </div>
  )
}

export default ProtectedRoute