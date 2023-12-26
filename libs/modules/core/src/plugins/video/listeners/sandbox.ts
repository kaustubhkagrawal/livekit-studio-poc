import PubSub from 'pubsub-js';
import { IConferenceProvider } from '../../../conference';
import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';

export function registerListeners(provider: IConferenceProvider) {
  let video = false;
  PubSub.subscribe(CONFERENCE_EVENTS.VIDEO_TOGGLE, () => {
    video = !video;
    console.log('video toggle action received', video);
    PubSub.publish(CONFERENCE_EVENTS.VIDEO_TOGGLE_SUCCESS, video);
  });

  PubSub.subscribe(CONFERENCE_EVENTS.CLEANUP, () => {
    cleanup(provider);
  });
}

export function cleanup(provider: IConferenceProvider) {
  PubSub.unsubscribe(CONFERENCE_EVENTS.VIDEO);
}
