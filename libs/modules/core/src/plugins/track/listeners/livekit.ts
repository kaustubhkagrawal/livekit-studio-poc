import { CONFERENCE_EVENTS, MediaTrack } from '@kaustubhkagrawal/shared';
import {
  Participant as LivekitParticipant,
  Track as LivekitTrack,
  RemoteParticipant,
  RoomEvent,
  TrackPublication,
} from 'livekit-client';
import PubSub from 'pubsub-js';
import { IConferenceProvider } from '../../../conference';

function transformTrack(
  track: LivekitTrack,
  participant: LivekitParticipant
): MediaTrack {
  const { sid = '', isMuted, kind, source, streamState } = track;
  return {
    sid,
    isMuted,
    kind,
    source,
    streamState,
    participantId: participant.sid,
    participantIdentity: participant.identity,
  };
}

export default function registerListeners(provider: IConferenceProvider) {
  if (provider.room === null) return;

  console.log('PubSub registerListeners called');

  provider.room
    .on(
      RoomEvent.TrackSubscribed,
      (track: LivekitTrack, publication, participant: RemoteParticipant) => {
        PubSub.publish(
          CONFERENCE_EVENTS.TRACK_SUBSCRIBED,
          transformTrack(track, participant)
        );
      }
    )
    .on(
      RoomEvent.TrackUnsubscribed,
      (track: LivekitTrack, pub, participant: RemoteParticipant) => {
        PubSub.publish(
          CONFERENCE_EVENTS.TRACK_UNSUBSCRIBED,
          transformTrack(track, participant)
        );
      }
    )
    .on(
      RoomEvent.LocalTrackPublished,
      (publication, participant: LivekitParticipant) => {
        PubSub.publish(
          CONFERENCE_EVENTS.TRACK_PUBLISHED,
          transformTrack(publication.track as LivekitTrack, participant)
        );
      }
    )
    .on(
      RoomEvent.LocalTrackUnpublished,
      (publication, participant: LivekitParticipant) => {
        PubSub.publish(
          CONFERENCE_EVENTS.TRACK_UNPUBLISHED,
          transformTrack(publication.track as LivekitTrack, participant)
        );
      }
    )
    .on(
      RoomEvent.TrackMuted,
      (publication: TrackPublication, participant: LivekitParticipant) => {
        PubSub.publish(
          CONFERENCE_EVENTS.TRACK_MUTED,
          transformTrack(publication.track as LivekitTrack, participant)
        );
      }
    )
    .on(
      RoomEvent.TrackUnmuted,
      (publication: TrackPublication, participant: LivekitParticipant) => {
        PubSub.publish(
          CONFERENCE_EVENTS.TRACK_UNMUTED,
          transformTrack(publication.track as LivekitTrack, participant)
        );
      }
    );
}
