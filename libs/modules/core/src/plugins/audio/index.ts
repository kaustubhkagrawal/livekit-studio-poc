import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';
import { IPlugin } from '../plugin';
import listeners from './listeners';

export const audioPlugin: IPlugin = {
  name: CONFERENCE_EVENTS.AUDIO,
  registerListeners(provider) {
    listeners[provider.name].registerListeners(provider);
  },
};
