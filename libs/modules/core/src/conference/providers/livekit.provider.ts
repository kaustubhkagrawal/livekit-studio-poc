import { CONFERENCE_EVENTS, Participant } from '@kaustubhkagrawal/shared';
import {
  Participant as LivekitParticipant,
  Room,
  RoomOptions,
  VideoPresets,
} from 'livekit-client';
import { CONFERENCE_PROVIDER } from '../../constants';
import { IConferenceProvider } from './provider.types';

const defaultRoomOptions = {
  // automatically manage subscribed video quality
  adaptiveStream: true,

  // optimize publishing bandwidth and CPU for published tracks
  dynacast: true,

  // default capture settings
  videoCaptureDefaults: {
    resolution: VideoPresets.h720.resolution,
  },
};

interface LivekitProviderOptions extends RoomOptions {
  url: string;
}
export class LivekitProvider implements IConferenceProvider {
  private options: LivekitProviderOptions;
  public room: Room;
  name = CONFERENCE_PROVIDER.LIVEKIT;

  constructor(options: LivekitProviderOptions) {
    this.options = Object.assign(defaultRoomOptions, options);
    const { url, ...sdkOpts } = options;
    this.room = new Room(sdkOpts);
  }

  init() {}

  /**
   *
   * @param token Authentication token generated for the participant.
   */
  async connect(token: string = '') {
    if (token) {
      await this.room.connect(this.options.url, token);
    } else {
      console.error('Please provide a valid token.');
    }
  }

  transformParticipant<T extends Participant = LivekitParticipant>(
    participant: T
  ): Participant {
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
  }

  async refreshParticipants() {
    const remotes = Array.from(this.room.participants.values()).map(
      this.transformParticipant
    );

    const participants: Participant[] = [
      this.transformParticipant(this.room.localParticipant),
    ];
    participants.push(...remotes);

    PubSub.publish(CONFERENCE_EVENTS.PARTICIPANTS_REFRESH_LIST, participants);
    return participants;
  }

  private cleanup() {}

  async leave() {
    this.room.disconnect();
    this.cleanup();
  }
}
