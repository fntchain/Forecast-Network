import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { LayoutSplashScreen } from '../../../../_metronic/layout'
import * as actions from '../_redux/authActions'
import { connect } from 'react-redux'

class Logout extends Component {
  componentDidMount() {
    //actions.logout()
    this.props.signOut()
  }

  render() {
    const { isLogin } = this.props
    return isLogin ? <LayoutSplashScreen /> : <Redirect to="/auth/login" />
  }
}

export default connect((state) => state.auth, actions)(Logout)
