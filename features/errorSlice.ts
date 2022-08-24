import { createSlice } from '@reduxjs/toolkit';

type Error = {
  isOpen: boolean;
  text: string;
};

const initialState: Error = {
  isOpen: false,
  text: '',
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showError: (state, { payload }) => {
      state.isOpen = true;
      state.text = payload.text;
    },
    hideError: (state) => {
      state.isOpen = false;
      state.text = '';
    },
  },
});

export const { showError, hideError } = errorSlice.actions;
export default errorSlice.reducer;
