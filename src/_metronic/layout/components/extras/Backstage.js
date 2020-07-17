/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import { FlipToBack } from '@material-ui/icons'
const adminAddress = '17730437288488278440L'
export function BackstageToggler() {
  const history = useHistory()
  const { isLogin, user } = useSelector((state) => state.auth)
  return (
    <>
      {isLogin && user?.address === adminAddress ? (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="quick-user-tooltip">Backstage</Tooltip>}
        >
          <div className="topbar-item">
            <div
              className="btn btn-icon btn-clean btn-lg mr-1"
              onClick={() => history.push('/products')}
            >
              <span className="svg-icon svg-icon-xl svg-icon-primary">
                <Avatar>
                  <FlipToBack />
                </Avatar>
              </span>
            </div>
          </div>
        </OverlayTrigger>
      ) : null}
    </>
  )
}
