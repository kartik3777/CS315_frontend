import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user_id: '',
  name: '',
  email: '',
  token: '',
  role: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user_id = action.payload.user_id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token; // assuming token is part of user payload
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user_id = '';
      state.name = '';
      state.email = '';
      state.role = '';
      state.token = '';
    }
  }
});

export const { setUser, setToken, logout } = userSlice.actions;
export default userSlice.reducer;
