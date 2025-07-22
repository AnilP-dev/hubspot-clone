import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Company {
  id: string
  name: string
  domain?: string
  industry?: string
  employees?: string
  revenue?: string
  owner?: string
  createDate?: string
  lastActivity?: string
}

interface CompaniesState {
  companies: Company[]
  loading: boolean
  error: string | null
}

const initialState: CompaniesState = {
  companies: [
    {
      id: "1",
      name: "Acme Corp",
      domain: "acme.com",
      industry: "Technology",
      employees: "100-500",
      revenue: "$1M-$5M",
      owner: "Sarah Johnson",
      createDate: "2024-01-15",
      lastActivity: "2 days ago",
    },
    {
      id: "2",
      name: "TechCorp",
      domain: "techcorp.com",
      industry: "Software",
      employees: "50-100",
      revenue: "$500K-$1M",
      owner: "Mike Wilson",
      createDate: "2024-01-10",
      lastActivity: "1 day ago",
    },
  ],
  loading: false,
  error: null,
}

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<Omit<Company, "id" | "createDate" | "lastActivity">>) => {
      const newCompany: Company = {
        ...action.payload,
        id: Date.now().toString(),
        createDate: new Date().toISOString().split("T")[0],
        lastActivity: "Just now",
      }
      state.companies.unshift(newCompany)
    },
    updateCompany: (state, action: PayloadAction<Company>) => {
      const index = state.companies.findIndex((company) => company.id === action.payload.id)
      if (index !== -1) {
        state.companies[index] = action.payload
      }
    },
    deleteCompany: (state, action: PayloadAction<string>) => {
      state.companies = state.companies.filter((company) => company.id !== action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { addCompany, updateCompany, deleteCompany, setLoading, setError } = companiesSlice.actions

export default companiesSlice.reducer
