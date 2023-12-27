import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';
import PubSub from 'pubsub-js';
import { IConferenceProvider } from '../../../conference';

export default function registerListeners(provider: IConferenceProvider) {
  if (provider.room === null) return;

  PubSub.subscribe(CONFERENCE_EVENTS.TRACK_SUBSCRIBED, async () => {
    // await provider.refreshParticipants();
  });
}
