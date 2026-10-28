import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import qs from 'qs'

import { API, FETCH_STATUS } from '../../shared/constants'
import {
  GoodsResponse,
  GoodsError,
  BrandListRequestParams,
  isSuccessResponse,
  isErrorResponse,
} from '../../shared/types'
import { isEmptyGoodsResponse } from '../../shared/helpers'

interface BrandListState {
  status: keyof typeof FETCH_STATUS
  data: string[]
  error: string
}

const initialState: BrandListState = {
  status: FETCH_STATUS.uninitialized,
  data: [],
  error: '',
}

export const fetchBrandList = createAsyncThunk(
  'brandList/fetchBrandList',
  async (params: BrandListRequestParams) => {
    const { data } = await axios.get<GoodsResponse | GoodsError>(
      `${API.getPrices}?${qs.stringify(params)}`
    )

    return data
  }
)

const brandListSlice = createSlice({
  name: 'brandList',
  initialState,
  reducers: {
    resetBrandList: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandList.pending, (state) => {
        state.status = FETCH_STATUS.loading
      })
      .addCase(fetchBrandList.fulfilled, (state, action) => {
        const payload = action.payload

        if (isSuccessResponse(payload)) {
          if (isEmptyGoodsResponse(payload)) {
            state.status = FETCH_STATUS.failed
            state.data = []
            state.error = 'Error: Not found!'
          } else {
            state.status = FETCH_STATUS.succeeded
            state.data = payload.goods.map((item) => item.brand)
            state.error = ''
          }
        }

        if (isErrorResponse(payload)) {
          state.status = FETCH_STATUS.failed
          state.data = []
          state.error = payload.error
        }
      })
      .addCase(fetchBrandList.rejected, (state, action) => {
        state.status = FETCH_STATUS.failed
        state.error = action.error.message || ''
        state.data = []
      })
  },
})

export const { resetBrandList } = brandListSlice.actions
export default brandListSlice.reducer
