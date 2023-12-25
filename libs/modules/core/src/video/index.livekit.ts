import PubSub from 'pubsub-js';
import { CONFERENCE_EVENTS } from '../constants/events';
import { Room } from 'livekit-client';

const videoPlugin = {
  registerListeners: function (room: Room) {
    PubSub.subscribe(CONFERENCE_EVENTS.VIDEO_TOGGLE, async (event, payload) => {
      const trackPublication = await room.localParticipant.setCameraEnabled(
        payload
      );
      if (trackPublication) {
        PubSub.publish(CONFERENCE_EVENTS.VIDEO_TOGGLE_SUCCESS, payload);
      } else {
        // handle error
        console.log('video toggle failed.');
      }
    });
  },
};

export { videoPlugin };
