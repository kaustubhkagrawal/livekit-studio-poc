import { Participant } from '@kaustubhkagrawal/shared';
import { CONFERENCE_PROVIDER } from '../../constants';
import { roomPlugin } from '../room';
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
    roomPlugin.registerListeners(this);
  }

  transformParticipant<T extends Participant>(participant: T): Participant {
    return participant;
  }

  async refreshParticipants(): Promise<Participant[]> {
    const participants = [];

    return participants;
  }

  private cleanup() {}

  async leave() {
    console.log('left conference');
    this.cleanup();
  }
}
