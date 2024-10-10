import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Invoice {
  id: number;
  vendorName: string;
  amount: number;
  dueDate: string;
  description: string;
  paid: boolean;
}


interface InitialState {
  invoice: Invoice | null;
}

const initialState: InitialState = {
  invoice: null
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoice = action.payload
    },
  },
})

export const { setInvoice } = invoiceSlice.actions
export default invoiceSlice.reducer