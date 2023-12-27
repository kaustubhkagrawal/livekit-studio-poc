import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';
import { Room } from 'livekit-client';
import PubSub from 'pubsub-js';
import { IConferenceProvider } from '../../../conference';

async function handleVideoToggle(room?: Room | null) {
  const currentVideoState = room?.localParticipant?.isCameraEnabled;
  const trackPublication = await room?.localParticipant?.setCameraEnabled?.(
    !currentVideoState
  );
  if (trackPublication) {
    PubSub.publish(CONFERENCE_EVENTS.VIDEO_TOGGLE_SUCCESS, !currentVideoState);
  } else {
    // handle error
    console.log('video toggle failed.');
  }
}

/**
 *
 * Register Listeners
 * @param provider IConferenceProvider
 * @returns void
 */
export default function registerListeners(provider: IConferenceProvider) {
  PubSub.subscribe(CONFERENCE_EVENTS.VIDEO_TOGGLE, () =>
    handleVideoToggle(provider.room)
  );
}
