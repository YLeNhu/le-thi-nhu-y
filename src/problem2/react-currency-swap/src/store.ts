import { configureStore } from '@reduxjs/toolkit'
import currencyReducer from 'pages/CurrencySwap/currency.slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: { blog: currencyReducer }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
