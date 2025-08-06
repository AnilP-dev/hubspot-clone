import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Message {
  id: string
  content: string
  timestamp: string
  sender: "contact" | "agent"
  type: "email" | "chat" | "call"
  attachments?: string[]
}

export interface Conversation {
  id: string
  contactName: string
  contactEmail: string
  contactAvatar: string
  subject: string
  preview: string
  status: "open" | "closed"
  assignedTo?: string
  channel: "email" | "chat" | "call"
  company?: string
  lastMessageTime: string
  isUnread: boolean
  messages: Message[]
  createdDate: string
  modifiedDate: string
}

interface ConversationsState {
  conversations: Conversation[]
  selectedConversationId: string | null
  loading: boolean
  error: string | null
}

const initialState: ConversationsState = {
  conversations: [
    {
      id: "1",
      contactName: "Maria Johnson (Sample Contact)",
      contactEmail: "emailmaria@hubspot.com",
      contactAvatar: "MJ",
      subject: "New email channel connected to HubSpot",
      preview: "You connected rituparn.g@turing.com Any new em...",
      status: "open",
      channel: "email",
      company: "HubSpot",
      lastMessageTime: "2m",
      isUnread: true,
      messages: [
        {
          id: "msg-1",
          content: "You connected rituparn.g@turing.com 🎉\n\nAny new emails sent to this address will also appear here. Choose what you'd like to do next:\n\nTry it out\nSend yourself an email at rituparn.g@turing.com\n\nManage email channel settings\nPersonalize your emails with a team signature. Go to email channel settings",
          timestamp: "2025-07-29T17:30:00Z",
          sender: "contact",
          type: "email",
        },
      ],
      createdDate: "2025-07-29T17:30:00Z",
      modifiedDate: "2025-07-29T17:30:00Z",
    },
  ],
  selectedConversationId: "1",
  loading: false,
  error: null,
}

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.unshift(action.payload)
    },
    updateConversation: (state, action: PayloadAction<Conversation>) => {
      const index = state.conversations.findIndex((conv) => conv.id === action.payload.id)
      if (index !== -1) {
        state.conversations[index] = action.payload
      }
    },
    deleteConversation: (state, action: PayloadAction<string>) => {
      state.conversations = state.conversations.filter((conv) => conv.id !== action.payload)
    },
    addMessage: (state, action: PayloadAction<{ conversationId: string; message: Message }>) => {
      const conversation = state.conversations.find((conv) => conv.id === action.payload.conversationId)
      if (conversation) {
        conversation.messages.push(action.payload.message)
        conversation.lastMessageTime = "now"
        conversation.modifiedDate = new Date().toISOString()
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const conversation = state.conversations.find((conv) => conv.id === action.payload)
      if (conversation) {
        conversation.isUnread = false
      }
    },
    setSelectedConversation: (state, action: PayloadAction<string | null>) => {
      state.selectedConversationId = action.payload
    },
    closeConversation: (state, action: PayloadAction<string>) => {
      const conversation = state.conversations.find((conv) => conv.id === action.payload)
      if (conversation) {
        conversation.status = "closed"
        conversation.modifiedDate = new Date().toISOString()
      }
    },
    assignConversation: (state, action: PayloadAction<{ conversationId: string; assignedTo: string }>) => {
      const conversation = state.conversations.find((conv) => conv.id === action.payload.conversationId)
      if (conversation) {
        conversation.assignedTo = action.payload.assignedTo
        conversation.modifiedDate = new Date().toISOString()
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
  addConversation,
  updateConversation,
  deleteConversation,
  addMessage,
  markAsRead,
  setSelectedConversation,
  closeConversation,
  assignConversation,
  setLoading,
  setError,
} = conversationsSlice.actions

export default conversationsSlice.reducer
