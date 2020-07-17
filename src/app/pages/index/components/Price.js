import React, { useEffect, useState } from 'react'
import moment from 'moment-timezone'
moment.tz.setDefault('Asia/Shanghai')
export default function Timer({ assetsName }) {
  const [price, setPrice] = useState(0)
  useEffect(() => {
    let socket = new window.WebSocket(
      `wss://ws.coincap.io/prices?assets=${assetsName}`
    )
    socket.onmessage = function(event) {
      let currentPrice = JSON.parse(event.data)[assetsName]
      currentPrice = Number(currentPrice).toFixed(3)
      setPrice(currentPrice)
    }

    return () => socket.close()
  }, [assetsName])

  return (
    <div className=" font-weight-bold font-size-h3 py-2 py-lg-2 mr-5 text-dark">
      $<span id="price">{price}</span>
    </div>
  )
}
