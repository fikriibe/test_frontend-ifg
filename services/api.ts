import { RootState } from "@/lib/store";
import { TCategory, TProduct, TSortKeyOption } from "@/types/api";
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
  totalPages?: number
}



function sortProducts(items: TProduct[], sort?: string): TProduct[] {
  if (!sort) return items
  const sortKeys = sort?.split("_")
  return [...items].sort((a, b) => {
    const by = sortKeys[0] as keyof TProduct
    const order = sortKeys[1]
    if (['title', 'category'].includes(by)) {
      if (order == 'desc') return (b[by] as string).localeCompare(a[by] as string)
      return (a[by] as string).localeCompare(b[by] as string)
    }
    if(order === 'desc') return +b[by] - +a[by]
    return +a[by] - +b[by]
  })
}


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/products' }),
  tagTypes: ['Product', 'Category'] as const,
  endpoints(build) {
    return {
      products: build.query<TProductsRes, TProductsReq>({
        async queryFn(params, _api, _extraOptions, baseQuery) {
          const { category, page = 1, search, sort } = params
          const limit = 10
          if (!category && !search) {
            const skip = (page - 1) * limit
            let url = `/?skip=${skip}&limit=${limit}`
            if (sort) {
              const [sortBy,order] = sort.split('_')
              url+= `&sortBy=${sortBy}&order=${order}`
            }
            const res = await baseQuery(url)
            if (res.error) {
              return { error: res.error }
            }
            const data = res.data as Omit<TProductsRes, 'totalPages'>
            return { data: {...data, page, totalPages: Math.ceil(data.total / limit)} }
          }

          const [sFetch, cFetch] = await Promise.all([
            search ? baseQuery(`/search?q=${search}`) : null,
            category ? baseQuery(`/category/${category}`) : null
          ])

          if (sFetch?.error) return { error: sFetch.error }
          if (cFetch?.error) return { error: cFetch.error }

          const sRes = (sFetch?.data as TProductsRes | undefined)?.products
          const cRes = (cFetch?.data as TProductsRes | undefined)?.products

          let res = sRes ?? cRes
          if (sRes && cRes) {
            const cIds = cRes.map(({ id }) => id)
            res = sRes.filter((item) => cIds.includes(item.id))
          }
          const resSorted = sortProducts(res || [], sort as TSortKeyOption)
          const total = resSorted.length
          const totalPages = Math.max(1, Math.ceil(total / limit))
          const skip = (page - 1) * limit
          return {
            data: {
              products: resSorted.slice(skip, skip + limit),
              total,
              skip,
              limit,
              totalPages
            }
          }
        },
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
        async onQueryStarted(body, { dispatch, getState, queryFulfilled }) {
          const lists = api.util
            .selectInvalidatedBy(getState() as RootState, [{ type: 'Product', id: 'LIST' }])
            .filter(({ endpointName }) => endpointName === 'products')
          const tempId = Math.round(Math.random()) + 300
          const patches = lists.map(({ originalArgs }) =>
            dispatch(api.util.updateQueryData('products', originalArgs, (draft) => {
              draft.products.unshift({ ...body, id: tempId } as TProduct)
              if (draft.products.length > draft.limit) draft.products.pop()
              draft.total += 1
            }))
          )
          try {
            await queryFulfilled
          } catch {
            patches.forEach((p) => p.undo())
          }
        }
        // invalidatesTags: [{ type: 'Product', id: 'LIST' }]
      }),
      productUpdate: build.mutation<TProduct, { id: number } & Partial<TProduct>>({
        query: ({ id, ...body }) => ({ url: `/${id}`, method: 'PUT', body }),
        async onQueryStarted({ id, ...body }, { dispatch, getState, queryFulfilled }) {
            const cached = api.util.selectInvalidatedBy(getState() as RootState, [{ type: 'Product', id }])
            const patches = cached.map(({ endpointName, originalArgs }) =>
              endpointName === 'products'
                ? dispatch(api.util.updateQueryData('products', originalArgs, (draft) => {
                    const item = draft.products.find((p) => p.id === id)
                    if (item) Object.assign(item, body)
                  }))
                : dispatch(api.util.updateQueryData('product', originalArgs, (draft) => {
                    Object.assign(draft, body)
                  }))
            )

            try {
              await queryFulfilled
            } catch {
              patches.forEach((p) => p.undo())
            }
          },
        // invalidatesTags: (_res, _err, { id }) => [{ type: 'Product', id }]
      }),
      productDelete: build.mutation<void, number>({
        query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
        async onQueryStarted(id, { dispatch, getState, queryFulfilled }) {
          const lists = api.util
            .selectInvalidatedBy(getState() as RootState, [{ type: 'Product', id: 'LIST' }])
            .filter(({ endpointName }) => endpointName === 'products')
          const patches = lists.map(({ originalArgs }) =>
            dispatch(api.util.updateQueryData('products', originalArgs, (draft) => {
              draft.products = draft.products.filter((item) => item.id !== id)
              draft.total -= 1
            }))
          )
          try {
            await queryFulfilled
          } catch {
            patches.forEach((p) => p.undo())
          }
        }
        // invalidatesTags: [{ type: 'Product', id: 'LIST' }]
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
