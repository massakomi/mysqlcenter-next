import { createSlice } from '@reduxjs/toolkit'

export const paramsReducer = createSlice({
  name: 'params',
  initialState: {
    value: {
      database: null,
      databases: [],
      loading: false,
      counter: 0
    }
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value.counter += 1
    },
    decrement: state => {
      state.value.counter  -= 1
    },
    initializeCount: state => {
      state.value.counter  = 0
    },
    // dispatch(setValue({database: 'mydb11'}))
    setValue: (state, value) => {
      Object.assign(state.value, value.payload)
    }
  }
})

// Action creators are generated for each case reducer function
export const { initializeCount, increment, decrement, setValue } = paramsReducer.actions

export default paramsReducer.reducer