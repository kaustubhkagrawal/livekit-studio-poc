import PubSub from 'pubsub-js';
import { useEffectOnce } from 'react-use';
import { CONFERENCE_EVENTS } from '../constants/events';

export function useConferenceContext() {
  useEffectOnce(() => {
    PubSub.subscribe(
      CONFERENCE_EVENTS.CONFERENCE_CONTEXT_UPDATE,
      (event, payload) => {}
    );

    return () => {};
  });
}
