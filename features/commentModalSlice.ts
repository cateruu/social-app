import { createSlice } from '@reduxjs/toolkit';

type CommentType = {
  isOpen: boolean;
};

const initialState: CommentType = {
  isOpen: false,
};

const commentModalSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = commentModalSlice.actions;
export default commentModalSlice.reducer;
