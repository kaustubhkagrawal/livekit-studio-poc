import { Room, RoomOptions } from 'livekit-client';
import { IConferenceProvider } from './provider.interface';
import { audioPlugin } from '../../audio/index.livekit';
import { videoPlugin } from '../../video/index.livekit';

interface LivekitProviderOptions extends RoomOptions {
  url: string;
}
export class LivekitProvider implements IConferenceProvider {
  private options: LivekitProviderOptions;
  private room: Room;

  constructor(options: LivekitProviderOptions) {
    this.options = options;
    const { url, ...sdkOpts } = options;
    this.room = new Room(sdkOpts);
  }

  init() {
    audioPlugin.registerListeners(this.room);
    videoPlugin.registerListeners(this.room);
  }

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
