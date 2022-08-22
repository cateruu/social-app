import { createSlice } from '@reduxjs/toolkit';
import { PostType } from '../components/Feed/Feed';

type CommentType = {
  isOpen: boolean;
  postInfo: PostType | undefined;
  postId: string | undefined;
};

const initialState: CommentType = {
  isOpen: false,
  postInfo: undefined,
  postId: undefined,
};

const commentModalSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    openCommentModal: (state, { payload }) => {
      state.isOpen = true;
      state.postInfo = payload.post;
      state.postId = payload.postId;
      document.body.style.overflow = 'hidden';
    },
    closeCommentModal: (state) => {
      state.isOpen = false;
      state.postInfo = undefined;
      state.postId = undefined;
      document.body.style.overflow = 'auto';
    },
  },
});

export const { openCommentModal, closeCommentModal } =
  commentModalSlice.actions;
export default commentModalSlice.reducer;
