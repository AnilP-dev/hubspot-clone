import { configureStore } from "@reduxjs/toolkit"
import contactsReducer from "./slices/contactsSlice"
import companiesReducer from "./slices/companiesSlice"
import dealsReducer from "./slices/dealsSlice"
import ticketsReducer from "./slices/ticketsSlice"

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    companies: companiesReducer,
    deals: dealsReducer,
    tickets: ticketsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
