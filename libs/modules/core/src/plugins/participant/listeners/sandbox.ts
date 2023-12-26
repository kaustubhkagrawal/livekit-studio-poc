import { Participant, RoomEvent } from 'livekit-client';
import PubSub from 'pubsub-js';
import { IConferenceProvider } from '../../../conference';
import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';

export function registerListeners(provider: IConferenceProvider) {
  if (provider.room === null) return;

  provider.room?.on(
    RoomEvent.ParticipantConnected,
    (participant: Participant) => {
      console.log('participant', participant);
    }
  );

  PubSub.subscribe(CONFERENCE_EVENTS.CLEANUP, () => {
    cleanup(provider);
  });
}

export function cleanup(provider: IConferenceProvider) {
  PubSub.unsubscribe(CONFERENCE_EVENTS.PARTICIPANT);
}
