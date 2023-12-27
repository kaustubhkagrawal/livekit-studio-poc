import {
  CONFERENCE_EVENTS,
  Participant,
  SANDBOX_EVENTS,
  Track,
} from '@kaustubhkagrawal/shared';
import { CONFERENCE_PROVIDER } from '../../constants';

import { RefObject } from 'react';
import { IConferenceProvider } from './provider.types';
import { Chance } from 'chance';

interface SandboxProviderOptions {}

export class SandboxProvider implements IConferenceProvider {
  private options: SandboxProviderOptions = {};
  private chance: Chance.Chance;

  private participants: Participant[] = [];

  room = null;

  name = CONFERENCE_PROVIDER.SANDBOX;
  constructor(options: SandboxProviderOptions) {
    this.options = options;
    this.chance = new Chance();
  }

  init() {}

  private createParticipant(isLocal = false) {
    const name = this.chance.name();
    const participant: Participant = {
      sid: this.chance.guid(),
      identity: name,
      name,
      metadata: '',
      isSpeaking: this.chance.pickone([true, false]),
      isAgent: false,
      isCameraEnabled: false,
      isMicrophoneEnabled: false,
      isScreenShareEnabled: false,
      isLocal,
      audioLevel: 0,
    };
    return participant;
  }

  async connect(token: string = '') {
    console.log('token used', token);
    console.log('Connection established');

    if (this.participants.length === 0) {
      const numParticipants = this.chance.integer({ min: 5, max: 15 });
      for (let i = 0; i < numParticipants; i++) {
        this.participants.push(this.createParticipant(i === 0));
      }
      PubSub.publish(SANDBOX_EVENTS.PARTICIPANTS_CREATED);
    }
  }

  transformParticipant<T extends Participant>(participant: T): Participant {
    return participant;
  }

  async refreshParticipants(): Promise<Participant[]> {
    const participants = this.participants;

    PubSub.publish(CONFERENCE_EVENTS.PARTICIPANTS_REFRESH_LIST, participants);

    return participants;
  }

  async attachStream(
    mediaElRef: RefObject<HTMLMediaElement>,
    participantId: Participant['sid'],
    source: Track.Source
  ): Promise<void> {
    // Attach Media to ele
  }

  private cleanup() {
    PubSub.publish(CONFERENCE_EVENTS.ROOM_LEAVE_SUCCESS);
    PubSub.publish(CONFERENCE_EVENTS.CLEANUP);
  }

  async leave() {
    console.log('left conference');
    this.cleanup();
  }
}
