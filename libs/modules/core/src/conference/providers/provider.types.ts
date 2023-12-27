import { Participant, Track } from '@kaustubhkagrawal/shared';
import { Room } from 'livekit-client';
import { CONFERENCE_PROVIDER } from '../../constants';
import { RefObject } from 'react';

export interface IConferenceProvider {
  init(): void;

  name: CONFERENCE_PROVIDER;

  room: Room | null;

  transformParticipant<T extends Participant>(participant: T): Participant;
  refreshParticipants(): Promise<Participant[]>;
  connect(token?: string): Promise<void>;

  attachStream(
    mediaElRef: RefObject<HTMLMediaElement>,
    participantId: Participant['sid'],
    source: Track.Source
  ): Promise<void>;

  leave(): Promise<void>;
}
