import { Room } from 'livekit-client';
import { CONFERENCE_PROVIDER } from '../../constants';

export interface IConferenceProvider {
  init(): void;

  name: CONFERENCE_PROVIDER;

  room: Room | null;

  connect(token?: string): Promise<void>;

  leave(): Promise<void>;
}
