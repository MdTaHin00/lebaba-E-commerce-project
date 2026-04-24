import React from 'react'
import { Navigate, Outlet } from "react-router";
import { useSelector } from 'react-redux'
import AdminDashBoard from './AdminDashBoard';
import UserDashBoard from './UserDashBoard';

function DashBoardLayout() {

  //* auth -> ja name authSlice store same kola hoyca
  //* user -> authSlice moda object name
  const { user } = useSelector((state) => state.auth)

  //* user login na thakay dashBoard jataparva na
if(!user){
    alert("You must be logged in")
    return <Navigate to="/login" state={{from:location}} replace/>
}



  const renderDashBoard = () => {
    if (user && user.role === 'admin') {
      return <AdminDashBoard/>
    } else if (user && user.role === 'user') {
      return <UserDashBoard/>
    } else {
     return <Navigate to="/login" replace/>
    }
  }

  return (
    <div className='container mx-auto flex flex-col md:flex-row gap-4 items-start justify-center'>
      <header className='lg:w-1/5 sm:w-2/5 w-full border border-gray-300 mt-5 rounded-lg shadow-lg'>
           {
            renderDashBoard()
           }
      </header>

      <main className='p-8 bg-white w-full border mt-5 border-gray-300 shadow-lg rounded-lg'>
        <Outlet />
      </main>
    </div>
  )
}

export default DashBoardLayout
