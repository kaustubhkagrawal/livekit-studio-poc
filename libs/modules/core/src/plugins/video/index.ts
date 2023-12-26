import { CONFERENCE_EVENTS } from '../../constants/events';
import { IPlugin } from '../plugin';
import listeners from './listeners';

export const videoPlugin: IPlugin = {
  name: CONFERENCE_EVENTS.VIDEO,
  registerListeners(provider) {
    listeners[provider.name].registerListeners(provider);
  },
};
