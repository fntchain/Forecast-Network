import { lettrySlice } from './lettrySlice'
import { productsSlice } from '../projects/productsSlice'
const { actions } = lettrySlice
const { actions: prodActions } = productsSlice
export const setShowTimer = (state) => (dispatch) => {
  return dispatch(actions.setShowTimer(state))
}

export const fetchLottery = (id) => (dispatch, getState, { socket }) => {
  return new Promise((resolve, reject) => {
    socket.emit('lottery', id, (data) => {
      dispatch(actions.lotteryList(data))
      resolve()
    })
  })
}
export const saveRecord = (params) => (dispatch, getState, { socket }) => {
  return new Promise((resolve, reject) => {
    socket.emit('saveRecord', params, (data) => {
      if (data.state === 200) {
        resolve(data.message)
      } else {
        reject(data.message)
      }
    })
  })
}

export const getNumber = (params) => (dispatch, getState, { socket }) => {
  socket.emit('number', params)
  return new Promise((resolve, reject) => {
    socket.on('number', (data) => {
      dispatch(prodActions.setNumber({ data: data.data, id: data.id }))
      resolve()
    })
  })
}
export const setALLNumber = (data) => (dispatch) => {
  dispatch(prodActions.setNumber({ data: data.data, id: data.id }))
}
export const fetchRecord = (params) => (dispatch, getState, { socket }) => {
  return new Promise((resolve, reject) => {
    socket.emit('record_list', params, (data) => {
      dispatch(actions.Records({ data: data.data, total: data.total }))
      resolve(data.message)
    })
  })
}
