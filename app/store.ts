import { configureStore } from '@reduxjs/toolkit';

import CommentModalReducer from '../features/commentModalSlice';
import ErrorReducer from '../features/errorSlice';

export const store = configureStore({
  reducer: {
    commentModal: CommentModalReducer,
    error: ErrorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
