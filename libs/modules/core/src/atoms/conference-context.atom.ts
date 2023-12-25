import { atom } from 'jotai';
import { CONTEXT_UPDATE_TYPE } from '../constants';

export const conferenceContextAtom = atom({});

export const conferenceContextReducer = (prev, action) => {
  const { path, value } = action.payload;
  if (action.type === CONTEXT_UPDATE_TYPE.SET) {
  }
};
