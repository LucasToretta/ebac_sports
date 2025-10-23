import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Product {
  price: any
  title: any
  id: number
  nome: string
  preco: number
  imagem: string
}

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-ebac.vercel.app/api/'
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'ebac_sports'
    })
  })
})

export const { useGetProductsQuery } = cartApi
