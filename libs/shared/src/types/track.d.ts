import { Track as LivekitTrack } from 'livekit-client';

import { Participant } from './participant';

export interface MediaTrack {
  sid: string;
  kind: LivekitTrack.Kind;
  source: LivekitTrack.Source;
  isMuted: boolean;
  streamState: LivekitTrack.StreamState;
  participantId: Participant['sid'];
  participantIdentity: Participant['identity'];
}

export { LivekitTrack as Track };
