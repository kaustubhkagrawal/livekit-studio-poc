import type { VercelRequest, VercelResponse } from '@vercel/node';

import { AccessToken } from 'livekit-server-sdk';

export default async (request: VercelRequest, response: VercelResponse) => {
  if (!request.url) return response.status(400);

  // const url = new URL(request.url, `http://${request.headers.host}`);
  // const { searchParams } = url;
  // const hasTitle = searchParams.has('title');
  // const title = hasTitle
  //   ? searchParams.get('title')?.slice(0, 100)
  //   : 'My default title';

  if (request.method === 'POST') {
    const { body = {} } = request;
    const { roomName = 'xyz', username = '' } = body;

    const apiKey = process.env.VITE_APP_LIVEKIT_API_KEY ?? '';
    const apiSecret = process.env.VITE_APP_LIVEKIT_API_SECRET ?? '';

    if (!apiKey || !apiSecret) {
      return response.status(500);
    }

    const at = new AccessToken(apiKey, apiSecret, {
      identity: username,
    });
    at.addGrant({ roomJoin: true, room: roomName });

    const token = at.toJwt();

    return response.status(200).json({ token });
  } else {
    return response.status(404);
  }
};
