import { TCategory, TProduct } from "@/types/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type TProductsReq = Partial<{
  sort: string
  page: number
  category: string
  search: string
}>

type TProductsRes = {
  products: TProduct[]
  total: number
  skip: number
  limit: number
}



export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/products' }),
  tagTypes: ['Product', 'Category'] as const,
  endpoints(build) {
    return {
      products: build.query<TProductsRes, TProductsReq>({
        query: (params) => ({
          url: '/',
          params
        }),
        providesTags: (res) => res ?
          [
            ...res.products.map(({ id }) => ({ type: 'Product' as const, id })),
            { type: "Product", id: 'LIST' }
          ]
          : [{ type: "Product", id: 'LIST' }]
      }),
      categories: build.query<TCategory[], void>({
        query: () => ({ url: '/categories' }),
        providesTags: ['Category']
      }),
      product: build.query<TProduct, number>({
        query: (id) => ({ url: `/${id}` }),
        providesTags: (_res, _err, id) => [{ type: 'Product', id }]
      }),
      productAdd: build.mutation<TProduct, Partial<TProduct>>({
        query: (body) => ({ url: '/add', method: 'POST', body }),
        invalidatesTags: [{ type: 'Product', id: 'LIST' }]
      }),
      productUpdate: build.mutation<TProduct, { id: number } & Partial<TProduct>>({
        query: ({ id, ...body }) => ({ url: `/${id}`, method: 'PUT', body }),
        invalidatesTags: (_res, _err, { id }) => [{ type: 'Product', id }]
      }),
      productDelete: build.mutation<void, number>({
        query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
        invalidatesTags: [{ type: 'Product', id: 'LIST' }]
      })
    }
  }
})

export const {
  useProductsQuery,
  useProductQuery,
  useCategoriesQuery,
  useProductAddMutation,
  useProductDeleteMutation,
  useProductUpdateMutation
} = api
