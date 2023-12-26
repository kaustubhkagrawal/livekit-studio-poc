import { CONFERENCE_EVENTS, Participant } from '@kaustubhkagrawal/shared';
import PubSub from 'pubsub-js';
import { IConferenceProvider } from '../../../conference';
import { RoomEvent } from 'livekit-client';

function participantListenerBuilder(event: CONFERENCE_EVENTS) {
  return function <T extends Participant>(
    participant: T,
    provider: IConferenceProvider
  ) {
    const transformedParticipant = provider.transformParticipant(participant);

    PubSub.publish(event, transformedParticipant);
  };
}

export const participantConnectedListener = participantListenerBuilder(
  CONFERENCE_EVENTS.PARTICIPANT_CONNECTED
);

export const participantDisConnectedListener = participantListenerBuilder(
  CONFERENCE_EVENTS.PARTICIPANT_DISCONNECTED
);

export const participantUpdatedListener = participantListenerBuilder(
  CONFERENCE_EVENTS.PARTICIPANT_UPDATED
);

export default function registerListeners(provider: IConferenceProvider) {
  if (provider.room === null) return;

  provider.room
    .on(RoomEvent.ParticipantConnected, (participant) =>
      participantConnectedListener(participant, provider)
    )
    .on(
      RoomEvent.ParticipantDisconnected,
      (participant) => participantDisConnectedListener(participant, provider)
      // ).on(RoomEvent.ParticipantMetadataChanged, participant =>
    )
    .on(RoomEvent.ParticipantMetadataChanged, (metadata, participant) =>
      participantUpdatedListener(participant, provider)
    );

  PubSub.subscribe(CONFERENCE_EVENTS.PARTICIPANT, async () => {
    await provider.refreshParticipants();
  });
}
