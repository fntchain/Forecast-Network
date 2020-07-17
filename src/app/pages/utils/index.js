import moment from 'moment-timezone'
import axios from 'axios'
moment.tz.setDefault('Asia/Shanghai')

export function getEndTime(startTime, interval) {
  startTime = parseInt(startTime)
  let nowTime = moment().unix() // 当前时间
  let usedTime = nowTime - startTime
  let endTime = startTime + interval
  if (nowTime <= endTime) return endTime
  return startTime + Math.ceil(usedTime / interval) * interval
}

export function getPrice(asstesName, cancelToken) {
  return axios.get(`https://api.coincap.io/v2/assets/${asstesName}`, {
    cancelToken,
  })
}
