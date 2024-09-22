import { configureStore } from '@reduxjs/toolkit'
import paramsReducer from './features/paramsReducer'
import messagesReducer from "./features/messagesReducer";

export const makeStore = () => {
  return configureStore({
    reducer: {
      params: paramsReducer,
      messages: messagesReducer,
    }
  })
}