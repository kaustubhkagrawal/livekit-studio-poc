import { ConferenceSDK, SandboxProvider } from '@kaustubhkagrawal/core';
import { useConferenceStoreListeners } from '@kaustubhkagrawal/shared';
import { Studio } from '@kaustubhkagrawal/studio';
import { useEffect, useState } from 'react';
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
    providerInitialize().then(() => {
      next();
    });
  }, []);

  const next = async () => {
    try {
      console.log('next called');

      await ConferenceSDK.provider.connect('');

      setJoined(true);
    } catch (err) {
      console.log(err);
      setJoined(false);
    }
  };

  useConferenceStoreListeners();

  return joined ? <Studio /> : 'Loading...';
}
