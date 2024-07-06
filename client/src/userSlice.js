import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: { token: undefined },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, token) => {
      state.value.token = token.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setToken } = userSlice.actions

export default userSlice.reducer