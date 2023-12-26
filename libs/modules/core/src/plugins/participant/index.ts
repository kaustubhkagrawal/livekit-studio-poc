import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';
import { IPlugin } from '../plugin';
import listeners from './listeners';

export const participantPlugin: IPlugin = {
  name: CONFERENCE_EVENTS.PARTICIPANT,
  registerListeners(provider) {
    listeners[provider.name].registerListeners(provider);
  },
};
