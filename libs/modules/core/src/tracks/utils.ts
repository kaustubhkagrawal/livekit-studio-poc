import {
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
} from 'livekit-client';

export function handleTrackSubscribed(
  track: RemoteTrack,
  publication: RemoteTrackPublication,
  participant: RemoteParticipant
) {
  const parentElement = document.getElementById(
    `participant-${participant.sid}`
  );
  const element = track.attach();
  parentElement?.appendChild(element);
}
