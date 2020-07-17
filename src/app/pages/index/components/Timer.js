import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment-timezone'
import * as actions from '../../../../redux/projects/productsActions'
import * as lettryActions from '../../../../redux/lettry/lettryActions'
import { getEndTime } from '../../utils'
moment.tz.setDefault('Asia/Shanghai')
export default function Timer({
  startTime,
  Interval,
  issue,
  number,
  id,
  action = 'list',
}) {
  const [time, setTime] = useState('00:00')
  const [period, setPeriod] = useState(Number(issue))
  const dispath = useDispatch()
  let currentIssue = Number(issue)
  useEffect(() => {
    let endTime = getEndTime(startTime, Interval)
    if (action === 'edit') {
      if (moment().unix() - (endTime - Interval) <= 60) {
        dispath(lettryActions.setShowTimer(true))
      }
    }

    const timer = setInterval(() => {
      let interval = parseInt(Interval)
      let nowTime = moment().unix()
      let expTime = endTime - nowTime
      if (expTime <= 0) {
        endTime = endTime + interval
        expTime = endTime - nowTime
        setPeriod(period + 1)
        currentIssue += 1
        dispath(lettryActions.getNumber({ currentIssue, id }))
        if (action === 'edit') {
          dispath(lettryActions.setShowTimer(true))
          dispath(
            actions.setDetailIssue({
              interval: interval,
              issue: currentIssue,
            })
          )
        } else {
          dispath(
            actions.setIssue({
              interval: interval,
              id,
              issue: currentIssue,
            })
          )
        }
      }
      var m = Math.floor(expTime / 60)
      var s = Math.floor(expTime - m * 60)
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      setTime(m + ':' + s)
    }, 1000)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="d-flex flex-shrink-0 mr-7 flex-column justify-content-around text-center">
      <span className="mr-4 text-dark-50">Only from the {period} draw</span>
      <div className="mt-4 mt-sm-0 font-size-h1 text-dark">{time}</div>
      <span className="mr-4 text-dark-50">当前参与人数{number}人</span>
    </div>
  )
}
