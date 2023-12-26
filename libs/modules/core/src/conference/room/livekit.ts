import { RoomEvent } from 'livekit-client';
import { IConferenceProvider } from '..';

export default function listeners(provider: IConferenceProvider) {
  provider.room?.on(RoomEvent.ConnectionStateChanged, () => {
    console.log('Room connected');
    provider.refreshParticipants();
  });
}
