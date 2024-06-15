import { current, PayloadAction, AsyncThunk, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from 'utils/http'

const initialState: any = {
  currencyList: [],
  loading: false,
  currentRequestCurrencyId: 1
}

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers(builder) {}
})

const currencyReducer = currencySlice.reducer

export default currencyReducer
