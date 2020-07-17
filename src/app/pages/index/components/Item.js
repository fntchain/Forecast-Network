/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Timer from './Timer'
import Price from './Price'
import DetailIndex from './DetailIndex'
import { Link } from 'react-router-dom'
export default function Item({ item, action = 'list' }) {
  return (
    <div className="card card-custom gutter-b">
      <div className="card-body">
        <Link to={`/assets/${item.id}`}>
          <div className="d-flex">
            <div className="d-flex flex-shrink-0 mr-7">
              <div className="symbol symbol-50 symbol-lg-120">
                <img alt="Pic" src={item.icon} />
              </div>
            </div>

            <div className=" d-flex flex-lg-fill mr-7 flex-column justify-content-around">
              <div className="mr-3">
                <span className="d-flex align-items-center text-dark text-hover-primary font-size-h5 font-weight-bold mr-3">
                  {item.assets_name}
                </span>
              </div>
              <Price assetsName={item.api_assets_name} />
              <span className="text-dark-50">
                {item.totalIuess}issues have been opened, there are{' '}
                {item.expIuess}
                issues
              </span>
            </div>
            <Timer
              startTime={item.start_time}
              Interval={item.interval - item.seal_time}
              number={item.number}
              issue={item.issue}
              id={item.id}
              action={action}
            />
          </div>
        </Link>
        <div className="separator separator-solid my-7"></div>
        {action === 'list' ? (
          <div className="d-flex align-items-center flex-wrap">
            <div className="d-flex align-items-center flex-shrink-0 mr-7 my-1">
              <span className="mr-4">
                <i className="flaticon-piggy-bank icon-2x text-muted font-weight-bold"></i>
              </span>
              <div className="d-flex flex-column text-dark-75">
                <span className="font-weight-bolder font-size-sm">
                  Total bet amount(Day)
                </span>
                <span className="font-weight-bolder font-size-h5">
                  <span className="text-dark-50 font-weight-bold">FNT</span>
                  {item.totalAmount}
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center flex-shrink-0 mr-7 my-1">
              <span className="mr-4">
                <i className="flaticon-confetti icon-2x text-muted font-weight-bold"></i>
              </span>
              <div className="d-flex flex-column text-dark-75">
                <span className="font-weight-bolder font-size-sm">Amount</span>
                <span className="font-weight-bolder font-size-h5">
                  <span className="text-dark-50 font-weight-bold">FNT</span>
                  {item.currentAmount}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <DetailIndex item={item} />
        )}
      </div>
    </div>
  )
}
