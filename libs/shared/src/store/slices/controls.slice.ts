import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ControlsSliceData {
  audio: boolean;
  video: boolean;
  screenShare: boolean;
  record: boolean;
}

const initialState: ControlsSliceData = {
  audio: false,
  video: false,
  screenShare: false,
  record: false,
};

export const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    toggleAudio(state, { payload }: PayloadAction<boolean | undefined>) {
      state.audio = payload == null ? !state.audio : payload;
    },
    toggleVideo(state, { payload }: PayloadAction<boolean | undefined>) {
      state.video = payload == null ? !state.video : payload;
    },
  },
});

export const controlsActions = controlsSlice.actions;

export const controlsReducer = controlsSlice.reducer;
