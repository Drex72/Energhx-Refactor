import React, {useContext} from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import { AdminContext, AdminContextProvider } from '../../Pages/AdminDashboard/AdminLogin'

const PrivateRoute = () => {
   return (
    <AdminContextProvider><Routes/></AdminContextProvider>
   )
}

const Routes = () => {
    const { auth } = useContext(AdminContext);
  return (
    auth ? <Outlet/> : <Navigate to='/'/>
  )
}

export default PrivateRoute