import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("setUser action dispatched with payload:", action.payload);
      state.user = action.payload; 
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    loginUser: (state, action) => {
        console.log("loginUser action dispatched with payload:", action.payload);
        state.loading = true;
    },
  },
});

export const { setUser, setLoading, setError, loginUser } = userSlice.actions;

export default userSlice.reducer;

