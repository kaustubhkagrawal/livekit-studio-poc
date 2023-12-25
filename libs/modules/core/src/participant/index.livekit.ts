import { Room, RoomEvent } from 'livekit-client';

export const participantPlugin = {
  registerListeners(room: Room) {
    room.on(RoomEvent.ParticipantConnected, (participant) => {
      console.log('participant', participant);
    });
  },
};
