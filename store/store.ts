import { configureStore } from '@reduxjs/toolkit';

import CommentModalReducer from '../features/commentModalSlice';

export const store = configureStore({
  reducer: {
    commentModal: CommentModalReducer,
  },
});
