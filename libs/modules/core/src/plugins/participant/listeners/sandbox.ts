import { SANDBOX_EVENTS } from '@kaustubhkagrawal/shared';
import PubSub from 'pubsub-js';
import { IConferenceProvider } from '../../../conference';

export default function registerListeners(provider: IConferenceProvider) {
  PubSub.subscribe(SANDBOX_EVENTS.PARTICIPANTS_CREATED, async () => {
    await provider.refreshParticipants();
  });
}
