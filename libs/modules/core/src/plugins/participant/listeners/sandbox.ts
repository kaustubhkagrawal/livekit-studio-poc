import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';
import PubSub from 'pubsub-js';
import { IConferenceProvider } from '../../../conference';

export function registerListeners(provider: IConferenceProvider) {
  if (provider.room === null) return;

  PubSub.subscribe(CONFERENCE_EVENTS.PARTICIPANT_CONNECTED, () => {
    PubSub.publish(
      CONFERENCE_EVENTS.PARTICIPANT_REFRESH_LIST,
      provider.refreshParticipants()
    );
  });

  PubSub.subscribe(CONFERENCE_EVENTS.CLEANUP, () => {
    cleanup(provider);
  });
}

export function cleanup(provider: IConferenceProvider) {
  PubSub.unsubscribe(CONFERENCE_EVENTS.PARTICIPANT);
}
