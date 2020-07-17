import { authSlice } from './authSlice'

const { actions } = authSlice

export const register = (params) => (dispatch, getState, { socket }) => {
  return new Promise((resolve, reject) => {
    socket.emit('register', params, (data) => {
      if (data.state === 200) {
        dispatch(actions.register(data.account))
        resolve(data.account)
      } else {
        reject(data)
      }
    })
  })
}

export const login = (params) => (dispatch, getState, { socket }) => {
  return new Promise((resolve, reject) => {
    socket.emit('login', params, (data) => {
      if (data.state) {
        reject(data)
      } else {
        let account = { ...data[0], passphrase: params.passphrase }
        dispatch(actions.login(account))
        resolve()
      }
    })
  })
}

export function signOut() {
  return async (dispatch) => {
    dispatch(actions.loginOut())
  }
}
export const setBalance = (balance) => (dispatch) => {
  return dispatch(actions.setBalance(balance))
}

export const prizeBalance = (balance) => (dispatch) => {
  return dispatch(actions.setBalance(balance))
}

export const userInfo = (params) => (dispatch, getState, { socket }) => {
  return new Promise((resolve, reject) => {
    socket.emit('userInfo', params, (data) => {
      dispatch(actions.setUserInfo(data))
      resolve()
    })
  })
}
