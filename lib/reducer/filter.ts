import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type TFilterState = {
  search: string;
  category: string;
  sort: string;
  page: number;
}

const initialState: TFilterState = {
  search: '',
  category: '',
  sort: '',
  page: 1,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<TFilterState>>) => {
      return {
        ...state,
        ...action.payload
      }
    },
    resetFilter: () => initialState
  }
})

export const { setFilter, resetFilter } = filterSlice.actions
export default filterSlice.reducer
