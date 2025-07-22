import { configureStore } from "@reduxjs/toolkit"
import contactsReducer from "./slices/contactsSlice"
import companiesReducer from "./slices/companiesSlice"
import dealsReducer from "./slices/dealsSlice"

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    companies: companiesReducer,
    deals: dealsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
