import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';
import { IPlugin } from '../plugin';
import listeners from './listeners';

export const trackPlugin: IPlugin = {
  name: CONFERENCE_EVENTS.TRACK,
  register(provider) {
    listeners[provider.name](provider);
    PubSub.subscribe(CONFERENCE_EVENTS.CLEANUP, () =>
      PubSub.unsubscribe(this.name)
    );
  },
};
