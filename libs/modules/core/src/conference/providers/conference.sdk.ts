import { Room, RoomOptions, VideoPresets } from 'livekit-client';

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

export class ConferenceSDK {
  private static isInitialized = false;
  private static roomInstance: Room;
  private constructor() {}

  public static init(opts: RoomOptions = {}) {
    if (!ConferenceSDK.isInitialized) {
      ConferenceSDK.roomInstance = new Room(
        Object.assign(defaultRoomOptions, opts)
      );
      ConferenceSDK.isInitialized = true;
    } else {
      console.warn(
        'ConferenceSDK initialized multiple times. This can create unstable experience.'
      );
    }
  }

  public static get room(): Room {
    if (ConferenceSDK.isInitialized) {
      return ConferenceSDK.roomInstance;
    } else {
      ConferenceSDK.init({});
      return ConferenceSDK.roomInstance;
    }
  }

  static getParticipant(sid: string) {
    return ConferenceSDK.room.participants.get(sid);
  }

  static destroy() {
    if (ConferenceSDK.roomInstance) {
      ConferenceSDK.room.disconnect();
      ConferenceSDK.isInitialized = false;
    }
  }
}
