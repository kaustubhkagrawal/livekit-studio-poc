import PubSub from 'pubsub-js';
import { CONFERENCE_EVENTS } from '../constants/events';

const videoPlugin = {
  registerListeners: function () {
    PubSub.subscribe(CONFERENCE_EVENTS.VIDEO_TOGGLE, (event, payload) => {
      console.log('video toggle action received', payload);
      PubSub.publish(CONFERENCE_EVENTS.VIDEO_TOGGLE_SUCCESS, payload);
    });
  },
};

export { videoPlugin };
