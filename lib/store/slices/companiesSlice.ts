import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Company {
  id: string
  name: string
  domain?: string
  owner?: string
  phone?: string
  createDate?: string
  lastActivityDate?: string
  industry?: string
  city?: string
  state?: string
  country?: string
  employees?: number
  annualRevenue?: number
  description?: string
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
      name: "HubSpot",
      domain: "hubspot.com",
      owner: "Anil Kumar Pandiya",
      phone: "+1-888-482-7768",
      createDate: "07/23/2025",
      lastActivityDate: "1 day ago",
      industry: "Software",
      city: "Cambridge",
      state: "Massachusetts",
      country: "United States",
      employees: 5000,
      annualRevenue: 1000000000,
      description: "Inbound marketing, sales, and service software",
    },
    {
      id: "2",
      name: "Acme Corporation",
      domain: "acme.com",
      owner: "Sarah Wilson",
      phone: "+1-555-123-4567",
      createDate: "07/22/2025",
      lastActivityDate: "2 days ago",
      industry: "Manufacturing",
      city: "New York",
      state: "New York",
      country: "United States",
      employees: 1000,
      annualRevenue: 50000000,
      description: "Manufacturing and industrial solutions",
    },
    {
      id: "3",
      name: "TechStart Inc",
      domain: "techstart.io",
      owner: "Mike Davis",
      phone: "+1-555-987-6543",
      createDate: "07/21/2025",
      lastActivityDate: "3 days ago",
      industry: "Technology",
      city: "San Francisco",
      state: "California",
      country: "United States",
      employees: 50,
      annualRevenue: 5000000,
      description: "Innovative technology solutions for startups",
    },
  ],
  loading: false,
  error: null,
}

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<Omit<Company, "id" | "createDate" | "lastActivityDate">>) => {
      const newCompany: Company = {
        ...action.payload,
        id: Date.now().toString(),
        createDate: new Date().toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }),
        lastActivityDate: "Just now",
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
    deleteCompanies: (state, action: PayloadAction<string[]>) => {
      state.companies = state.companies.filter((company) => !action.payload.includes(company.id))
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { addCompany, updateCompany, deleteCompany, deleteCompanies, setLoading, setError } =
  companiesSlice.actions

export default companiesSlice.reducer
