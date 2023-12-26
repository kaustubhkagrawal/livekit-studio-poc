import { CONFERENCE_EVENTS } from '../../constants/events';
import { IPlugin } from '../plugin';
import listeners from './listeners';

export const audioPlugin: IPlugin = {
  name: CONFERENCE_EVENTS.AUDIO,
  registerListeners(provider) {
    listeners[provider.name].registerListeners(provider);
  },
};
