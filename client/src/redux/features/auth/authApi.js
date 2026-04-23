
             //! api auth method 
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { get_Base_url } from '../../../utils/getBase_url'

//! api auth kas koral janno ata install korta hoy
//? npm install @reduxjs/toolkit react-redux


//* query -> get method
//* mutation -> put,patch,delete

 const authApi = createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${get_Base_url()}/api/auth`,
        //? backend a cors ar moda credentials true tai akana ai code
        credentials:'include'
    }),
    tagTypes:['Users'],
    endpoints:(builder)=>({
        registerUser : builder.mutation({
            query:(newUser)=>({
                //*operal  api/auth por kon route celo backend tar name
                url:"/register",
                //* kon method backend thaka data make hoyca tar name
                method:'POST',
                //* body -> body thaka data pai tai 
                body:newUser
            })
        }),
        loginUser :builder.mutation({
            query:(client)=>({
                url:"/login",
                method:'POST',
                body:client
            }),
            credentials: 'include'
        }),
        logoutUser: builder.mutation({
            query:()=>({
                url:"/logout",
                method:'POST'
            })
        })
    })
})

export const {useRegisterUserMutation,useLoginUserMutation,useLogoutUserMutation} = authApi
export default authApi 