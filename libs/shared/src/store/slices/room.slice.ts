import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConnectionState, Room } from 'livekit-client';

export interface RoomSliceData {
  name: string;
  state: Room['state'];
}

const initialState: RoomSliceData = {
  name: '',
  state: ConnectionState.Disconnected,
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    updateRoomName(state, { payload }: PayloadAction<string>) {
      state.name = payload;
    },
    updateRoomState(state, { payload }: PayloadAction<ConnectionState>) {
      state.state = payload;
    },
  },
});

export const roomActions = roomSlice.actions;

export const roomReducer = roomSlice.reducer;
