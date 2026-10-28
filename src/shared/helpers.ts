import { EMPTY_RESPONSE_USER_ID } from './constants'
import { GoodsResponse } from './types'

export const isEmptyGoodsResponse = (data: GoodsResponse) => {
  const goods = data.goods

  if (
    goods &&
    goods.length === 1 &&
    goods[0].goodsID === EMPTY_RESPONSE_USER_ID
  ) {
    return true
  }

  return false
}
