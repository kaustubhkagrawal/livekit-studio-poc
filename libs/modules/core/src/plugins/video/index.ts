import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';
import { IPlugin } from '../plugin';
import listeners from './listeners';

export const videoPlugin: IPlugin = {
  name: CONFERENCE_EVENTS.VIDEO,

  register(provider) {
    listeners[provider.name].registerListeners(provider);
    PubSub.subscribe(CONFERENCE_EVENTS.CLEANUP, () =>
      PubSub.unsubscribe(this.name)
    );
  },
};
