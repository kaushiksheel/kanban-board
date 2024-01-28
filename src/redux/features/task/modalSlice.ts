import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface NewTaskModal {
  isOpen: boolean
}

const initialState: NewTaskModal = {
  isOpen: false,
}

export const taskModalSlice = createSlice({
  name: 'taskModal',
  initialState,
  reducers: {
    openModal: (state,action:PayloadAction<boolean>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isOpen=action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const {  openModal} = taskModalSlice.actions

export default taskModalSlice.reducer