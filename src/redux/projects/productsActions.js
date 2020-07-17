import { productsSlice, callTypes } from './productsSlice'
import moment from 'moment-timezone'
moment.tz.setDefault('Asia/Shanghai')
const { actions } = productsSlice

export const fetchProducts = (queryParams) => (
  dispatch,
  getState,
  { socket }
) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return new Promise((resolve, reject) => {
    socket.emit('assets', queryParams, (data) => {
      if (data[0]) {
        dispatch(dispatch(actions.productsFetched(data)))
        resolve()
      } else {
        let error = {}
        error.clientMessage = "Can't find products"
        dispatch(actions.catchError({ error, callType: callTypes.list }))
        resolve()
      }
    })
  })
}

export const fetchProduct = (id) => (dispatch, getState, { socket }) => {
  if (!id) {
    return dispatch(actions.productFetched({ productForEdit: undefined }))
  }

  dispatch(actions.startCall({ callType: callTypes.action }))
  return new Promise((resolve, reject) => {
    socket.emit('get_assets', id, (data) => {
      data.region = JSON.parse(data.region)
      data.start_time = moment(data.start_time * 1000).format(
        'YYYY-MM-DDTHH:mm'
      )
      dispatch(dispatch(actions.productFetched({ productForEdit: data })))
      resolve()
    })
  })
}

export const deleteProduct = (id) => (dispatch, getState, { socket }) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return new Promise((resolve, reject) => {
    socket.emit('delete_assets', id, (data) => {
      dispatch(dispatch(actions.productDeleted({ id: data.id })))
      resolve()
    })
  })
}

export const createProduct = (productForCreation) => (
  dispatch,
  getState,
  { socket }
) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return new Promise((resolve, reject) => {
    socket.emit('create_assets', productForCreation, () => {
      dispatch(dispatch(actions.productCreated()))
      resolve()
    })
  })
}

export const updateProduct = (product) => (dispatch, getState, { socket }) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return new Promise((resolve, reject) => {
    socket.emit('update_assets', product, (data) => {
      dispatch(dispatch(actions.productUpdated(data)))
      resolve()
    })
  })
}

export const fetchAssets = () => (dispatch, getState, { socket }) => {
  return new Promise((resolve, reject) => {
    socket.emit('assets_list', (data) => {
      dispatch(dispatch(actions.assetsList(data)))
      resolve()
    })
  })
}
export const setIssue = (assets) => (dispatch) => {
  let now = moment().unix()
  let endTime = moment()
    .endOf('day')
    .unix()
  let expIuess = Math.ceil((endTime - now) / assets.interval)

  return dispatch(
    actions.issue({ expIuess, id: assets.id, issue: assets.issue })
  )
}
export const fetchAssetsById = (id) => (dispatch, getState, { socket }) => {
  return new Promise((resolve, reject) => {
    socket.emit('assetsById', id, (data) => {
      dispatch(dispatch(actions.fetchAssetsById(data)))
      resolve()
    })
  })
}
export const setDetailIssue = (assets) => (dispatch) => {
  let now = moment().unix()
  let endTime = moment()
    .endOf('day')
    .unix()
  let expIuess = Math.ceil((endTime - now) / assets.interval)

  return dispatch(actions.detailIssue({ expIuess, issue: assets.issue }))
}
