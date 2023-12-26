import PubSub from 'pubsub-js';
import { IConferenceProvider } from '../../../conference';
import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';

export function registerListeners(provider: IConferenceProvider) {
  if (provider.room === null) return;

  PubSub.subscribe(CONFERENCE_EVENTS.AUDIO_TOGGLE, async (event, payload) => {
    const currentAudioState =
      provider.room?.localParticipant.isMicrophoneEnabled;
    const trackPublication =
      await provider.room?.localParticipant.setMicrophoneEnabled(
        !currentAudioState
      );
    if (trackPublication) {
      PubSub.publish(
        CONFERENCE_EVENTS.AUDIO_TOGGLE_SUCCESS,
        !currentAudioState
      );
    } else {
      // handle error
      console.log('audio toggle failed.');
    }
  });

  PubSub.subscribe(CONFERENCE_EVENTS.CLEANUP, () => {
    cleanup();
  });
}

export function cleanup() {
  PubSub.unsubscribe(CONFERENCE_EVENTS.AUDIO);
}
