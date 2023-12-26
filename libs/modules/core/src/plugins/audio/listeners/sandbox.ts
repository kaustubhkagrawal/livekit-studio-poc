import PubSub from 'pubsub-js';
import { IConferenceProvider } from '../../../conference';
import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';

export function registerListeners(provider: IConferenceProvider) {
  let audio = false;
  PubSub.subscribe(CONFERENCE_EVENTS.AUDIO_TOGGLE, () => {
    audio = !audio;
    console.log('audio toggle action received', audio);
    PubSub.publish(CONFERENCE_EVENTS.AUDIO_TOGGLE_SUCCESS, audio);
  });
}
