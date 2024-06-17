import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCurrencyList = createAsyncThunk('currency/getCurrencyList', async (_, thunkAPI) => {
  try {
    const response = await axios.get('https://interview.switcheo.com/prices.json')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

const initialState: any = {
  currencyList: [],
  loading: true,
  currentRequestCurrencyId: 1
}

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCurrencyList.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getCurrencyList.fulfilled, (state, action) => {
        state.currencyList = action.payload
        state.loading = false
      })
      .addCase(getCurrencyList.rejected, (state, action) => {
        state.loading = true
      })
  }
})

const currencyReducer = currencySlice.reducer

export default currencyReducer
