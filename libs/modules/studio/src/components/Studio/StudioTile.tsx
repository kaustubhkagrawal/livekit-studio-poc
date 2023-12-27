import {
  CONFERENCE_EVENTS,
  MediaTrack,
  Participant,
  Track,
} from '@kaustubhkagrawal/shared';
import PubSub from 'pubsub-js';
import { HTMLAttributes, useEffect, useState } from 'react';
import { Streamer } from './VideoStream';

interface StudioTileProps extends HTMLAttributes<HTMLDivElement> {
  participant: Participant;
}

export function StudioTile({ participant, ...props }: StudioTileProps) {
  const [trackSources, setTrackSources] = useState<Track.Source[]>([]);

  const handleTrackSubscription = (track: MediaTrack) => {
    if (track.participantId === participant.sid) {
      // Attach track
      setTrackSources((tracks) => {
        console.log('track source set');
        if (!tracks?.includes(track.source)) {
          return [...tracks, track.source];
        } else {
          return [...tracks];
        }
      });
    }
  };

  const handleTrackUnSubscription = (track: MediaTrack) => {
    if (track.participantId === participant.sid) {
      // Attach track
      setTrackSources(trackSources.filter((source) => source !== track.source));
    }
  };

  useEffect(() => {
    const subscribeEvent = participant.isLocal
      ? CONFERENCE_EVENTS.TRACK_PUBLISHED
      : CONFERENCE_EVENTS.TRACK_SUBSCRIBED;
    const unSubscribeEvent = participant.isLocal
      ? CONFERENCE_EVENTS.TRACK_UNPUBLISHED
      : CONFERENCE_EVENTS.TRACK_UNSUBSCRIBED;

    const TRACK_SUBSCRIBED_TOKEN = PubSub.subscribe(
      subscribeEvent,
      (event, track: MediaTrack) => {
        console.log('track subscribed');
        if (!participant.isLocal || track.kind !== Track.Kind.Audio)
          handleTrackSubscription(track);
      }
    );

    const TRACK_UNSUBSCRIBED_TOKEN = PubSub.subscribe(
      unSubscribeEvent,
      (event, track: MediaTrack) => {
        console.log('track un-subscribed');
        if (!participant.isLocal || track.kind !== Track.Kind.Audio)
          handleTrackUnSubscription(track);
      }
    );

    return () => {
      PubSub.unsubscribe(TRACK_SUBSCRIBED_TOKEN);
      PubSub.unsubscribe(TRACK_UNSUBSCRIBED_TOKEN);
    };
  });

  console.log('trackSources', trackSources);

  return (
    <div
      id={`participant-tile-${participant.sid}`}
      className="flex aspect-video rounded-xl gap-2 px-4 py-4 bg-blue-300 overflow-hidden"
      {...props}
    >
      {trackSources?.map((source) => (
        <Streamer
          key={source}
          participantId={participant.identity}
          source={source}
        />
      ))}
      <div className="">{participant.identity}</div>
    </div>
  );
}
