import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router';
import { logout } from '../redux/features/auth/authSlice';
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';

const navItems = [
  { path: "/dashboard/user", label: "Dashboard" },
  { path: "/dashboard/orders", label: "Orders" },
  { path: "/dashboard/payments", label: "Payments" },
  { path: "/dashboard/profile", label: "Profile" },
  { path: "/dashboard/reviews", label: "Reviews" },
]


function UserDashBoard() {

  //* authApi file ar logoutUser function
  //* Mutation function tai []
  const [logoutUser] = useLogoutUserMutation()

  const disPatch = useDispatch();
  const navigate = useNavigate()

  const handelLogout = async () => {
    try {
      //* logoutUser() -> Mutation function tai unwrap()
      await logoutUser().unwrap()
      //* logout() -> authSlice file ar function
      disPatch(logout())
      navigate("/login")
    } catch (error) {
      console.log("Error lo Logout", error);
    }
  }


  return (
    <div>
      <div className=' bg-white p-8 md:h-screen flex flex-col items-center  '>
        <div>
          <div className='nav__logo'>
            <Link to="/">Lebaba<span>.</span></Link>
            <p className='text-xs italic'>User DashBoard</p>
          </div>

          <hr className='my-3' />

          <ul className='space-y-3 font-medium mt-10'>
            {
              navItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "text-red-500" : "text-black"
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

    </div>
  )
}

export default UserDashBoard