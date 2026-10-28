import { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'

import { SearchBar } from '../components/SearchBar'
import { SelectableList } from '../components/SelectableList'
import { DataTable } from '../components/DataTable'

import { FETCH_STATUS, USER_ID } from '../shared/constants'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchBrandList, resetBrandList } from '../store/slices/brandListSlice'
import { fetchGoods, resetGoods } from '../store/slices/goodsSlice'

export const Catalog: React.FC = () => {
  const dispatch = useAppDispatch()
  const [searchQuery, setSearchQuery] = useState('')

  const brandList = useAppSelector((state) => state.bandList)
  const goods = useAppSelector((state) => state.goods)

  const handleSearchChange = (partNumber: string) => {
    setSearchQuery(partNumber)

    if (partNumber !== '') {
      dispatch(
        fetchBrandList({
          key: USER_ID,
          number: partNumber,
        })
      )
    } else {
      dispatch(resetBrandList())
    }

    dispatch(resetGoods())
  }

  const handleSelectBrand = (brandName: string) => {
    if (searchQuery !== '') {
      dispatch(
        fetchGoods({
          key: USER_ID,
          number: searchQuery,
          brand: brandName,
          analogues: 'on',
        })
      )
    }
  }

  return (
    <>
      <div className="mb-3 mt-3">
        <SearchBar onChange={handleSearchChange} />
      </div>

      {brandList.status === FETCH_STATUS.loading && (
        <div className="d-flex justify-content-center mb-3">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {(brandList.status === FETCH_STATUS.succeeded ||
        brandList.status === FETCH_STATUS.failed) && (
        <div className="mb-3">
          <SelectableList
            data={brandList.data}
            error={brandList.error}
            onSelect={handleSelectBrand}
          />
        </div>
      )}

      {goods.status === FETCH_STATUS.loading && (
        <div className="d-flex justify-content-center mb-3">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {(goods.status === FETCH_STATUS.succeeded ||
        goods.status === FETCH_STATUS.failed) && (
        <div className="mb-3">
          <DataTable data={goods.data} error={goods.error} />
        </div>
      )}
    </>
  )
}
