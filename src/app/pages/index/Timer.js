import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment-timezone'
import * as actions from '../../../redux/projects/productsActions'
moment.tz.setDefault('Asia/Shanghai')
function getEndTime(startTime, interval) {
  startTime = parseInt(startTime)
  let nowTime = moment().unix() // 当前时间
  let usedTime = nowTime - startTime
  let endTime = startTime + interval
  if (nowTime <= endTime) return endTime
  return startTime + Math.ceil(usedTime / interval) * interval
}
export default function Timer({ startTime, Interval, issue, number,id }) {
  const [time, setTime] = useState('00:00')
  const [period, setPeriod] = useState(Number(issue))
  const dispath = useDispatch()
  useEffect(() => {
    dispath(actions.setIssue({ start_time: startTime, interval: Interval,id}))
    let endTime = getEndTime(startTime, Interval)
    const timer = setInterval(() => {
      let interval = parseInt(Interval)
      let start_time = parseInt(startTime)
      let nowTime = moment().unix()
      let expTime = endTime - nowTime
      if (expTime <= 0) {
        endTime = getEndTime(start_time, interval)
        expTime = endTime - nowTime
        setPeriod(period + 1)
        dispath(actions.setIssue({ start_time, interval,id }))
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
      <div className="mt-4 mt-sm-0 font-size-h1">{time}</div>
      <span className="mr-4 text-dark-50">Current participation:{number}</span>
    </div>
  )
}
