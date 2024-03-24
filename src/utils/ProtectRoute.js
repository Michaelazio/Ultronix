import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoute = () => {
    const { user } = useSelector(state => state.auth)
  
    if (user) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />
    }
}

export default ProtectRoute
