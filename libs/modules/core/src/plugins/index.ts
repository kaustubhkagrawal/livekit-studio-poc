import { audioPlugin } from './audio';
import { participantPlugin } from './participant';
import { IPlugin } from './plugin';
import { roomPlugin } from './room';
import { trackPlugin } from './track';
import { videoPlugin } from './video';

export * from './plugin';

export const corePlugins: Record<string, IPlugin> = {
  audio: audioPlugin,
  video: videoPlugin,
  participant: participantPlugin,
  track: trackPlugin,
  room: roomPlugin,
};
