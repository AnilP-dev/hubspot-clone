import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Snippet {
  id: string
  name: string
  text: string
  shortcut: string
  createdBy: string
  dateCreated: string
  dateModified: string
}

interface SnippetsState {
  snippets: Snippet[]
  loading: boolean
  error: string | null
}

const initialState: SnippetsState = {
  snippets: [
    {
      id: "1",
      name: "snippet-test",
      text: "This is a test snippet content that can be quickly inserted using keyboard shortcuts.",
      shortcut: "test",
      createdBy: "Rituparn Gehlot",
      dateCreated: "a few seconds ago",
      dateModified: "a few seconds ago"
    }
  ],
  loading: false,
  error: null,
}

const snippetsSlice = createSlice({
  name: "snippets",
  initialState,
  reducers: {
    addSnippet: (state, action: PayloadAction<Snippet>) => {
      state.snippets.unshift(action.payload)
    },
    updateSnippet: (state, action: PayloadAction<Snippet>) => {
      const index = state.snippets.findIndex((snippet) => snippet.id === action.payload.id)
      if (index !== -1) {
        state.snippets[index] = action.payload
      }
    },
    deleteSnippet: (state, action: PayloadAction<string>) => {
      state.snippets = state.snippets.filter((snippet) => snippet.id !== action.payload)
    },
    deleteSnippets: (state, action: PayloadAction<string[]>) => {
      state.snippets = state.snippets.filter((snippet) => !action.payload.includes(snippet.id))
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
  addSnippet, 
  updateSnippet, 
  deleteSnippet, 
  deleteSnippets, 
  setLoading, 
  setError 
} = snippetsSlice.actions

export default snippetsSlice.reducer