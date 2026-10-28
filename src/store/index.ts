import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import bandListReducer from './slices/brandListSlice'
import goodsReducer from './slices/goodsSlice'

export const store = configureStore({
  reducer: {
    bandList: bandListReducer,
    goods: goodsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
