import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DroppedElement {
  id: string
  type: string
  content?: string
  style?: Record<string, any>
}

export interface Email {
  id: string
  name: string
  delivered: number
  openRate: string
  clickRate: string
  lastUpdatedAt: string
  lastUpdatedBy: string
  status: 'draft' | 'scheduled' | 'sent' | 'archived'
  type: 'marketing' | 'automated' | 'transactional'
  createdAt: string
  updatedAt: string
  // Email builder data
  subject?: string
  previewText?: string
  fromName?: string
  fromAddress?: string
  content?: DroppedElement[]
  template?: string
}

interface EmailState {
  emails: Email[]
  loading: boolean
  error: string | null
}

// Initialize from localStorage if available, otherwise use default
const getInitialEmails = (): Email[] => {
  if (typeof window === 'undefined') {
    // SSR fallback
    return [
      {
        id: '1',
        name: 'Test email',
        delivered: 0,
        openRate: '0%',
        clickRate: '0%',
        lastUpdatedAt: 'August 7, 2025\n7:08 PM',
        lastUpdatedBy: 'Rituporn Gehlot',
        status: 'draft',
        type: 'marketing',
        createdAt: new Date('2025-08-07T19:08:00').toISOString(),
        updatedAt: new Date('2025-08-07T19:08:00').toISOString()
      },
    ]
  }

  try {
    const storedEmails = localStorage.getItem('emails')
    if (storedEmails) {
      return JSON.parse(storedEmails)
    }
  } catch (error) {
    console.error('Error loading emails from localStorage:', error)
  }

  // Default emails if localStorage is empty or has errors
  const defaultEmails = [
    {
      id: '1',
      name: 'Test email',
      delivered: 0,
      openRate: '0%',
      clickRate: '0%',
      lastUpdatedAt: 'August 7, 2025\n7:08 PM',
      lastUpdatedBy: 'Rituporn Gehlot',
      status: 'draft',
      type: 'marketing',
      createdAt: new Date('2025-08-07T19:08:00').toISOString(),
      updatedAt: new Date('2025-08-07T19:08:00').toISOString()
    },
  ]
  
  // Save default emails to localStorage
  localStorage.setItem('emails', JSON.stringify(defaultEmails))
  return defaultEmails
}

const initialState: EmailState = {
  emails: getInitialEmails(),
  loading: false,
  error: null
}

const emailsSlice = createSlice({
  name: 'emails',
  initialState,
  reducers: {
    setEmails: (state, action: PayloadAction<Email[]>) => {
      state.emails = action.payload
    },
    addEmail: (state, action: PayloadAction<Email>) => {
      state.emails.push(action.payload)
      // Sync to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('emails', JSON.stringify(state.emails))
      }
    },
    updateEmail: (state, action: PayloadAction<{ id: string; email: Partial<Email> }>) => {
      const { id, email } = action.payload
      const existingEmail = state.emails.find(e => e.id === id)
      if (existingEmail) {
        Object.assign(existingEmail, email, { updatedAt: new Date().toISOString() })
        // Sync to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('emails', JSON.stringify(state.emails))
        }
      }
    },
    removeEmail: (state, action: PayloadAction<string>) => {
      state.emails = state.emails.filter(email => email.id !== action.payload)
      // Sync to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('emails', JSON.stringify(state.emails))
      }
    },
    removeEmails: (state, action: PayloadAction<string[]>) => {
      state.emails = state.emails.filter(email => !action.payload.includes(email.id))
      // Sync to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('emails', JSON.stringify(state.emails))
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    }
  }
})

export const { 
  setEmails,
  addEmail, 
  updateEmail, 
  removeEmail, 
  removeEmails, 
  setLoading, 
  setError 
} = emailsSlice.actions

export default emailsSlice.reducer