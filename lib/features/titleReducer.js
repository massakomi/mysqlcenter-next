import { createSlice } from '@reduxjs/toolkit'

export const titleReducer = createSlice({
  name: 'title',
  initialState: {
    value: '*'
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { set } = titleReducer.actions

export default titleReducer.reducer