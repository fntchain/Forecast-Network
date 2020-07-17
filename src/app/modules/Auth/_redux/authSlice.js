import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
  isLogin: false,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
    },
    login: (state, action) => {
      state.isLogin = true
      state.error = null
      state.user = action.payload
    },
    register: (state, action) => {
      state.isLogin = true
      state.error = null
      state.user = action.payload
    },
    loginOut: (state, action) => {
      state.isLogin = false
      state.error = null
      state.user = null
    },
    setBalance: (state, action) => {
      state.error = null
      let balance = parseInt(state.user.balance) + action.payload * 100000000
      state.user = { ...state.user, balance }
    },
    setUserInfo: (state, action) => {
      state.error = null
      state.user = action.payload
    },
  },
})
