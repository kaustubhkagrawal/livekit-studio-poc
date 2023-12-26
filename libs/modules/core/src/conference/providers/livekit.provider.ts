import { Room, RoomOptions } from 'livekit-client';
import { CONFERENCE_PROVIDER } from '../../constants';
import { IConferenceProvider } from './provider.types';

interface LivekitProviderOptions extends RoomOptions {
  url: string;
}
export class LivekitProvider implements IConferenceProvider {
  private options: LivekitProviderOptions;
  public room: Room;
  name = CONFERENCE_PROVIDER.LIVEKIT;

  constructor(options: LivekitProviderOptions) {
    this.options = options;
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
      this.room.connect(this.options.url, token);
    } else {
      console.error('Please provide a valid token.');
    }
  }

  private cleanup() {}

  async leave() {
    this.room.disconnect();
    this.cleanup();
  }
}
