import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Deal {
  id: string
  name: string
  amount: string
  stage: string
  pipeline: string
  closeDate: string
  owner: string
  dealType: string
  priority: "Low" | "Medium" | "High"
  createDate: string
  lastActivityDate: string
  associatedContacts: string[]
  associatedCompanies: string[]
  recordSource: string
  lastContacted?: string
}

interface DealsState {
  deals: Deal[]
  loading: boolean
  error: string | null
}

const initialState: DealsState = {
  deals: [
    {
      id: "1",
      name: "abc",
      amount: "$21",
      stage: "Appointment Scheduled",
      pipeline: "Sales Pipeline",
      closeDate: "07/31/2025",
      owner: "Anil Kumar Pandiya",
      dealType: "New Business",
      priority: "Low",
      createDate: "07/23/2025",
      lastActivityDate: "--",
      associatedContacts: ["1"],
      associatedCompanies: ["1"],
      recordSource: "CRM UI",
    },
  ],
  loading: false,
  error: null,
}

const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    addDeal: (state, action: PayloadAction<Omit<Deal, "id" | "createDate">>) => {
      const newDeal: Deal = {
        ...action.payload,
        id: Date.now().toString(),
        createDate: new Date().toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }),
      }
      state.deals.unshift(newDeal)
    },
    updateDeal: (state, action: PayloadAction<Deal>) => {
      const index = state.deals.findIndex((deal) => deal.id === action.payload.id)
      if (index !== -1) {
        state.deals[index] = action.payload
      }
    },
    deleteDeal: (state, action: PayloadAction<string>) => {
      state.deals = state.deals.filter((deal) => deal.id !== action.payload)
    },
    deleteDeals: (state, action: PayloadAction<string[]>) => {
      state.deals = state.deals.filter((deal) => !action.payload.includes(deal.id))
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { addDeal, updateDeal, deleteDeal, deleteDeals, setLoading, setError } = dealsSlice.actions

export default dealsSlice.reducer
