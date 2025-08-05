import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Playbook {
  id: string
  name: string
  status: "Published" | "Draft" | "Archived"
  totalViews: number
  lastViewed?: string
  createdBy: string
  modifiedAt: string
  createdDate: string
  description?: string
  steps?: string[]
}

interface PlaybooksState {
  playbooks: Playbook[]
  loading: boolean
  error: string | null
}

const initialState: PlaybooksState = {
  playbooks: [
    {
      id: "1",
      name: "Discovery Call Script",
      status: "Published",
      totalViews: 0,
      lastViewed: undefined,
      createdBy: "HubSpot",
      modifiedAt: "3 minutes ago",
      createdDate: "2025-07-30T12:00:00Z",
      description: "A comprehensive script for discovery calls to understand prospect needs",
      steps: [
        "Introduction and rapport building",
        "Understand current situation",
        "Identify pain points",
        "Present solution overview",
        "Next steps discussion"
      ]
    },
    {
      id: "2",
      name: "Qualification Call Script",
      status: "Published",
      totalViews: 0,
      lastViewed: undefined,
      createdBy: "HubSpot",
      modifiedAt: "3 minutes ago",
      createdDate: "2025-07-30T12:00:00Z",
      description: "Script for qualifying leads and determining fit",
      steps: [
        "Verify contact information",
        "Assess budget and timeline",
        "Confirm decision-making process",
        "Evaluate technical requirements",
        "Schedule next meeting"
      ]
    },
  ],
  loading: false,
  error: null,
}

const playbooksSlice = createSlice({
  name: "playbooks",
  initialState,
  reducers: {
    addPlaybook: (state, action: PayloadAction<Playbook>) => {
      state.playbooks.unshift(action.payload)
    },
    updatePlaybook: (state, action: PayloadAction<Playbook>) => {
      const index = state.playbooks.findIndex((playbook) => playbook.id === action.payload.id)
      if (index !== -1) {
        state.playbooks[index] = action.payload
      }
    },
    deletePlaybook: (state, action: PayloadAction<string>) => {
      state.playbooks = state.playbooks.filter((playbook) => playbook.id !== action.payload)
    },
    deletePlaybooks: (state, action: PayloadAction<string[]>) => {
      state.playbooks = state.playbooks.filter((playbook) => !action.payload.includes(playbook.id))
    },
    incrementViews: (state, action: PayloadAction<string>) => {
      const playbook = state.playbooks.find((p) => p.id === action.payload)
      if (playbook) {
        playbook.totalViews += 1
        playbook.lastViewed = new Date().toISOString()
        playbook.modifiedAt = "just now"
      }
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
  addPlaybook, 
  updatePlaybook, 
  deletePlaybook, 
  deletePlaybooks, 
  incrementViews,
  setLoading, 
  setError 
} = playbooksSlice.actions

export default playbooksSlice.reducer