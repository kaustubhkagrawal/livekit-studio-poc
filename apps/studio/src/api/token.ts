import type { VercelRequest, VercelResponse } from '@vercel/node';

import { AccessToken } from 'livekit-server-sdk';
import { envConfig } from '../config';

export default async (request: VercelRequest, response: VercelResponse) => {
  if (!request.url) return response.status(400);

  // const url = new URL(request.url, `http://${request.headers.host}`);
  // const { searchParams } = url;
  // const hasTitle = searchParams.has('title');
  // const title = hasTitle
  //   ? searchParams.get('title')?.slice(0, 100)
  //   : 'My default title';

  const { roomName, username } = request.body;
  // identifier to be used for participant.
  // it's available as LocalParticipant.identity with livekit-client SDK
  // const participantName = 'quickstart-username';

  const at = new AccessToken(
    envConfig.conference.livekit.apiKey,
    envConfig.conference.livekit.apiSecret,
    {
      identity: username,
    }
  );
  at.addGrant({ roomJoin: true, room: roomName });

  const token = at.toJwt();

  return response.status(200).json({ token });
};
