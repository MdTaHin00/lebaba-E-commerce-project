import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { get_Base_url } from '../../../utils/getBase_url'


const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: fetchBaseQuery({
        //! backend url 
        //* get_base_url -> utils folder getBase_url file function
        baseUrl: `${get_Base_url()}/api/reviews`,
        //? backend a cors ar moda credentials true tai akana ai code
        credentials: 'include'
    }),
    tagTypes:["Reviews"],
    endpoints:(builder) => ({

        //! add reviews fetch data
        //? backend ai api post method tai (builder.mutation)
    addReviews : builder.mutation({
        query:(reviewsData)=>({
            url:'/post-review',
            method:'POST',
            body: reviewsData
        }),
        invalidatesTags :(result,error,{postId}) => [{type:"Reviews",id:postId}]
    }),

    //!  reviews count fetch data
   //? backend ai api get method tai (builder.query)
    getReviewsCount: builder.query({
        query:()=>({
            url:"/total-reviews",
            method:"get"
        })
    }),

    //! get reviews by user id 
    getReviewsByUserId: builder.query({
        query:(userId)=>({
            url:`${userId}`
        }),
        providesTags:(result) => result ? [{type:"Reviews",id:result[0] ?.email}] : []
    })
    })
})

export const {useAddReviewsMutation,useGetReviewsCountQuery,useGetReviewsByUserIdQuery} = reviewsApi ;
export default reviewsApi
