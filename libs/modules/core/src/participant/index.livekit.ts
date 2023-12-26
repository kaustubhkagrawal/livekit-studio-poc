import { Participant, Room, RoomEvent } from 'livekit-client';

export const participantPlugin = {
  registerListeners(room: Room) {
    room.on(RoomEvent.ParticipantConnected, (participant: Participant) => {
      console.log('participant', participant);
    });
  },
};
