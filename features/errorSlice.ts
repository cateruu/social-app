import { createSlice } from '@reduxjs/toolkit';

type Error = {
  errorOpen: boolean;
  text: string;
};

const initialState: Error = {
  errorOpen: false,
  text: '',
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showError: (state, { payload }) => {
      state.errorOpen = true;
      state.text = payload.text;
    },
    hideError: (state) => {
      state.errorOpen = false;
    },
  },
});

export const { showError, hideError } = errorSlice.actions;
export default errorSlice.reducer;
