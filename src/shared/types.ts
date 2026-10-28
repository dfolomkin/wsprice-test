import { AxiosRequestConfig } from 'axios'

export interface BrandListRequestParams extends AxiosRequestConfig {
  key: string
  number: string
}

export interface GoodsRequestParams extends BrandListRequestParams {
  brand?: string
  analogues?: 'on'
}

export interface Warehouse {
  code: string
  id: string
  own: boolean
  shipmentDate: Date
  price: number
  stock: number
  notRefund: boolean
}

export interface Good {
  goodsID: string
  brand: string
  number: string
  name: string
  count: number
  price: number
  rate: number
  analogues: Good[]
  warehouses: Warehouse[]
  notRefund: boolean
}

export interface GoodsResponse {
  goods: Good[]
}

export interface GoodsError {
  error: string
}

export const isSuccessResponse = (
  res: GoodsResponse | GoodsError
): res is GoodsResponse => (res as GoodsResponse).goods !== undefined

export const isErrorResponse = (
  res: GoodsResponse | GoodsError
): res is GoodsError => (res as GoodsError).error !== undefined
