import { Participant } from '@kaustubhkagrawal/shared';
import { Room } from 'livekit-client';
import { CONFERENCE_PROVIDER } from '../../constants';

export interface IConferenceProvider {
  init(): void;

  name: CONFERENCE_PROVIDER;

  room: Room | null;

  transformParticipant<T extends Participant>(participant: T): Participant;
  refreshParticipants(): Promise<Participant[]>;
  connect(token?: string): Promise<void>;

  leave(): Promise<void>;
}
