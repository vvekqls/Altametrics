import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import invoiceReducer from './invoiceSlice'
import { invoicesApiSlice } from './invoicesApiSlice'

export const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    auth: authReducer,
    [invoicesApiSlice.reducerPath]: invoicesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(invoicesApiSlice.middleware)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch