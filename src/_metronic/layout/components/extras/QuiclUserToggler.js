/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import objectPath from 'object-path'
import { useHtmlClassService } from '../../_core/MetronicLayout'
import { UserProfileDropdown } from './dropdowns/UserProfileDropdown'
import { useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
export function QuickUserToggler(props) {
  const history = useHistory()
  const { isLogin } = useSelector((state) => state.auth)
  const uiService = useHtmlClassService()
  const layoutProps = useMemo(() => {
    return {
      offcanvas:
        objectPath.get(uiService.config, 'extras.user.layout') === 'offcanvas',
    }
  }, [uiService])
  const checkUser = () => {
    if (!isLogin) {
      history.push({
        pathname: '/auth/login',
        state: history.location.pathname,
      })
    }
  }
  return (
    <>
      {layoutProps.offcanvas && (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="quick-user-tooltip">View user</Tooltip>}
        >
          <div className="topbar-item">
            <div
              className="btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
              id={isLogin ? 'kt_quick_user_toggle' : ''}
              onClick={checkUser}
            >
              <span className="svg-icon svg-icon-xl svg-icon-primary">
                <Avatar src={isLogin ? '/media/users/100_1.jpg' : null} />
              </span>
              <>
                {/* <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">
                  Hi,
                </span>
                <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">
                  {user?.username}
                </span> */}
                {/* <span className="symbol symbol-35 symbol-light-success">
                  <span className="symbol-label font-size-h5 font-weight-bold">
                    {user?.username}
                  </span>
                </span> */}
              </>
            </div>
          </div>
        </OverlayTrigger>
      )}

      {!layoutProps.offcanvas && <UserProfileDropdown />}
    </>
  )
}
