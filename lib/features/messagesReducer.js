import { createSlice } from '@reduxjs/toolkit'

export const messagesReducer = createSlice({
  name: 'messages',
  initialState: {
    value: []
  },
  reducers: {
    setMessages: (state, action) => {
      state.value = action.payload instanceof Array ? action.payload : [action.payload]
    },
  }
})

// Action creators are generated for each case reducer function
export const { setMessages } = messagesReducer.actions

export default messagesReducer.reducer