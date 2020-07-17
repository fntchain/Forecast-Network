import { createSlice } from '@reduxjs/toolkit'

const initialLettryState = {
  isShowTimer: false,
  lottery: [],
  recordList: [],
  totalCount: 0,
  listLoading: false,
}
export const callTypes = {
  list: 'list',
}
export const lettrySlice = createSlice({
  name: 'lettry',
  initialState: initialLettryState,
  reducers: {
    startCall: (state, action) => {
      state.error = null
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true
      }
    },
    setShowTimer: (state, action) => {
      state.isShowTimer = action.payload
    },
    lotteryList: (state, action) => {
      state.lottery = action.payload
    },
    Records: (state, action) => {
      state.recordList = action.payload.data
      state.totalCount = parseInt(action.payload.total)
    },
  },
})
