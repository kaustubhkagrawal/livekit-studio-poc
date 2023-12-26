import { CONFERENCE_EVENTS } from '../../constants/events';
import { IPlugin } from '../plugin';
import listeners from './listeners';

export const participantPlugin: IPlugin = {
  name: CONFERENCE_EVENTS.PARTICIPANT,
  registerListeners(provider) {
    listeners[provider.name].registerListeners(provider);
  },
};
