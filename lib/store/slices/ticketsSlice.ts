import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Ticket, FilterType } from "@/lib/types"

interface TicketsState {
  tickets: Ticket[]
  filteredTickets: Ticket[]
  selectedTickets: string[]
  searchTerm: string
  filterType: FilterType
  isLoading: boolean
}

const initialState: TicketsState = {
  tickets: [
    {
      id: "1",
      name: "Refund-issue",
      description: "Customer requesting refund for recent purchase",
      pipeline: "Support Pipeline",
      status: "New (Support Pipeline)",
      source: "Email",
      owner: "Anil Kumar Pandiya",
      priority: "Low",
      createDate: "Jul 1, 2025 11:39 PM GMT+5:30",
      lastActivityDate: "Jul 1, 2025 11:39 PM GMT+5:30",
      associatedContact: "Brian Halligan (Sample Contact)",
      associatedCompany: "HubSpot",
    },
  ],
  filteredTickets: [],
  selectedTickets: [],
  searchTerm: "",
  filterType: "all",
  isLoading: false,
}

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<Omit<Ticket, "id">>) => {
      const newTicket: Ticket = {
        ...action.payload,
        id: Date.now().toString(),
      }
      state.tickets.unshift(newTicket)
      ticketsSlice.caseReducers.applyFilters(state)
    },
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      const index = state.tickets.findIndex((ticket) => ticket.id === action.payload.id)
      if (index !== -1) {
        state.tickets[index] = action.payload
        ticketsSlice.caseReducers.applyFilters(state)
      }
    },
    deleteTicket: (state, action: PayloadAction<string>) => {
      state.tickets = state.tickets.filter((ticket) => ticket.id !== action.payload)
      state.selectedTickets = state.selectedTickets.filter((id) => id !== action.payload)
      ticketsSlice.caseReducers.applyFilters(state)
    },
    deleteSelectedTickets: (state) => {
      state.tickets = state.tickets.filter((ticket) => !state.selectedTickets.includes(ticket.id))
      state.selectedTickets = []
      ticketsSlice.caseReducers.applyFilters(state)
    },
    setSelectedTickets: (state, action: PayloadAction<string[]>) => {
      state.selectedTickets = action.payload
    },
    toggleTicketSelection: (state, action: PayloadAction<string>) => {
      const ticketId = action.payload
      if (state.selectedTickets.includes(ticketId)) {
        state.selectedTickets = state.selectedTickets.filter((id) => id !== ticketId)
      } else {
        state.selectedTickets.push(ticketId)
      }
    },
    selectAllTickets: (state) => {
      state.selectedTickets = state.filteredTickets.map((ticket) => ticket.id)
    },
    clearSelection: (state) => {
      state.selectedTickets = []
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
      ticketsSlice.caseReducers.applyFilters(state)
    },
    setFilterType: (state, action: PayloadAction<FilterType>) => {
      state.filterType = action.payload
      ticketsSlice.caseReducers.applyFilters(state)
    },
    applyFilters: (state) => {
      let filtered = [...state.tickets]

      // Apply search filter
      if (state.searchTerm) {
        const searchLower = state.searchTerm.toLowerCase()
        filtered = filtered.filter(
          (ticket) =>
            ticket.name.toLowerCase().includes(searchLower) ||
            ticket.description.toLowerCase().includes(searchLower) ||
            ticket.status.toLowerCase().includes(searchLower) ||
            ticket.owner.toLowerCase().includes(searchLower),
        )
      }

      // Apply type filter
      switch (state.filterType) {
        case "my":
          filtered = filtered.filter((ticket) => ticket.owner === "Anil Kumar Pandiya")
          break
        case "unassigned":
          filtered = filtered.filter((ticket) => !ticket.owner || ticket.owner === "")
          break
        default:
          break
      }

      state.filteredTickets = filtered
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const {
  addTicket,
  updateTicket,
  deleteTicket,
  deleteSelectedTickets,
  setSelectedTickets,
  toggleTicketSelection,
  selectAllTickets,
  clearSelection,
  setSearchTerm,
  setFilterType,
  applyFilters,
  setLoading,
} = ticketsSlice.actions

export default ticketsSlice.reducer
