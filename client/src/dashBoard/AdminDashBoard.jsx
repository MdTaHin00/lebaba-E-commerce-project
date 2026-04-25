import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { useLogoutUserMutation } from '../redux/features/auth/authApi'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/features/auth/authSlice'

const navItems = [
  { path: "/dashboard/admin", label: "Dashboard" },
  { path: "/dashboard/add-product", label: "Add Product" },
  { path: "/dashboard/manage-products", label: "Manage Products" },
  { path: "/dashboard/users", label: "Users" },
  { path: "/dashboard/manage-orders", label: "Manage Orders" },
]

function AdminDashBoard() {
  //* authApi file ar logoutUser function
  //* Mutation function tai []
  const[logoutUser] = useLogoutUserMutation()

  const disPatch = useDispatch();
  const navigate = useNavigate()

  const handelLogout = async()=>{
     try {
      //* logoutUser() -> Mutation function tai unwrap()
       await logoutUser().unwrap()
       //* logout() -> authSlice file ar function
       disPatch(logout())
       navigate("/login")
     } catch (error) {
       console.log("Error lo Logout",error);
     }
  }

  return (
    <>
      <div className=' bg-white p-8 md:h-screen flex flex-col items-center  '>
        <div>
          <div className='nav__logo'>
            <Link to="/">Lebaba<span>.</span></Link>
            <p className='text-xs italic'>Admin DashBoard</p>
          </div>

          <p className='border border-gray-500 mt-1'></p>

          <ul className='space-y-3 font-medium mt-10'>
            {
              navItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "text-red-500" : ""
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))
            }
          </ul>
        </div>

        {/* logout */}
        <div className='mt-10'>
          <button onClick={handelLogout} className='bg-red-500 px-4 py-2 text-white rounded-sm hover:bg-red-600'>Logout</button>
        </div>

      </div>

    </>
  )
}

export default AdminDashBoard
