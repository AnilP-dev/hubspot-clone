import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  jobTitle?: string
  leadStatus?: string
  lifecycleStage?: string
  owner?: string
  lastActivity?: string
  createDate?: string
  source?: string
  firstName?: string
  lastName?: string
}

interface ContactsState {
  contacts: Contact[]
  loading: boolean
  error: string | null
}

const initialState: ContactsState = {
  contacts: [
    {
      id: "1",
      name: "John Doe",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      company: "Acme Corp",
      jobTitle: "Marketing Manager",
      leadStatus: "New",
      lifecycleStage: "Lead",
      owner: "Sarah Johnson",
      lastActivity: "2 days ago",
      createDate: "2024-01-15",
      source: "Website",
    },
    {
      id: "2",
      name: "Jane Smith",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@techcorp.com",
      phone: "+1 (555) 987-6543",
      company: "TechCorp",
      jobTitle: "Sales Director",
      leadStatus: "Qualified",
      lifecycleStage: "Marketing Qualified Lead",
      owner: "Mike Wilson",
      lastActivity: "1 day ago",
      createDate: "2024-01-10",
      source: "LinkedIn",
    },
    {
      id: "3",
      name: "Bob Johnson",
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob.johnson@startup.io",
      phone: "+1 (555) 456-7890",
      company: "Startup Inc",
      jobTitle: "CEO",
      leadStatus: "Contacted",
      lifecycleStage: "Sales Qualified Lead",
      owner: "Sarah Johnson",
      lastActivity: "3 hours ago",
      createDate: "2024-01-20",
      source: "Referral",
    },
  ],
  loading: false,
  error: null,
}

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Omit<Contact, "id" | "createDate" | "lastActivity">>) => {
      const newContact: Contact = {
        ...action.payload,
        id: Date.now().toString(),
        createDate: new Date().toISOString().split("T")[0],
        lastActivity: "Just now",
        name: `${action.payload.firstName || ""} ${action.payload.lastName || ""}`.trim() || action.payload.email,
      }
      state.contacts.unshift(newContact)
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex((contact) => contact.id === action.payload.id)
      if (index !== -1) {
        state.contacts[index] = action.payload
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload)
    },
    deleteContacts: (state, action: PayloadAction<string[]>) => {
      state.contacts = state.contacts.filter((contact) => !action.payload.includes(contact.id))
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { addContact, updateContact, deleteContact, deleteContacts, setLoading, setError } = contactsSlice.actions

export default contactsSlice.reducer
