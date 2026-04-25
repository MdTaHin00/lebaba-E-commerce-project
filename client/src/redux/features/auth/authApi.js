
//! api auth method 
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { get_Base_url } from '../../../utils/getBase_url'

//! api auth kas koral janno ata install korta hoy
//? npm install @reduxjs/toolkit react-redux


//* query -> get method
//* mutation -> put,patch,delete

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${get_Base_url()}/api/auth`,
        //? backend a cors ar moda credentials true tai akana ai code
        credentials: 'include'
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({

        //? register user
        registerUser: builder.mutation({
            query: (newUser) => ({
                //*operal  api/auth por kon route celo backend tar name
                url: "/register",
                //* kon method backend thaka data make hoyca tar name
                method: 'POST',
                //* body -> body thaka data pai tai 
                body: newUser
            })
        }),

        //? login user
        loginUser: builder.mutation({
            query: (client) => ({
                url: "/login",
                method: 'POST',
                body: client
            }),
            credentials: 'include'
        }),

        //? logout user
        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: 'POST'
            })
        }),

        //? get all users
        //* query -> get method 
        getAllUsers: builder.query({
            query: () => ({
                url: '/users',
                method: "GET"
            }),
            refetchOnMount: true,
            invalidatesTags: ['Users'],
        }),

        //? delete users
        //* mutation -> delete method tai 
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Users']
        }),

        //? update user role 
        //* mutation -> put method tai
        updateUserRole: builder.mutation({
            query: ({ userId, role }) => ({
                url: `/users/${userId}`,
                method: "PUT",
                body: role,
            }),
            refetchOnMount: true,
            invalidatesTags: ['Users'],
        }),

        //? edit profile user 
        //* mutation -> patch method tai mutation
        editProfileUser: builder.mutation({
            query: ({ id, profileData }) => ({
                url: `/edit-profile/${id}`,
                method: "PATCH",
                body: profileData
            })
        })
    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useEditProfileUserMutation,
    useGetAllUsersQuery,
    useDeleteUserMutation,
    useUpdateUserRoleMutation
} = authApi
export default authApi 