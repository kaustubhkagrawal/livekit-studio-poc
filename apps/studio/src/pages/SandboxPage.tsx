import { ConferenceSDK, SandboxProvider } from '@kaustubhkagrawal/core';
import { useConferenceStoreListeners } from '@kaustubhkagrawal/shared';
import { PreJoin, Studio } from '@kaustubhkagrawal/studio';
import { ComponentProps, useEffect, useState } from 'react';
import { envConfig } from '../config';

async function providerInitialize() {
  const provider = new SandboxProvider({
    url: envConfig.conference.livekit.wsUrl,
  });

  await ConferenceSDK.registerProvider(provider);

  await ConferenceSDK.registerCorePlugins();
}

interface SandboxPageProps {}

/**
 *
 * Main Sandbox(Mock Video Conference) Page.
 */
export function SandboxPage(props: SandboxPageProps) {
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    providerInitialize();
  }, []);

  const next: ComponentProps<typeof PreJoin>['next'] = async (data, token) => {
    try {
      console.log('next called');

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
