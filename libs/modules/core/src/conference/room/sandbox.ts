import { CONFERENCE_EVENTS, Participant } from '@kaustubhkagrawal/shared';
import PubSub from 'pubsub-js';
import { IConferenceProvider } from '..';

export function participantConnectedListener<T extends Participant>(
  participant: T,
  provider: IConferenceProvider
) {
  const transformedParticipant = provider.transformParticipant(participant);

  PubSub.publish(
    CONFERENCE_EVENTS.PARTICIPANT_CONNECTED,
    transformedParticipant
  );
}

export default function listeners(provider: IConferenceProvider) {}
