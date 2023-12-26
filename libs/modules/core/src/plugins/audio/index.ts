import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';
import { IPlugin } from '../plugin';
import listeners from './listeners';

export const audioPlugin: IPlugin = {
  name: CONFERENCE_EVENTS.AUDIO,
  register(provider) {
    listeners[provider.name](provider);
    PubSub.subscribe(CONFERENCE_EVENTS.CLEANUP, () =>
      PubSub.unsubscribe(this.name)
    );
  },
};
