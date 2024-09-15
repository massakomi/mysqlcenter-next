import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import titleReducer from './features/titleReducer'

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      title: titleReducer
    }
  })
}