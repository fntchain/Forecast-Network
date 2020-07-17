import { createSlice } from '@reduxjs/toolkit'

const initialProductsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  productForEdit: undefined,
  lastError: null,
  assetsList: [],
  assetsDetail: null,
}
export const callTypes = {
  list: 'list',
  action: 'action',
}

export const productsSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false
      } else {
        state.actionsLoading = false
      }
    },
    startCall: (state, action) => {
      state.error = null
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true
      } else {
        state.actionsLoading = true
      }
    },
    // getProductById
    productFetched: (state, action) => {
      state.actionsLoading = false
      state.productForEdit = action.payload.productForEdit
      state.error = null
    },
    // findProducts
    productsFetched: (state, action) => {
      const entities = action.payload
      const totalCount = entities.length
      state.listLoading = false
      state.error = null
      state.entities = entities
      state.totalCount = totalCount
    },
    // createProduct
    productCreated: (state, action) => {
      state.actionsLoading = false
      state.error = null
    },
    // updateProduct
    productUpdated: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.id) {
          return action.payload
        }
        return entity
      })
    },
    // deleteProduct
    productDeleted: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.entities = state.entities.filter(
        (el) => el.id !== parseInt(action.payload.id)
      )
    },
    assetsList: (state, action) => {
      state.error = null
      state.assetsList = action.payload
    },
    issue: (state, action) => {
      state.error = null
      state.assetsList = state.assetsList.map((assets) => {
        if (assets.id === action.payload.id) {
          assets.expIuess = action.payload.expIuess
          assets.issue = action.payload.issue
        }
        return assets
      })
    },
    fetchAssetsById: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.assetsDetail = action.payload
    },
    detailIssue: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.assetsDetail = {
        ...state.assetsDetail,
        expIuess: action.payload.expIuess,
        issue: action.payload.issue,
      }
    },
    setNumber: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.assetsDetail = {
        ...state.assetsDetail,
        number: action.payload.data,
      }
      if (state.assetsList.length > 0) {
        state.assetsList = state.assetsList.map((assets) => {
          if (assets.id === action.payload.id) {
            assets.number = action.payload.data
          }
          return assets
        })
      }
    },
  },
})
