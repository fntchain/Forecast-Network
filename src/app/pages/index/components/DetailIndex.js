import React, { Fragment } from 'react'
import Lottery from './Detail/Lottery'
import Seal from './Detail/Seal'
import GuessFrom from './Detail/GuessForm'
import RecordTable from './Detail/RecordTable'
export default function DetailIndex({ item }) {
  return (
    <Fragment>
      <div className="d-flex  flex-wrap border-bottom my-7">
        <div className="d-flex flex-lg-fill mr-7">
          <GuessFrom
            assetsName={item.api_assets_name}
            id={item.id}
            issue={item.issue}
          />
        </div>
        <div className="d-flex flex-shrink-0 flex-column">
          <Seal
            issue={item.issue}
            sealTime={item.seal_time}
            startTime={item.start_time}
            Interval={item.interval - item.seal_time}
            id={item.id}
          />
          <Lottery id={item.id} />
        </div>
      </div>
      <div className="d-flex  flex-wrap">
        <RecordTable id={item.id} />
      </div>
    </Fragment>
  )
}
