import React, { useState } from 'react'
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../../redux/features/auth/authApi'
import Loading from '../../../components/Loading'
import { Link } from "react-router";

function ManageUsers() {
  const [isModalOpen, setIsModelOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  //? useGetAllUsersQuery -> authApi.js import function
  //* query tai {}
  const { data, isLoading, refetch } = useGetAllUsersQuery()

  //? useDeleteUserMutation -> authApi.js file thaka import
  //? deleteUser -> useDeleteUserMutation function name
  //* mutation tai []
  const [deleteUser] = useDeleteUserMutation()

  if (isLoading) {
    return <Loading />
  }
  const users = data.data || {};


  //! delete user function
  const handelDeleteUser = async (id) => {
    try {
      const response = await deleteUser(id).unwrap()
      console.log(response);
      alert("User deleted successfully")
      refetch()
    } catch (error) {
      console.log("Failed to delete user", error);
    }
  }


  //! edit user function
 const handelEditUser = async () =>{
  
 }

  return (
    <>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          {/* main */}
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            {/* header */}
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All Users
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <div >
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      See all
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* table */}
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      No.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      User email
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      User role
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Edit or manage
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users &&
                    users.map((user, index) => (
                      <tr key={user._id}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {index + 1}
                        </th>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {user?.email}
                        </th>

                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <span
                            className={`rounded-full py-[2px] px-3 ${user?.role === "admin"
                              ? "bg-indigo-500 text-white "
                              : "bg-amber-300"
                              }`}
                          >
                            {" "}
                            {user?.role}
                          </span>
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button
                          onClick={()=> handelEditUser(user)}
                            className="flex gap-1 items-center hover:text-sky-600 bg-sky-500 text-white px-1 rounded-md py-1"
                          >
                            <i className="ri-edit-2-line"></i> Edit
                          </button>
                        </td>
                        <td className="border-t-0  px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button
                            onClick={() => handelDeleteUser(user?._id)}
                            className="bg-red-600 rounded-md text-white px-2 py-1"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default ManageUsers
