import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';
import { IPlugin } from '../plugin';
import listeners from './listeners';

export const roomPlugin: IPlugin = {
  name: CONFERENCE_EVENTS.ROOM,
  registerListeners(provider) {
    listeners[provider.name].registerListeners(provider);
  },
};
