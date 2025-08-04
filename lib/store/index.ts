import { configureStore } from "@reduxjs/toolkit"
import contactsReducer from "./slices/contactsSlice"
import companiesReducer from "./slices/companiesSlice"
import dealsReducer from "./slices/dealsSlice"
import ticketsReducer from "./slices/ticketsSlice"
import listsReducer from "./slices/listsSlice"
import tasksReducer from "./slices/tasksSlice"
import conversationsReducer from "./slices/conversationsSlice"
import playbooksReducer from "./slices/playbooksSlice"
import messageTemplatesReducer from "./slices/messageTemplatesSlice"
import snippetsReducer from "./slices/snippetsSlice"

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    companies: companiesReducer,
    deals: dealsReducer,
    tickets: ticketsReducer,
    lists: listsReducer,
    tasks: tasksReducer,
    conversations: conversationsReducer,
    playbooks: playbooksReducer,
    messageTemplates: messageTemplatesReducer,
    snippets: snippetsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
