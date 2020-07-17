import React, { Suspense, lazy } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LayoutSplashScreen, ContentRoute } from '../_metronic/layout'

const ProductEdit = lazy(() =>
  import('./pages/products/product-edit/ProductEdit')
)
const ProductsPage = lazy(() => import('./pages/products/ProductsPage'))
const IndexPage = lazy(() => import('./pages/index/Index'))
const DetailPage = lazy(() => import('./pages/index/Detail'))
const adminAddress = '17730437288488278440L'

const PrivateRoute = ({ component: Component, isLogin, address, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!isLogin) {
        return (
          <Redirect
            to={{ pathname: '/auth/login', state: props.location.pathname }}
          />
        )
      }
      if (address !== adminAddress) {
        return <Redirect to={{ pathname: '/' }} />
      }
      return <Component {...props} />
    }}
  />
)
export default function BasePage() {
  const { isLogin, user } = useSelector((state) => state.auth)
  let address = isLogin ? user.address : ''
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute exact path="/" component={IndexPage} />
        <PrivateRoute
          path="/products/new"
          component={ProductEdit}
          isLogin={isLogin}
          address={address}
        />
        <PrivateRoute
          path="/products/:id/edit"
          component={ProductEdit}
          isLogin={isLogin}
          address={address}
        />
        <PrivateRoute
          path="/products"
          component={ProductsPage}
          isLogin={isLogin}
          address={address}
        />
        <ContentRoute path="/assets/:id" component={DetailPage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  )
}
