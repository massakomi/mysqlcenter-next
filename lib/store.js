import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import titleReducer from './features/titleReducer'
import messagesReducer from "./features/messagesReducer";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      title: titleReducer,
      messages: messagesReducer,
    }
  })
}