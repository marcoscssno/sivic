import { configureStore } from '@reduxjs/toolkit'

import counterReducer from '../reducers/counterSlice'
import videoconferenciaReducer from '../reducers/videoconferenciaSlice'

export function makeStore() {
  return configureStore({
    reducer: {
        counter: counterReducer,
        videoconferencia: videoconferenciaReducer
    },
  })
}

const store = makeStore()

export default store
