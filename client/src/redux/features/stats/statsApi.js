import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { get_Base_url } from '../../../utils/getBase_url'

const statsApi = createApi({
    reducerPath:"statsApi",
    baseQuery:fetchBaseQuery({
        //* backed url
        baseUrl:`${get_Base_url()}/api/stats`,
        credentials:'include'
    }),

    tagTypes:['Stats'],

    endpoints: builder => ({
         
        //! get User Stats by Email function
        //* backend get function tai -> builder.query
        getUserStats : builder.query({
            query:(email)=>({
                url:`/user-stats/${email}`,
                method:"GET",
            }),
            providesTags:["Stats"]
        }),

        //! get admin stats 
        //* backend get function tai -> builder.query
        getAdminStats:builder.query({
            query:() =>({
                url:'/admin-stats',
                method:"GET",
            }),
            providesTags:["Stats"]
        })

    })
})

export const {useGetUserStatsQuery,useGetAdminStatsQuery} = statsApi ;
export default statsApi