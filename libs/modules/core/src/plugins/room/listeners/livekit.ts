import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';
import { ConnectionState, RoomEvent } from 'livekit-client';
import { IConferenceProvider } from '../../../conference';

function handleRoomConnected(provider: IConferenceProvider) {
  const data = { name: provider.room?.name, status: provider.room?.state };
  PubSub.publish(CONFERENCE_EVENTS.ROOM_CONNECT_SUCCESS, data);
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
  provider.room?.on(RoomEvent.Connected, () => handleRoomConnected(provider));

  provider.room?.on(
    RoomEvent.ConnectionStateChanged,
    (state: ConnectionState) => {
      PubSub.publish(CONFERENCE_EVENTS.ROOM_CONNECTION_STATE_UPDATE, state);
    }
  );

  PubSub.subscribe(CONFERENCE_EVENTS.ROOM_LEAVE, () => {
    handleRoomLeave(provider);
  });
}
