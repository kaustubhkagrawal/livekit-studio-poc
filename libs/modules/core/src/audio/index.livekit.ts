import PubSub from 'pubsub-js';
import { CONFERENCE_EVENTS } from '../constants/events';
import { Room } from 'livekit-client';

const audioPlugin = {
  registerListeners: function (room: Room) {
    PubSub.subscribe(CONFERENCE_EVENTS.AUDIO_TOGGLE, async (event, payload) => {
      const trackPublication = await room.localParticipant.setMicrophoneEnabled(
        payload
      );
      if (trackPublication) {
        PubSub.publish(CONFERENCE_EVENTS.AUDIO_TOGGLE_SUCCESS, payload);
      } else {
        // handle error
        console.log('audio toggle failed.');
      }
    });
  },
};

export { audioPlugin };
