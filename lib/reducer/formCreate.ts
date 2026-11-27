import { TStep1Schema, TStep2Schema, TStep3Schema } from "@/schema/formCreate";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type TFormCreateState = {
  step1?: Partial<TStep1Schema>,
  step2?: Partial<TStep2Schema>,
  step3?: Partial<TStep3Schema>
}

const initialState: TFormCreateState = {}

const formCreateSlice = createSlice({
  name: 'formCreate',
  initialState,
  reducers: {
    setStep1: (state, action: PayloadAction<Partial<TStep1Schema>>) => {
      return {...state, step1: action.payload}
    },
    setStep2: (state, action: PayloadAction<Partial<TStep2Schema>>) => {
      return {...state, step2: action.payload}
    },
    setStep3: (state, action: PayloadAction<Partial<TStep3Schema>>) => {
      return {...state, step3: action.payload}
    },
  }
})

export const { setStep1, setStep2, setStep3 } = formCreateSlice.actions
export default formCreateSlice.reducer
