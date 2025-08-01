import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  leadStatus: string
  favoriteContent: string
  avatar: string
  firstName?: string
  lastName?: string
  jobTitle?: string
  lifecycleStage?: string
  contactOwner?: string
  createDate?: string
  lastActivityDate?: string
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
      name: "Brian Halligan (Sample Contact)",
      email: "bh@hubspot.com",
      phone: "--",
      leadStatus: "New",
      favoriteContent: "Blog Posts",
      avatar: "/placeholder-user.jpg",
      firstName: "Brian",
      lastName: "Halligan",
      jobTitle: "Executive Chairperson at HubSpot",
      lifecycleStage: "Customer",
      contactOwner: "Anil Kumar Pandiya",
      createDate: "07/23/2025",
      lastActivityDate: "--",
    },
    {
      id: "2",
      name: "Maria Johnson (Sample Contact)",
      email: "emailmaria@hubspot.com",
      phone: "--",
      leadStatus: "Qualified",
      favoriteContent: "Webinars",
      avatar: "/placeholder-user.jpg",
      firstName: "Maria",
      lastName: "Johnson",
      jobTitle: "Marketing Manager",
      lifecycleStage: "Lead",
      contactOwner: "Sarah Wilson",
      createDate: "07/22/2025",
      lastActivityDate: "1 day ago",
    },
    {
      id: "3",
      name: "TestUser Test",
      email: "t@hubspot.com",
      phone: "--",
      leadStatus: "New",
      favoriteContent: "Case Studies",
      avatar: "/placeholder-user.jpg",
      firstName: "TestUser",
      lastName: "Test",
      jobTitle: "Developer",
      lifecycleStage: "Subscriber",
      contactOwner: "Mike Davis",
      createDate: "07/21/2025",
      lastActivityDate: "2 days ago",
    },
  ],
  loading: false,
  error: null,
}

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Omit<Contact, "id" | "createDate" | "lastActivityDate">>) => {
      const newContact: Contact = {
        ...action.payload,
        id: Date.now().toString(),
        createDate: new Date().toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }),
        lastActivityDate: "Just now",
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
