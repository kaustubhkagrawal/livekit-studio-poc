import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';
import { Participant as LivekitParticipant, RoomEvent } from 'livekit-client';
import PubSub from 'pubsub-js';
import { IConferenceProvider } from '../../../conference';

export function registerListeners(provider: IConferenceProvider) {
  if (provider.room === null) return;

  // TODO: Mock this later.
  provider.room.on(
    RoomEvent.ParticipantConnected,
    (participant: LivekitParticipant) => {
      const transformedParticipant = provider.transformParticipant(participant);

      PubSub.publish(
        CONFERENCE_EVENTS.PARTICIPANT_CONNECTED,
        transformedParticipant
      );

      provider.refreshParticipants();
    }
  );

  PubSub.subscribe(CONFERENCE_EVENTS.CLEANUP, () => {
    cleanup(provider);
  });
}

export function cleanup(provider: IConferenceProvider) {
  PubSub.unsubscribe(CONFERENCE_EVENTS.ROOM);
}
