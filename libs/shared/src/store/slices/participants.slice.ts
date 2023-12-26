import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Participant } from '../../types';

export interface ParticipantsSliceData {
  participants: Participant[];
}

const initialState: ParticipantsSliceData = {
  participants: [],
};

export const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {
    addParticipant(state, { payload }: PayloadAction<Participant>) {
      state.participants.push(payload);
    },
    setParticipants(state, { payload }: PayloadAction<Participant[]>) {
      state.participants = payload;
    },
  },
});

export const participantsActions = participantsSlice.actions;

export const participantsReducer = participantsSlice.reducer;
