import { configureStore } from '@reduxjs/toolkit'

import videoconferenciaReducer from '../reducers/videoconferenciaSlice'

export function makeStore() {
  return configureStore({
    reducer: {
        videoconferencia: videoconferenciaReducer
    },
  })
}

const store = makeStore()

export default store
