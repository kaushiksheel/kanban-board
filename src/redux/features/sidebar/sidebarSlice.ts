
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SidebarState {
  isOpen: boolean
}

const initialState: SidebarState = {
  isOpen: false,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    openSidebar: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { openSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer