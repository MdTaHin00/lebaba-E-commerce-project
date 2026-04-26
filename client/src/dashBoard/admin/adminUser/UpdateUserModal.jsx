import React, { useState } from 'react'
import { useUpdateUserRoleMutation } from '../../../redux/features/auth/authApi'

function UpdateUserModal({user,handelCloseModel,refetch}) {
    
    const[role,setRole] = useState(user?.role)

    //? useUpdateUserRoleMutation -> authApi.js thaka import
    //* updateUserRole -> ai useUpdateUserRoleMutation function name
    //*  mutation tai []
    const[updateUserRole] = useUpdateUserRoleMutation()

    const handelUpdateRole = async () =>{
          try {
            await updateUserRole({userId: user?._id, role:role}).unwrap()
            alert("User role updated successfully")
            refetch()
            handelCloseModel()
          } catch (error) {
             console.log("Failed to user role update",error);
             
          }
    }

  return (
<div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded shadow-lg w-1/3">
                <h2 className="text-xl mb-4">Edit User!</h2>
                <div className="mb-4 space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Email:
                    </label>
                    <input
                        type="text"
                        value={user.email}
                        readOnly
                        className="mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2.5 px-5 focus:outline-none"
                    />
                </div>
                <div className="mb-4 space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Role:
                    </label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="block w-full shadow-sm sm:text-sm bg-gray-100 border-gray-300 rounded-md py-2.5 px-5 focus:outline-none"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="flex justify-end pt-5">
                    <button
                        onClick={handelCloseModel}
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handelUpdateRole}
                        className="bg-indigo-500 text-white px-6 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
  )
}

export default UpdateUserModal
