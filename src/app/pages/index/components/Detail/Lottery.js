import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../../../redux/lettry/lettryActions'
export default function Lottery({ id }) {
  const { lottery } = useSelector((state) => state.lettry)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.fetchLottery(id))
  }, [dispatch, id])
  return (
    <Fragment>
      {lottery.map((item) => (
        <div className="d-flex align-items-center mb-5" key={item.id}>
          <div className="d-flex flex-lg-fill mr-20">{item.period}期</div>
          <div className="d-flex flex-lg-fill">${item.price}</div>
        </div>
      ))}
    </Fragment>
  )
}
