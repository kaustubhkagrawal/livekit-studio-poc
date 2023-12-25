import PubSub from 'pubsub-js';
import { CONFERENCE_EVENTS } from '../constants/events';

const audioPlugin = {
  registerListeners: function () {
    PubSub.subscribe(CONFERENCE_EVENTS.AUDIO_TOGGLE, (event, payload) => {
      console.log('audio toggle action received', payload);
      PubSub.publish(CONFERENCE_EVENTS.AUDIO_TOGGLE_SUCCESS, payload);
    });
  },
};

export { audioPlugin };
