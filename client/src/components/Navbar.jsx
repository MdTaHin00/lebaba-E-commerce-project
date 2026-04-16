import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Link, NavLink, useNavigate } from "react-router";
import avatarImg from '../assets/avatar.png'
import { logout } from '../redux/features/auth/authSlice';
import { useLogoutUserMutation } from '../redux/features/auth/authApi';

function Navbar() {

  //! useSelector -> authSlice.js file modar user pai
  //? auth -> ja name authSlice.js ka store save korce tar name
  //* user -> ja namey localStorage save kola hoyca
  const { user } = useSelector((state) => state.auth)
   
  //! useDispatch -> redux ar function patanoo hoy
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  const handelDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen)
  }
  const userDropDownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ]

  const adminDropDownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage", path: "/dashboard/manage-orders" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add Product", path: "/dashboard/add-product" },
  ]

  //? role based dropdown show
  const dropDownMenus = user?.role === "admin" ?
    [...adminDropDownMenus] : [...userDropDownMenus]


    
    //* Mutation use korlar somay [] deta hoy
  //? logoutUser -> authApi.js file ar
  //? useLogoutUserMutation ai Mutation function name
  const [logoutUser] = useLogoutUserMutation()

   //! logout function
   const handelLogout = async()=>{
      try {
        //? unwrap() -> loginUser Mutation function daka use korta hova
        await logoutUser().unwrap()
        //* logout -> authApi.js file ar function
         dispatch(logout())
         alert("Logout successfully")
         navigate("/")
        
      } catch (error) {
        console.log("Error logout",error);
      }
   } 
  return (
    //! remixicon use ja import main.js file a
    <div>
      <header className="fixed-nav-bar w-nav">
        <nav
          className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
          <ul className="nav__links">
            <li><NavLink className={({ isActive }) =>
              isActive ? "text-red-500 font-medium" : ""
            } to="/">Home</NavLink></li>
            <li><NavLink className={({ isActive }) =>
              isActive ? "text-red-500 font-medium" : ""
            } to="/shop">Shop</NavLink></li>
            <li><NavLink className={({ isActive }) =>
              isActive ? "text-red-500 font-medium" : ""
            } to="/pages">Pages</NavLink></li>
            <li><NavLink className={({ isActive }) =>
              isActive ? "text-red-500 font-medium" : ""
            } to="/contact">Contact</NavLink></li>
          </ul>
          <div className="nav__logo">
            <Link to="/">Lebaba<span>.</span></Link>
          </div>
          <div className="nav__icons relative">
            <span className='hover:text-red-500'>
              <NavLink className={({ isActive }) =>
                isActive ? "text-red-500 font-medium" : ""
              } to="/search"><i className="ri-search-line"></i></NavLink>
            </span>
            <span><button className="hover:text-primary">
              <i className="ri-shopping-bag-line"></i><sup className="text-sm inline-block text-white rounded-full w-5 h-5 bg-red-500 text-center font-bold">0</sup>
            </button>
            </span>
            <span className='hover:text-red-500'>
              {

                user ? (
                  <>
                    <img onClick={handelDropDownToggle} src={user?.profileImage || avatarImg} className='size-6 cursor-pointer rounded-full' />
                    {
                      isDropDownOpen && (
                        <div style={{padding:"18px"}} 
                        className='border border-gray-300 absolute rounded-lg z-40 right-1 lg:right-0 w-48 shadow-lg  bg-fuchsia-100'>
                          <ul className='space-y-2'>
                            {dropDownMenus.map((menu,index)=>(
                             <li 
                             onClick={()=>handelDropDownToggle(false)}
                             key={index}>
                               <Link className='dropdown-item' to={menu.path}>{menu.label}</Link>
                             </li>
                            ))}
                            <li><Link onClick={handelLogout} className='hover:text-red-500 py-4'>Logout</Link></li>
                          </ul>
                        </div>
                      )
                    }
                  </>
                ) : (
                  <Link to="/login"><i className="ri-user-line"></i></Link>
                )
              }
            </span>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
