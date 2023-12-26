import { IConferenceProvider } from '../../../conference';
import { CONFERENCE_EVENTS } from '../../../constants/events';

export function registerListeners(provider: IConferenceProvider) {
  PubSub.subscribe(CONFERENCE_EVENTS.VIDEO_TOGGLE, (event, payload) => {
    console.log('video toggle action received', payload);
    PubSub.publish(CONFERENCE_EVENTS.VIDEO_TOGGLE_SUCCESS, payload);
  });

  PubSub.subscribe(CONFERENCE_EVENTS.CLEANUP, () => {
    cleanup(provider);
  });
}

export function cleanup(provider: IConferenceProvider) {
  PubSub.unsubscribe(CONFERENCE_EVENTS.VIDEO);
}
