import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import qs from 'qs'

import { API, FETCH_STATUS } from '../../shared/constants'
import {
  GoodsResponse,
  GoodsError,
  GoodsRequestParams,
  isSuccessResponse,
  isErrorResponse,
  Good,
} from '../../shared/types'

interface GoodsState {
  status: keyof typeof FETCH_STATUS
  data: Good[]
  error: string
}

const initialState: GoodsState = {
  status: FETCH_STATUS.uninitialized,
  data: [],
  error: '',
}

export const fetchGoods = createAsyncThunk(
  'goods/fetchGoods',
  async (params: GoodsRequestParams) => {
    const { data } = await axios.get<GoodsResponse | GoodsError>(
      `${API.getPrices}?${qs.stringify(params)}`
    )

    return data
  }
)

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    resetGoods: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = FETCH_STATUS.loading
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        const payload = action.payload

        if (isSuccessResponse(payload)) {
          const goodsData = payload.goods

          if (goodsData && goodsData[0] && goodsData[0].analogues) {
            state.status = FETCH_STATUS.succeeded
            state.data = goodsData[0].analogues
            state.error = ''
          } else {
            state.status = FETCH_STATUS.failed
            state.data = []
            state.error = 'Error: Wrong response structure!'
            // NOTE: тут на самом деле неочень понятно ТЗ
            // бывают ситуации, когда поля analogues нет
            // но в основной структуре есть данные о товаре
            // может надо было его отображать - т.е. таблица всего с 1 позицией?
          }
        }

        if (isErrorResponse(payload)) {
          state.status = FETCH_STATUS.failed
          state.data = []
          state.error = payload.error
        }
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.status = FETCH_STATUS.failed
        state.error = action.error.message || ''
        state.data = []
      })
  },
})

export const { resetGoods } = goodsSlice.actions
export default goodsSlice.reducer
