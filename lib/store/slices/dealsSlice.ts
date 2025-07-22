import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Deal {
  id: string
  name: string
  amount?: string
  stage?: string
  probability?: string
  closeDate?: string
  owner?: string
  company?: string
  createDate?: string
  lastActivity?: string
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
      name: "Acme Corp - Q1 Deal",
      amount: "$50,000",
      stage: "Proposal",
      probability: "75%",
      closeDate: "2024-03-31",
      owner: "Sarah Johnson",
      company: "Acme Corp",
      createDate: "2024-01-15",
      lastActivity: "2 days ago",
    },
    {
      id: "2",
      name: "TechCorp - Annual Contract",
      amount: "$25,000",
      stage: "Negotiation",
      probability: "50%",
      closeDate: "2024-02-28",
      owner: "Mike Wilson",
      company: "TechCorp",
      createDate: "2024-01-10",
      lastActivity: "1 day ago",
    },
  ],
  loading: false,
  error: null,
}

const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    addDeal: (state, action: PayloadAction<Omit<Deal, "id" | "createDate" | "lastActivity">>) => {
      const newDeal: Deal = {
        ...action.payload,
        id: Date.now().toString(),
        createDate: new Date().toISOString().split("T")[0],
        lastActivity: "Just now",
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { addDeal, updateDeal, deleteDeal, setLoading, setError } = dealsSlice.actions

export default dealsSlice.reducer
