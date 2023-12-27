import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';
import { IPlugin } from '../plugin';
import listeners from './listeners';

export const roomPlugin: IPlugin = {
  name: CONFERENCE_EVENTS.ROOM,
  register(provider): void {
    listeners[provider.name](provider);
    PubSub.subscribe(CONFERENCE_EVENTS.CLEANUP, () =>
      PubSub.unsubscribe(this.name)
    );
  },
};
