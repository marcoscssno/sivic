import { configureStore } from '@reduxjs/toolkit'

import counterReducer from '../reducers/counterSlice'

export function makeStore() {
  return configureStore({
    reducer: { counter: counterReducer },
  })
}

const store = makeStore()

export default store
