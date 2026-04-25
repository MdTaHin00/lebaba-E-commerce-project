import React, { useEffect, useState } from 'react'
import avatarImage from '../../../assets/avatar.png'
import { useDispatch, useSelector } from 'react-redux'
import { useEditProfileUserMutation } from '../../../redux/features/auth/authApi'
import Loading from '../../../components/Loading'
import { setUser } from '../../../redux/features/auth/authSlice'

function UserProfile() {

    const disPatch = useDispatch()

    //* authApi thaka import 
    const { user } = useSelector((state) => state.auth)

    const [isModelOpen, setIsModelOpen] = useState(false)

    const [fromData, setFromData] = useState({
        username: '',
        profileImage: '',
        bio: '',
        profession: '',
        userId: ''
    })


    useEffect(() => {
        if (user) {
            setFromData({
                username: user?.username || '',
                profileImage: user?.profileImage || '',
                bio: user?.bio || '',
                profession: user?.profession || '',
                userId:user?._id || '' 
            })
        }
    }, [user])

    //! input data change 
    const handelChangeFromData = (e) =>{
        setFromData({
            ...fromData,
            [e.target.name] : e.target.value
        })
    }


    //? authApi.js file thaka import
    //* mutation tai []
    //* editProfile -> ai useEditProfileUserMutation function name
    const[editProfileUser,{isLoading}] = useEditProfileUserMutation()

    if(isLoading){
        <Loading/>
    }

//! submit data function
const  handelSubmitData = async (e)=>{
    e.preventDefault()

    const updateUserData ={
       username: fromData.username,
       profileImage: fromData.profileImage ,
       bio : fromData.bio ,
       profession: fromData.profession,
       userId : fromData.userId
    }
    

    try {
        const responsive = await editProfileUser({id: user?._id, profileData: updateUserData}).unwrap()
        console.log(responsive.data);
        disPatch(setUser(responsive.data))
        alert("Profile Update successfully")
    } catch (error) {
        console.log(error);
    }

}

    return (
        <div className='container mx-auto p-6'>
            <div>
                <div className='flex items-center mb-4'>
                    <div>
                        <img src={fromData.profileImage || avatarImage } className="w-10 h-10 object-cover rounded-full  border border-sky-400 " />

                    </div>
                    <div className='ml-6 space-y-1'>
                        <h2 className='text-2xl font-bold'>Username: {fromData.username}</h2>
                        <p className="text-gray-700">User Bio: {fromData.bio}</p>
                        <p className="text-gray-700">Profession: {fromData.profession}</p>
                        <p className="text-gray-700">UserID: {fromData.userId}</p>
                    </div>
                    <button
                        onClick={() => setIsModelOpen(true)}
                        className='ml-auto text-blue-500 hover:text-blue-700'>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3H4a1 1 0 00-1 1v14a1 1 0 001 1h7m2 0h7a1 1 0 001-1V4a1 1 0 00-1-1h-7m-2 0v14"></path>
                        </svg>
                    </button>
                </div>

            </div>

            {
                isModelOpen && (
                    <div className='fixed inset-0 bg-black/45 flex items-center justify-center z-50'>
                        <div className='bg-white p-6 rounded-lg md:w-96 mx-auto relative '>
                            <button
                                className='absolute right-5 top-5 text-gray-600 hover:text-gray-800'
                                onClick={() => setIsModelOpen(false)}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            <h2 className='text-xl font-medium'>Edit Profile</h2>
                            {/* edit from  */}
                            <form onSubmit={handelSubmitData}>
                                <div className='my-3'>
                                    <label htmlFor="" className='block text-xl font-medium text-gray-500'>Username</label>
                                    <input type="text"
                                        className='border px-2 border-gray-400 rounded-md w-full py-1 focus:outline-none'
                                        value={fromData.username}
                                        name='username'
                                        onChange={handelChangeFromData}
                                    />
                                </div>
                                <div className='my-3'>
                                    <label htmlFor="" className='block text-xl font-medium text-gray-500'>Profile Image</label>
                                    <input type="text"
                                        className='border px-2 border-gray-400 rounded-md w-full py-1  focus:outline-none'
                                        value={fromData.profileImage}
                                        name='profileImage'
                                         onChange={handelChangeFromData}
                                    />
                                </div>
                                <div className='my-3'>
                                    <label htmlFor="" className='block text-xl font-medium text-gray-500'>Bio</label>
                                    <textarea type="text"
                                        className='border px-2 border-gray-400 rounded-md w-full py-1  focus:outline-none'
                                        value={fromData.bio}
                                        name='bio'
                                         onChange={handelChangeFromData}
                                    />
                                </div>
                                <div className='my-3'>
                                    <label htmlFor="" className='block text-xl font-medium text-gray-500'>Profession</label>
                                    <input type="text"
                                        className='border px-2 border-gray-400 rounded-md w-full py-1  focus:outline-none'
                                        value={fromData.profession}
                                        name='profession'
                                         onChange={handelChangeFromData}
                                    />
                                </div>
                                <button type='submit' className='text-white bg-sky-500 hover:bg-sky-600 w-full py-1.5 rounded-lg '>Update Profile</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UserProfile
