/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../redux/projects/productsActions'
import Item from './components/Item'

export default function Index() {
  const { assetsList } = useSelector((state) => state.products)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.fetchAssets())
  }, [dispatch])
  return assetsList.map((item) => <Item item={item} key={item.id} />)
}
