import { IConferenceProvider } from '../../../conference';
import { CONFERENCE_EVENTS } from '../../../constants/events';

export function registerListeners(provider: IConferenceProvider) {
  if (provider.room === null) return;

  PubSub.subscribe(CONFERENCE_EVENTS.AUDIO_TOGGLE, async (event, payload) => {
    const trackPublication =
      await provider.room?.localParticipant.setMicrophoneEnabled(payload);
    if (trackPublication) {
      PubSub.publish(CONFERENCE_EVENTS.AUDIO_TOGGLE_SUCCESS, payload);
    } else {
      // handle error
      console.log('audio toggle failed.');
    }
  });

  PubSub.subscribe(CONFERENCE_EVENTS.CLEANUP, () => {
    cleanup(provider);
  });
}

export function cleanup(provider: IConferenceProvider) {
  PubSub.unsubscribe(CONFERENCE_EVENTS.AUDIO);
}