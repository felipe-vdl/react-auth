import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  expiration: localStorage.getItem('expiration') ? localStorage.getItem('expiration') : null,
  isLoggedIn: localStorage.getItem('token') ? true : false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (st, action) => {
      st.token = action.payload.token;
      st.expiration = action.payload.expiration;
      st.isLoggedIn = !!st.token;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('expiration', Date.now() + action.payload.expiration*1000);
    },
    logout: (st) => {
      st.token = null;
      st.isLoggedIn = !!st.token
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;