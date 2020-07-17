import React, { useMemo, useEffect, useState } from 'react'
import objectPath from 'object-path'
// LayoutContext
import { useHtmlClassService } from '../_core/MetronicLayout'
// Import Layout components
import { Header } from './header/Header'
import { HeaderMobile } from './header-mobile/HeaderMobile'
import { Footer } from './footer/Footer'
import { LayoutInit } from './LayoutInit'
import { QuickPanel } from './extras/offcanvas/QuickPanel'
import { QuickUser } from './extras/offcanvas/QuickUser'
import { ScrollTop } from './extras/ScrollTop'
import * as action from '../../../app/modules/Auth/_redux/authActions'
import * as prodAction from '../../../redux/lettry/lettryActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../app/components/Message'
//import { StickyToolbar } from './extras/StickyToolbar'
// import { Sidebar } from './sidebar/Sidebar'

export function Layout({ children, location }) {
  const uiService = useHtmlClassService()
  const { isLogin, user } = useSelector((state) => state.auth)
  const [state, setState] = useState(false)
  const [register, setRegister] = useState(location.state)
  const dispatch = useDispatch()
  const closed = () => {
    setState(false)
    setRegister(false)
  }
  useEffect(() => {
    window.socket.on('number', (data) => {
      dispatch(prodAction.setALLNumber(data))
    })
    if (isLogin && !register) {
      dispatch(action.userInfo(user))
    }
    if (isLogin) {
      window.socket.on(`awards_${user.address}`, (data) => {
        dispatch(action.prizeBalance(data.balance))
      })
    }
    //
    if (register) {
      setState(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, register])
  // Layout settings (cssClasses/cssAttributes)
  const layoutProps = useMemo(() => {
    return {
      layoutConfig: uiService.config,
      selfLayout: objectPath.get(uiService.config, 'self.layout'),
      asideDisplay: objectPath.get(uiService.config, 'aside.self.display'),
      subheaderDisplay: objectPath.get(uiService.config, 'subheader.display'),
      desktopHeaderDisplay: objectPath.get(
        uiService.config,
        'header.self.fixed.desktop'
      ),
      contentCssClasses: uiService.getClasses('content', true),
      contentContainerClasses: uiService.getClasses('content_container', true),
      contentExtended: objectPath.get(uiService.config, 'content.extended'),
    }
  }, [uiService])

  return layoutProps.selfLayout !== 'blank' ? (
    <>
      {/*begin::Main*/}
      <HeaderMobile />
      <div className="d-flex flex-column flex-root">
        {/*begin::Page*/}
        <div className="d-flex flex-row flex-column-fluid page">
          {/* {layoutProps.asideDisplay && <Aside />} */}
          {/*begin::Wrapper*/}
          <div
            className="d-flex flex-column flex-row-fluid wrapper"
            id="kt_wrapper"
          >
            <Header />
            {/*begin::Content*/}
            <div
              id="kt_content"
              className={`content ${layoutProps.contentCssClasses} d-flex flex-column flex-column-fluid`}
            >
              {/* {layoutProps.subheaderDisplay && <SubHeader />} */}
              {/*begin::Entry*/}
              {!layoutProps.contentExtended && (
                <div className="d-flex flex-column-fluid">
                  {/*begin::Container*/}
                  <div className={layoutProps.contentContainerClasses}>
                    {children}
                  </div>
                  {/*end::Container*/}
                </div>
              )}

              {layoutProps.contentExtended && { children }}
              {/*end::Entry*/}
            </div>
            {/*end::Content*/}
          </div>
          {/*end::Wrapper*/}
          {/* <Sidebar /> */}
        </div>
        {/*end::Page*/}
      </div>
      <Footer />
      <QuickUser />
      <QuickPanel />
      <ScrollTop />
      {/* <StickyToolbar /> */}
      {/*end::Main*/}
      <Message
        open={state}
        message="The system has successfully recharged 100FNT for you"
        type="info"
        timeout={10000}
        vertical="bottom"
        horizontal="right"
        onClose={() => closed()}
      />
      <LayoutInit />
    </>
  ) : (
    // BLANK LAYOUT
    <div className="d-flex flex-column flex-root">{children}</div>
  )
}
