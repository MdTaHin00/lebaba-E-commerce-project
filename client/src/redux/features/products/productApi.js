import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { get_Base_url } from '../../../utils/getBase_url'

//* query -> get method
//* mutation -> put,patch,delete

const productApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        //! backend url 
        //* get_base_url -> utils folder getBase_url file function
        baseUrl: `${get_Base_url()}/api/products`,
        //? backend a cors ar moda credentials true tai akana ai code
        credentials: 'include'
    }),
    tagTypes: ["products"],
    endpoints: (builder) => ({

        //! all products data fetch method
        //? backend ai api get method tai (builder.query)
        fetchAllProduct: builder.query({
            //* backend thaka ja query receve korva
            query: ({ category, color, minPrice, maxPrice, page = 1, limit = 8 }) => {
                //* URLSearchParams -> string query search kola
                const queryParams = new URLSearchParams({
                    category: category || '',
                    color: color || '',
                    minPrice: minPrice || 0,
                    maxPrice: maxPrice || '',
                    //* backend thaka number asva tai string
                    page: page.toString(),
                    limit: limit.toString()
                })
                //* total query ka return koram
                return `/?${queryParams}`
            },
            //* operal Tag call
            providesTags: ['products']
        }),


        //! single product data fetch method 
        //? backend ai api get method tai (builder.query)
        fetchProductById: builder.query({
            //* backend id params kolay sai id
            query: (id) => `/${id}`,
            //* new product add hova tai ai kas
            //*  ata id deya kas , tai ai code 
            providesTags: (result, id) => [{ type: "products", id }]

        }),


        //! add product fetch method
        //? backend ai api post method tai (builder.mutation)
        addProduct: builder.mutation({
            query: (newProduct) => ({
                //* url -> operal baseUrl por bake url
                url: '/create-product',
                method: 'POST',
                body: newProduct
            }),
            //* new product add hova tai ai kas
            //? operal function run koral code
            invalidatesTags: ["products"]
        }),


        //! update product fetch method
        //? backend ai api patch method tai (builder.mutation)
        updateProduct: builder.mutation({
            //* ...bodyData -> backend ar all data naya
            query: ({ id, ...bodyData }) => ({
                //* url -> operal baseUrl por bake url
                url: `/update-product/${id}`,
                method: 'PATCH',
                body: bodyData
            }),
            //* new product add hova tai ai kas
            //? operal function run koral code
            invalidatesTags: ["products"]
        }),


        //! delete product fetch method
        //? backend ai api delete method tai (builder.mutation)
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            //* new product add hova tai ai kas
            //*  ata id deya kas , tai ai code         
            invalidatesTags: (result, id) => [{ type: 'products', id }]
        })

    })
})

export const { useFetchAllProductQuery, useFetchProductByIdQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation} = productApi

export default productApi;