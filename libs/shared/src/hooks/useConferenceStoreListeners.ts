import PubSub from 'pubsub-js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CONFERENCE_EVENTS } from '../constants';
import { controlsActions, participantsActions, tracksActions } from '../store';

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

    // const PARTICIPANT_CONNECTED_TOKEN = PubSub.subscribe(
    //   CONFERENCE_EVENTS.PARTICIPANT_CONNECTED,
    //   (e, data) => {
    //     console.log('participant connected', data);
    //     dispatch(participantsActions.addParticipant(data));
    //   }
    // );

    const PARTICIPANT_REFRESH_LIST_TOKEN = PubSub.subscribe(
      CONFERENCE_EVENTS.PARTICIPANTS_REFRESH_LIST,
      (e, participants) => {
        console.log('participants list refresh', participants);
        dispatch(participantsActions.setParticipants(participants));
      }
    );

    const TRACK_SUBSCRIBED_TOKEN = PubSub.subscribe(
      CONFERENCE_EVENTS.TRACK_SUBSCRIBED,
      (e, track) => {
        console.log('track subscribed', track);
        dispatch(tracksActions.addTrack(track));
      }
    );

    const TRACK_UNSUBSCRIBED_TOKEN = PubSub.subscribe(
      CONFERENCE_EVENTS.TRACK_UNSUBSCRIBED,
      (e, track) => {
        console.log('track unsubscribed', track);
        dispatch(tracksActions.removeTrack(track));
      }
    );

    return () => {
      PubSub.unsubscribe(AUDIO_TOGGLE_SUCCESS_TOKEN);
      // PubSub.unsubscribe(PARTICIPANT_CONNECTED_TOKEN);
      PubSub.unsubscribe(PARTICIPANT_REFRESH_LIST_TOKEN);
      PubSub.unsubscribe(TRACK_SUBSCRIBED_TOKEN);
      PubSub.unsubscribe(TRACK_UNSUBSCRIBED_TOKEN);
    };
  }, []);
}
