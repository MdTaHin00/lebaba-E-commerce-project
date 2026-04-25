import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { get_Base_url } from '../../../utils/getBase_url'

const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        //* backend url 
        baseUrl: `${get_Base_url()}/api/orders`,
        //? backend a cors ar moda credentials true tai akana ai code
        credentials: 'include'
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({

        //! get order by email function
        //* backend get function tai -> builder.query
        getOrdersByEmail: builder.query({
            query: (email) => ({
                //* operal baseUrl por url 
                url: `/${email}`,
                method: "GET",
                providesTags: ['Order']
            })
        }),

        //! get order by id function
        getOrdersById: builder.query({
            query: (id) => ({
                //* operal baseUrl por url 
                url: `/order/${id}`,
                method: "GET",
                providesTags: ['Order']
            })
        }),

        //! get all orders
        getAllOrders: builder.query({
            query:()=>({
                url:"/",
                method:"GET",
                providesTags:['Order']
            })
        }),

        //! update order status by id
        //* backend patch function tai -> builder.mutation
        updateOrderStatus:builder.mutation({
          query:({id,status}) =>({
            url:`/update-order-status/${id}`,
            method:"PATCH",
            body:status
        }),
        invalidatesTags:["Order"]
        }),

        //! delete orders by id 
        //* backend delete function tai -> builder.mutation
        deleteOrderById:builder.mutation({
         query:(id) => ({
            url:`/delete-order/${id}`,
            method:"DELETE"
         }),
         invalidatesTags:(result,error,id) => [{type:"Order",id}]
        })
    })
})

export const {useGetOrdersByEmailQuery,useGetOrdersByIdQuery,useGetAllOrdersQuery,useUpdateOrderStatusMutation,useDeleteOrderByIdMutation} = orderApi ;

export default orderApi