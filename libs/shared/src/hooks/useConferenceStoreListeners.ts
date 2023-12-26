import PubSub from 'pubsub-js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CONFERENCE_EVENTS } from '../constants';
import { controlsActions, participantsActions } from '../store';

export function useConferenceStoreListeners() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useConferenceStoreListeners called');
    const AUDIO_TOGGLE_SUCCESS_TOKEN = PubSub.subscribe(
      CONFERENCE_EVENTS.AUDIO_TOGGLE_SUCCESS,
      (e, data) => {
        console.log('audio', data);
        dispatch(controlsActions.toggleAudio(data));
      }
    );

    const PARTICIPANT_CONNECTED_TOKEN = PubSub.subscribe(
      CONFERENCE_EVENTS.PARTICIPANT_CONNECTED,
      (e, data) => {
        console.log('participant connected', data);
        dispatch(participantsActions.addParticipant(data));
      }
    );

    return () => {
      PubSub.unsubscribe(AUDIO_TOGGLE_SUCCESS_TOKEN);
      PubSub.unsubscribe(PARTICIPANT_CONNECTED_TOKEN);
    };
  }, []);
}
