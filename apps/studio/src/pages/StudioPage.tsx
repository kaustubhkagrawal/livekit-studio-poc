import { ConferenceSDK, LivekitProvider } from '@kaustubhkagrawal/core';
import { PreJoin, Studio } from '@kaustubhkagrawal/studio';
import { envConfig } from '../config';
import { ComponentProps, useState } from 'react';

interface StudioPageProps {}

/**
 *
 * Main Studio(Video Conference) Page.
 */
export function StudioPage(props: StudioPageProps) {
  console.log('hostname', envConfig.apiUrl);
  const [joined, setJoined] = useState(false);
  const next: ComponentProps<typeof PreJoin>['next'] = async (data, token) => {
    try {
      console.log('next called');

      const provider = new LivekitProvider({
        url: envConfig.conference.livekit.wsUrl,
      });

      await ConferenceSDK.registerProvider(provider);

      await ConferenceSDK.provider.connect(token);
      // ConferenceSDK.init();
      // ConferenceSDK.room.connect(envConfig.conference.livekit.wsUrl, token);

      // console.log('connected to room', ConferenceSDK.room.name);

      // // publish local camera and mic tracks
      // await ConferenceSDK.room.localParticipant.enableCameraAndMicrophone();

      console.log('items', ConferenceSDK.room.numParticipants);
      setJoined(true);
    } catch (err) {
      console.log(err);
      setJoined(false);
    }
  };

  return joined ? (
    <Studio />
  ) : (
    <PreJoin apiUrl={envConfig.apiUrl} roomName={''} next={next} />
  );
}
