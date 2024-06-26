import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: { user: undefined, token: undefined },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, user) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value.user = user.payload;
    },
    setToken: (state, token) => {
      state.value.token = token.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setToken } = userSlice.actions

export default userSlice.reducer