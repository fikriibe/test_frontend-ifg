import { TStep1Schema, TStep2Schema, TStep3Schema } from "@/schema/formCreate";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type TFormCreateState = {
  currentStep: number
  isTouch: boolean
  step1: Partial<TStep1Schema>,
  step2: Partial<TStep2Schema>,
  step3: Partial<TStep3Schema>
}

const initialState: TFormCreateState = {
  currentStep: 1,
  isTouch: false,
  step1: {},
  step2: {},
  step3: {},
}

const formCreateSlice = createSlice({
  name: 'formCreate',
  initialState,
  reducers: {
    submitStep1: (state, action: PayloadAction<Partial<TStep1Schema>>) => {
      return {...state, step1: action.payload, isTouch: true, currentStep: 2 }
    },
    submitStep2: (state, action: PayloadAction<Partial<TStep2Schema>>) => {
      return {...state, step2: action.payload, isTouch: true, currentStep: 3 }
    },
    submitStep3: (state, action: PayloadAction<Partial<TStep3Schema>>) => {
      return {...state, step3: action.payload, isTouch: true, currentStep: 4 }
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      return {...state, currentStep: action.payload}
    },
    resetStep: () => {
      return initialState
    }
  }
})

export const { submitStep1, submitStep2, submitStep3, setCurrentStep, resetStep } = formCreateSlice.actions
export default formCreateSlice.reducer
