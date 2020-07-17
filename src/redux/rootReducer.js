import { combineReducers } from 'redux'
import { authSlice } from '../app/modules/Auth/_redux/authSlice'
import { productsSlice } from './projects/productsSlice'
import { lettrySlice } from './lettry/lettrySlice'

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  products: productsSlice.reducer,
  lettry: lettrySlice.reducer,
})

// export function* rootSaga() {
//   yield all([auth.saga()]);
// }
