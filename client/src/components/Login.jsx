import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from "react-hook-form"
import { useLoginUserMutation } from '../redux/features/auth/authApi'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/features/auth/authSlice'

function Login() {

  const [success, setSuccess] = useState('')
  const { register, handleSubmit, formState: { errors }, } = useForm()
   const navigate = useNavigate()
   const dispatch = useDispatch()


    //* Mutation use korlar somay [] deta hoy
  //? loginUser -> authApi.js file ar
  //? useLoginUserMutation ai Mutation function name
  const[loginUser] = useLoginUserMutation()

  const onSubmit = async(data) =>{
     try {
      //? unwrap() -> loginUser Mutation function daka use korta hova
       const response = await loginUser(data).unwrap()
       //? user ar data diesear  
        const {token,user} = response
        
       setSuccess("Login Successfully")
      //? dispatch -> ata deya authSlice.js ar poda data pai
      //? setUser -> authSlice.js file function
      dispatch(setUser({user}))
       
       setTimeout(()=>{
         navigate("/")
       },2000)
       
     } catch (error) {
       setSuccess("Login Failed")
       console.log(error);
     }
  }
  return (
    <div className='h-screen flex items-center justify-center'>
      <div style={{ padding: "40px" }} className='shadow-xl rounded-md min-w-md'>
        <h2 className='text-2xl font-semibold text-center margin'>Please Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className='butMar'>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder='Email'
              className='input_padding rounded-md bg-gray-100 w-full focus:outline-none ' />
            {/* required error */}
            {errors.email && <span className='text-red-500 block'>Email is required</span>}
          </div>
          <div className='butMar'>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder='Password'
              className='input_padding rounded-md bg-gray-100 w-full focus:outline-none ' />

            {/* required error */}
            {errors.password && <span className='text-red-500 block'>Password is required</span>}
          </div>

          {
            success && <p style={{ marginBottom: "4px" }} className='bg-red-500/10 text-red-500 text-center rounded-lg'>{success}</p>
          }
          <button type='submit' className='w-full butMar bg-red-500 text-white rounded-lg hover:bg-red-600 duration-300'>Login</button>
        </form>
        <div style={{ marginTop: "5px" }} className='italic text-sm text-center'>
          Don't have an account? <Link to="/register" className='text-red-400 underline cursor-pointer hover:text-red-600'>Register</Link> here.
        </div>
      </div>
    </div>
  )
}

export default Login
