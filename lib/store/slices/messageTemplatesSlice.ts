import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface MessageTemplate {
  id: string
  name: string
  subject: string
  content: string
  owner: string
  dateCreated: string
  dateModified: string
  folder?: string
  sharedWithEveryone: boolean
}

interface MessageTemplatesState {
  templates: MessageTemplate[]
  loading: boolean
  error: string | null
}

const initialState: MessageTemplatesState = {
  templates: [
    {
      id: "1",
      name: "test",
      subject: "Test Subject",
      content: "This is a test message template content.",
      owner: "Rituparn Gehlot",
      dateCreated: "a day ago",
      dateModified: "a day ago",
      sharedWithEveryone: false
    }
  ],
  loading: false,
  error: null,
}

const messageTemplatesSlice = createSlice({
  name: "messageTemplates",
  initialState,
  reducers: {
    addTemplate: (state, action: PayloadAction<MessageTemplate>) => {
      state.templates.unshift(action.payload)
    },
    updateTemplate: (state, action: PayloadAction<MessageTemplate>) => {
      const index = state.templates.findIndex((template) => template.id === action.payload.id)
      if (index !== -1) {
        state.templates[index] = action.payload
      }
    },
    deleteTemplate: (state, action: PayloadAction<string>) => {
      state.templates = state.templates.filter((template) => template.id !== action.payload)
    },
    deleteTemplates: (state, action: PayloadAction<string[]>) => {
      state.templates = state.templates.filter((template) => !action.payload.includes(template.id))
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { 
  addTemplate, 
  updateTemplate, 
  deleteTemplate, 
  deleteTemplates, 
  setLoading, 
  setError 
} = messageTemplatesSlice.actions

export default messageTemplatesSlice.reducer