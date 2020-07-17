import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { reduxBatch } from '@manaflair/redux-batch'
import { persistStore, persistReducer } from 'redux-persist'
import { rootReducer } from './rootReducer'

import storage from 'redux-persist/lib/storage'
import openSocket from 'socket.io-client'
const socket = openSocket('https://socket.eliteeffect.info')
window.socket = socket
const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: { extraArgument: { socket: socket } },
  }),
]

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [reduxBatch],
})

/**
 * @see https://github.com/rt2zz/redux-persist#persiststorestore-config-callback
 * @see https://github.com/rt2zz/redux-persist#persistor-object
 */
export const persistor = persistStore(store)

export default store
