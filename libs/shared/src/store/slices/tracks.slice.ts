import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MediaTrack } from '../../types';

export interface TracksSliceData {
  tracks: MediaTrack[];
}

const initialState: TracksSliceData = {
  tracks: [],
};

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    addTrack(state, { payload }: PayloadAction<MediaTrack>) {
      state.tracks.push(payload);
    },
    removeTrack(state, { payload }: PayloadAction<MediaTrack['sid']>) {
      const trackToRemove = state.tracks.findIndex(
        (track) => track.sid === payload
      );

      if (trackToRemove >= 0) {
        state.tracks.splice(trackToRemove, 1);
      }
    },
    setTracks(state, { payload }: PayloadAction<MediaTrack[]>) {
      state.tracks = payload;
    },
  },
});

export const tracksActions = tracksSlice.actions;

export const tracksReducer = tracksSlice.reducer;
