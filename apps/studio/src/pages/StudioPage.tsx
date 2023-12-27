import { ConferenceSDK, LivekitProvider } from '@kaustubhkagrawal/core';
import {
  CONFERENCE_EVENTS,
  randomRoomName,
  useConferenceStoreListeners,
} from '@kaustubhkagrawal/shared';
import { PreJoin, Studio } from '@kaustubhkagrawal/studio';
import { ComponentProps, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { envConfig } from '../config';

async function providerInitialize() {
  const provider = new LivekitProvider({
    url: envConfig.conference.livekit.wsUrl,
  });

  await ConferenceSDK.registerProvider(provider);

  await ConferenceSDK.registerCorePlugins();
}

const defaultRoomName = randomRoomName();

interface StudioPageProps {}

/**
 *
 * Main Studio(Video Conference) Page.
 */
export function StudioPage(props: StudioPageProps) {
  const [joined, setJoined] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const roomName = searchParams.get('roomName');

  const navigate = useNavigate();

  useEffect(() => {
    if (!roomName) {
      setSearchParams({ roomName: defaultRoomName });
      navigate(0);
    }
  }, [roomName]);

  useEffect(() => {
    PubSub.subscribe(CONFERENCE_EVENTS.ROOM_LEAVE_SUCCESS, () => {
      console.log('pubsub success cb called');
      navigate('/');
    });
  }, [navigate]);

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
    <PreJoin
      apiUrl={envConfig.apiUrl}
      roomName={roomName ?? defaultRoomName}
      next={next}
    />
  );
}
