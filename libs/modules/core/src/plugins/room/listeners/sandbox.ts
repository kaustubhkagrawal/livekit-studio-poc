import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';
import { IConferenceProvider } from '../../../conference';

async function handleRoomLeave(provider: IConferenceProvider) {
  console.log('leave triggered');
  await provider.leave();
  console.log('call disconnected');
}

/**
 *
 * Register Listeners
 * @param provider IConferenceProvider
 * @returns void
 */
export default function registerListeners(provider: IConferenceProvider) {
  PubSub.subscribe(CONFERENCE_EVENTS.ROOM_LEAVE, () => {
    handleRoomLeave(provider);
  });
}
