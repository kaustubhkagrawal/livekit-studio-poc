import { audioPlugin } from './audio';
import { participantPlugin } from './participant';
import { IPlugin } from './plugin';
import { videoPlugin } from './video';

export * from './plugin';

export const corePlugins: Record<string, IPlugin> = {
  audio: audioPlugin,
  video: videoPlugin,
  participant: participantPlugin,
};
