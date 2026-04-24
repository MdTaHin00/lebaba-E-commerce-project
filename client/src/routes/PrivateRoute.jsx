import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router'

//* PrivateRoute ata akta raper route tai children received
function PrivateRoute({children,role}) {
const{user} = useSelector((state) => state.auth)


// //* ja page ceram sai jakay ceary java
const location = useLocation()

if(!user){
    alert("You must be logged in")
    return <Navigate to="/login" state={{from:location}} replace/>
}

if(role && user.role !== role){
  alert("Access denied,You must bs an admin")
  return <Navigate to="/login" state={{from: location}} replace/>
}
 
 
    return children


}

export default PrivateRoute
