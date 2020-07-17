import React from 'react'
import { ListsWidget1, ListsWidget4 } from '../../../_partials/widgets'
export function Sidebar() {
  return (
    <div
      className="sidebar sidebar-left d-flex flex-row-auto flex-column"
      id="kt_sidebar"
    >
      <div className="sidebar-content flex-column-fluid pb-10 pt-9 px-5 px-lg-10">
        <div className="card card-custom bg-light-success card-shadowless gutter-b">
          <div className="card-body my-3">
            <a
              href="###"
              className="card-title font-weight-bolder text-success text-hover-state-dark font-size-h6 mb-4 d-block"
            >
              SAP UI Progress
            </a>
            <div className="font-weight-bold text-muted font-size-sm">
              <span className="text-dark-75 font-size-h2 font-weight-bolder mr-2">
                67%
              </span>
              Average
            </div>
            <div className="progress progress-xs mt-7 bg-success-o-60">
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: '67%' }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>

        <div className="card card-custom bg-light-warning card-shadowless gutter-b">
          <div className="card-body my-4">
            <a
              href="###"
              className="card-title font-weight-bolder text-warning font-size-h6 mb-4 text-hover-state-dark d-block"
            >
              Airplus Budget
            </a>
            <div className="font-weight-bold text-muted font-size-sm">
              <span className="text-dark-75 font-weight-bolder font-size-h2 mr-2">
                87K%
              </span>
              23k to goal
            </div>
            <div className="progress progress-xs mt-7 bg-warning-o-60">
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                style={{ width: '87%' }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>

        <ListsWidget1 className="card-shadowless gutter-b bg-light" />

        <ListsWidget4 className="card-shadowless gutter-b bg-light" />
      </div>
    </div>
  )
}
