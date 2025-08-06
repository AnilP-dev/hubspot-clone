import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Task {
  id: string
  title: string
  type: "To-do" | "Call" | "Email" | "Meeting"
  status: "Not started" | "In progress" | "Completed" | "Waiting on contact" | "Deferred"
  associatedContact?: string
  associatedCompany?: string
  lastContacted?: string
  lastEngagement?: string
  dueDate: string
  priority: "High" | "Medium" | "Low" | "None"
  assignedTo: string
  queue?: string
  notes?: string
  reminder?: string
  createdDate: string
  modifiedDate: string
}

interface TasksState {
  tasks: Task[]
  loading: boolean
  error: string | null
}

const initialState: TasksState = {
  tasks: [
    {
      id: "1",
      title: "TASK-A",
      type: "To-do",
      status: "Not started",
      dueDate: "August 1, 2025 8:00 AM",
      priority: "None",
      assignedTo: "Rituparn Gehlot",
      createdDate: "2025-07-29",
      modifiedDate: "2025-07-29",
    },
  ],
  loading: false,
  error: null,
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.unshift(action.payload)
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = action.payload
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
    deleteTasks: (state, action: PayloadAction<string[]>) => {
      state.tasks = state.tasks.filter((task) => !action.payload.includes(task.id))
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { addTask, updateTask, deleteTask, deleteTasks, setLoading, setError } = tasksSlice.actions

export default tasksSlice.reducer
