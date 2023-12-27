import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';
import { ConnectionState, RoomEvent } from 'livekit-client';
import { IConferenceProvider } from '../../../conference';

function handleRoomConnected() {
  PubSub.publish(CONFERENCE_EVENTS.ROOM_CONNECT_SUCCESS);
}

async function handleRoomLeave(provider: IConferenceProvider) {
  console.log('leave triggered');
  await provider.leave();
}

/**
 *
 * Register Listeners
 * @param provider IConferenceProvider
 * @returns void
 */
export default function registerListeners(provider: IConferenceProvider) {
  provider.room?.on(RoomEvent.Connected, handleRoomConnected);

  provider.room?.on(
    RoomEvent.ConnectionStateChanged,
    (state: ConnectionState) => {
      console.log('connnection state changed to', state);
    }
  );

  PubSub.subscribe(CONFERENCE_EVENTS.ROOM_LEAVE, () => {
    handleRoomLeave(provider);
  });
}
