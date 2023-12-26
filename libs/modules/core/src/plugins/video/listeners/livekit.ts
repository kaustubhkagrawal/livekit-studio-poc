import PubSub from 'pubsub-js';
import { IConferenceProvider } from '../../../conference';
import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';

export function registerListeners(provider: IConferenceProvider) {
  if (provider.room === null) return;

  PubSub.subscribe(CONFERENCE_EVENTS.VIDEO_TOGGLE, async () => {
    const currentVideoState = provider.room?.localParticipant.isCameraEnabled;
    const trackPublication =
      await provider.room?.localParticipant.setMicrophoneEnabled(
        !currentVideoState
      );
    if (trackPublication) {
      PubSub.publish(
        CONFERENCE_EVENTS.VIDEO_TOGGLE_SUCCESS,
        !currentVideoState
      );
    } else {
      // handle error
      console.log('video toggle failed.');
    }
  });

  PubSub.subscribe(CONFERENCE_EVENTS.CLEANUP, () => {
    cleanup(provider);
  });
}

export function cleanup(provider: IConferenceProvider) {
  PubSub.unsubscribe(CONFERENCE_EVENTS.VIDEO);
}
