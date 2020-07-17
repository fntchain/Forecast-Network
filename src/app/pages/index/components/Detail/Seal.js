import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment-timezone'
// import * as actions from '../../../../redux/projects/productsActions'
import * as lettryActions from '../../../../../redux/lettry/lettryActions'
import { getEndTime } from '../../../utils'
moment.tz.setDefault('Asia/Shanghai')
const initialFilter = {
  pageNumber: 1,
  pageSize: 10,
}
export default function Lottery({ issue, startTime, Interval, sealTime, id }) {
  const { isShowTimer } = useSelector((state) => state.lettry)
  const { isLogin, user } = useSelector((state) => state.auth)
  initialFilter.address = isLogin ? user.address : ''
  initialFilter.id = id
  const [time, setTime] = useState('00:00')
  const dispatch = useDispatch()
  useEffect(() => {
    let timer = null
    let seal_time = parseInt(sealTime)

    if (isShowTimer) {
      if (isLogin)
        setTimeout(
          () => dispatch(lettryActions.fetchRecord(initialFilter)),
          1000
        )
      timer = setInterval(() => {
        let endTime = getEndTime(startTime, Interval)
        let expTime = endTime - Interval + seal_time - moment().unix()
        if (expTime <= 0) {
          clearInterval(timer)
          dispatch(lettryActions.setShowTimer(false))
          setTimeout(() => dispatch(lettryActions.fetchLottery(id)), 1000)
          if (isLogin) {
            setTimeout(
              () => dispatch(lettryActions.fetchRecord(initialFilter)),
              1000
            )
          }
        }
        var m = Math.floor(expTime / 60)
        var s = Math.floor(expTime - m * 60)
        m = m < 10 ? '0' + m : m
        s = s < 10 ? '0' + s : s
        setTime(m + ':' + s)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [Interval, dispatch, id, isLogin, isShowTimer, sealTime, startTime])
  return (
    <Fragment>
      {isShowTimer ? (
        <Fragment>
          <div className="d-flex align-items-center mb-5 justify-content-around">
            <div className="mr-4">{issue - 1}期</div>
            <div className=" ">封盘中</div>
          </div>
          <div className="d-flex align-items-center mb-10 justify-content-around">
            <div className="font-size-h6 mr-4">开奖倒计时</div>
            <div className=" ">{time}</div>
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  )
}
