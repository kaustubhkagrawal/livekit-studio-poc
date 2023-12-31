import { configureStore } from '@reduxjs/toolkit';
import {
  controlsReducer,
  participantsReducer,
  roomReducer,
  tracksReducer,
} from './slices';

export const store = configureStore({
  reducer: {
    controls: controlsReducer,
    participants: participantsReducer,
    tracks: tracksReducer,
    room: roomReducer,
  },
});

export * from './slices';

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
