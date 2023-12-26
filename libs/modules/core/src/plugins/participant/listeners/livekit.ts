import PubSub from 'pubsub-js';
import { IConferenceProvider } from '../../../conference';
import { CONFERENCE_EVENTS, Participant } from '@kaustubhkagrawal/shared';
import { Participant as LivekitParticipant, RoomEvent } from 'livekit-client';

const transformParticipant = (participant: LivekitParticipant): Participant => {
  const {
    sid,
    name,
    metadata,
    identity,
    isSpeaking,
    isAgent,
    isCameraEnabled,
    isLocal,
    isMicrophoneEnabled,
    isScreenShareEnabled,
    audioLevel,
  } = participant;

  return {
    sid,
    name,
    metadata,
    identity,
    isSpeaking,
    isAgent,
    isCameraEnabled,
    isLocal,
    isMicrophoneEnabled,
    isScreenShareEnabled,
    audioLevel,
  };
};

export function registerListeners(provider: IConferenceProvider) {
  if (provider.room === null) return;

  provider.room.on(
    RoomEvent.ParticipantConnected,
    (participant: LivekitParticipant) => {
      const transformedParticipant = transformParticipant(participant);

      console.log('transformedParticipant', transformedParticipant);

      PubSub.publish(
        CONFERENCE_EVENTS.PARTICIPANT_CONNECTED,
        transformedParticipant
      );
    }
  );

  PubSub.subscribe(CONFERENCE_EVENTS.CLEANUP, () => {
    cleanup(provider);
  });
}

export function cleanup(provider: IConferenceProvider) {
  PubSub.unsubscribe(CONFERENCE_EVENTS.PARTICIPANT);
}
