import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface List {
  id: string
  name: string
  size: number
  type: "Static" | "Active"
  object: "Contact" | "Company" | "Deal" | "Contacts" | "Companies" | "Deals" | "Tickets" | "Carts" | "Orders"
  lastUpdated: string
  creator: string
  folder: string | null
  usedInCount: number
  description?: string
}

interface ListsState {
  lists: List[]
  loading: boolean
  error: string | null
}

const initialState: ListsState = {
  lists: [
  ],
  loading: false,
  error: null,
}

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<List>) => {
      state.lists.unshift(action.payload)
    },
    updateList: (state, action: PayloadAction<List>) => {
      const index = state.lists.findIndex((list) => list.id === action.payload.id)
      if (index !== -1) {
        state.lists[index] = action.payload
      }
    },
    deleteList: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter((list) => list.id !== action.payload)
    },
    deleteLists: (state, action: PayloadAction<string[]>) => {
      state.lists = state.lists.filter((list) => !action.payload.includes(list.id))
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { addList, updateList, deleteList, deleteLists, setLoading, setError } = listsSlice.actions

export default listsSlice.reducer
