import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface List {
  id: string
  name: string
  size: number
  type: "Static" | "Active"
  object: "Contact" | "Company" | "Deal"
  lastUpdated: string
  creator: string
  folder: string
  usedInCount: number
}

interface ListsState {
  lists: List[]
  loading: boolean
  error: string | null
}

const initialState: ListsState = {
  lists: [
    {
      id: "1",
      name: "Deal List 7/28/2025 4:58:35 AM",
      size: 0,
      type: "Static",
      object: "Deal",
      lastUpdated: "Jul 28, 2025 2:30 PM",
      creator: "Rituparn Gehlot",
      folder: "",
      usedInCount: 0,
    },
    {
      id: "2",
      name: "Contact List 7/27/2025 9:15:12 AM",
      size: 8,
      type: "Active",
      object: "Contact",
      lastUpdated: "Jul 27, 2025 10:00 AM",
      creator: "Alex Morgan",
      folder: "Leads",
      usedInCount: 0,
    },
    {
      id: "3",
      name: "Company List 7/25/2025 11:45:00 AM",
      size: 25,
      type: "Static",
      object: "Company",
      lastUpdated: "Jul 25, 2025 12:00 PM",
      creator: "Priya Singh",
      folder: "",
      usedInCount: 2,
    },
    {
      id: "4",
      name: "Deal List 7/24/2025 8:20:10 AM",
      size: 5,
      type: "Active",
      object: "Deal",
      lastUpdated: "Jul 24, 2025 9:00 AM",
      creator: "Rituparn Gehlot",
      folder: "Opportunities",
      usedInCount: 3,
    },
    {
      id: "5",
      name: "Contact List 7/23/2025 3:33:33 PM",
      size: 0,
      type: "Static",
      object: "Contact",
      lastUpdated: "Jul 23, 2025 4:00 PM",
      creator: "Alex Morgan",
      folder: "",
      usedInCount: 0,
    },
    {
      id: "6",
      name: "Company List 7/22/2025 7:07:07 AM",
      size: 18,
      type: "Active",
      object: "Company",
      lastUpdated: "Jul 22, 2025 8:00 AM",
      creator: "Priya Singh",
      folder: "Clients",
      usedInCount: 1,
    },
    {
      id: "7",
      name: "Deal List 7/21/2025 6:06:06 AM",
      size: 30,
      type: "Static",
      object: "Deal",
      lastUpdated: "Jul 21, 2025 7:00 AM",
      creator: "Rituparn Gehlot",
      folder: "",
      usedInCount: 4,
    },
    {
      id: "8",
      name: "Contact List 7/20/2025 5:05:05 PM",
      size: 2,
      type: "Active",
      object: "Contact",
      lastUpdated: "Jul 20, 2025 6:00 PM",
      creator: "Alex Morgan",
      folder: "Prospects",
      usedInCount: 2,
    },
    {
      id: "9",
      name: "Company List 7/19/2025 4:04:04 PM",
      size: 10,
      type: "Static",
      object: "Company",
      lastUpdated: "Jul 19, 2025 5:00 PM",
      creator: "Priya Singh",
      folder: "",
      usedInCount: 0,
    },
    {
      id: "10",
      name: "Deal List 7/18/2025 3:03:03 AM",
      size: 7,
      type: "Active",
      object: "Deal",
      lastUpdated: "Jul 18, 2025 4:00 AM",
      creator: "Rituparn Gehlot",
      folder: "Archive",
      usedInCount: 1,
    }
  ],
  loading: false,
  error: null,
}

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<Omit<List, "id">>) => {
      const newList: List = {
        ...action.payload,
        id: Date.now().toString(),
      }
      state.lists.unshift(newList)
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