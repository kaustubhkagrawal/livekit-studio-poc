import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';
import { IPlugin } from '../plugin';
import listeners from './listeners';

export const participantPlugin: IPlugin = {
  name: CONFERENCE_EVENTS.PARTICIPANT,
  register(provider) {
    listeners[provider.name](provider);
    PubSub.subscribe(CONFERENCE_EVENTS.CLEANUP, () =>
      PubSub.unsubscribe(this.name)
    );
  },
};

export const participantListeners = listeners;
