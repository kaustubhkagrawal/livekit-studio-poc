import { ConferenceSDK, SandboxProvider } from '@kaustubhkagrawal/core';
import {
  CONFERENCE_EVENTS,
  useConferenceStoreListeners,
} from '@kaustubhkagrawal/shared';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Studio } from '../components';
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
  const navigate = useNavigate();

  useEffect(() => {
    providerInitialize().then(() => {
      next();
    });
  }, []);

  useEffect(() => {
    PubSub.subscribe(CONFERENCE_EVENTS.ROOM_LEAVE_SUCCESS, () => {
      navigate('/');
    });
  }, [navigate]);

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
