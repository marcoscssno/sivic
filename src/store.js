import { configureStore } from '@reduxjs/toolkit'

import videoconferenciaReducer from './reducers/videoconferenciaSlice'
import userReducer from './reducers/userSlice'

export function makeStore() {
  return configureStore({
    reducer: {
        videoconferencia: videoconferenciaReducer,
        user: userReducer
    },
  })
}

const store = makeStore()

export default store
