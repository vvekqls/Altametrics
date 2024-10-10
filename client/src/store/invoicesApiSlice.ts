import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Meta {
  totalPages: number;
  total: number;
  limit: number
}

interface Invoice {
  id: number;
  vendorName: string;
  amount: number;
  dueDate: string;
  description: string;
  paid: boolean;
}

export const invoicesApiSlice = createApi({
  reducerPath: 'invoicesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => {
    return {
      getInvoices: builder.query<{ invoices: Invoice[], meta: Meta }, { page: number }>({
        query: ({ page }) =>
          `/invoices?page=${page}`
      }),
    }
  }
})

export const { useGetInvoicesQuery } = invoicesApiSlice;