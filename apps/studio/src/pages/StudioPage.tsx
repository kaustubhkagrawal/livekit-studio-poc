import { ConferenceSDK, LivekitProvider } from '@kaustubhkagrawal/core';
import { PreJoin, Studio } from '@kaustubhkagrawal/studio';
import { envConfig } from '../config';
import { ComponentProps, useState } from 'react';
import { useConferenceStoreListeners } from '@kaustubhkagrawal/shared';

interface StudioPageProps {}

/**
 *
 * Main Studio(Video Conference) Page.
 */
export function StudioPage(props: StudioPageProps) {
  const [joined, setJoined] = useState(false);
  const next: ComponentProps<typeof PreJoin>['next'] = async (data, token) => {
    try {
      console.log('next called');

      const provider = new LivekitProvider({
        url: envConfig.conference.livekit.wsUrl,
      });

      await ConferenceSDK.registerProvider(provider);

      await ConferenceSDK.registerCorePlugins();

      await ConferenceSDK.provider.connect(token);

      setJoined(true);
    } catch (err) {
      console.log(err);
      setJoined(false);
    }
  };

  useConferenceStoreListeners();

  return joined ? (
    <Studio />
  ) : (
    <PreJoin apiUrl={envConfig.apiUrl} roomName={''} next={next} />
  );
}
