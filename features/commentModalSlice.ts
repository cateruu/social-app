import { createSlice } from '@reduxjs/toolkit';
import { PostType } from '../components/Feed/Feed';

type CommentType = {
  isOpen: boolean;
  postInfo: PostType | null;
};

const initialState: CommentType = {
  isOpen: false,
  postInfo: null,
};

const commentModalSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    openCommentModal: (state, { payload }) => {
      state.isOpen = true;
      state.postInfo = payload.post;
      document.body.style.overflow = 'hidden';
    },
    closeCommentModal: (state) => {
      state.isOpen = false;
      document.body.style.overflow = 'auto';
    },
  },
});

export const { openCommentModal, closeCommentModal } =
  commentModalSlice.actions;
export default commentModalSlice.reducer;
