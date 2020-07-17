import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../redux/projects/productsActions'
import Item from './components/Item'
export default function Detail(props) {
  const { assetsDetail } = useSelector((state) => state.products)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.fetchAssetsById(props.match.params.id))
  }, [dispatch, props.match.params.id])

  return (
    <Fragment>
      {assetsDetail ? <Item item={assetsDetail} action="edit" /> : null}
    </Fragment>
  )
}
