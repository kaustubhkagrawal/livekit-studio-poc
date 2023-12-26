import { CONFERENCE_EVENTS, Participant } from '@kaustubhkagrawal/shared';
import { CONFERENCE_PROVIDER } from '../../constants';
import { sandboxRoomListeners } from '../room';
import { IConferenceProvider } from './provider.types';

interface SandboxProviderOptions {}

export class SandboxProvider implements IConferenceProvider {
  private options: SandboxProviderOptions = {};

  room = null;

  name = CONFERENCE_PROVIDER.SANDBOX;
  constructor(options: SandboxProviderOptions) {
    this.options = options;
  }

  init() {}

  async connect(token: string = '') {
    console.log('token used', token);
    console.log('Connection established');
    sandboxRoomListeners(this);
  }

  transformParticipant<T extends Participant>(participant: T): Participant {
    return participant;
  }

  async refreshParticipants(): Promise<Participant[]> {
    const participants = [];

    PubSub.publish(CONFERENCE_EVENTS.PARTICIPANTS_REFRESH_LIST, participants);

    return participants;
  }

  private cleanup() {}

  async leave() {
    console.log('left conference');
    this.cleanup();
  }
}
