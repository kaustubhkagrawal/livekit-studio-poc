import {
  CONFERENCE_EVENTS,
  MediaTrack,
  Participant,
  Track,
} from '@kaustubhkagrawal/shared';
import PubSub from 'pubsub-js';
import { HTMLAttributes, useEffect, useState } from 'react';
import { Streamer } from './Streamer';
import { MicOff, MicOn } from '@kaustubhkagrawal/ui';

interface StudioTileProps extends HTMLAttributes<HTMLDivElement> {
  participant: Participant;
}

export function StudioTile({ participant, ...props }: StudioTileProps) {
  const [trackSources, setTrackSources] = useState<Track.Source[]>([]);

  const [isLocalMicOn, setIsLocalMicOn] = useState(false);

  const handleTrackSubscription = (track: MediaTrack) => {
    if (track.participantId === participant.sid) {
      if (!participant.isLocal || track.kind !== Track.Kind.Audio) {
        // Attach track
        setTrackSources((tracks) => {
          console.log('track source set');
          if (!tracks?.includes(track.source)) {
            return [...tracks, track.source];
          } else {
            return [...tracks];
          }
        });
      } else {
        setIsLocalMicOn(true);
      }
    }
  };

  const handleTrackUnSubscription = (track: MediaTrack) => {
    if (track.participantId === participant.sid) {
      if (!participant.isLocal || track.kind !== Track.Kind.Audio) {
        // Attach track
        setTrackSources(
          trackSources.filter((source) => source !== track.source)
        );
      } else {
        setIsLocalMicOn(false);
      }
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
      (event, track: MediaTrack) => handleTrackSubscription(track)
    );

    const TRACK_UNMUTED_TOKEN = PubSub.subscribe(
      CONFERENCE_EVENTS.TRACK_UNMUTED,
      (event, track: MediaTrack) => handleTrackSubscription(track)
    );

    const TRACK_UNSUBSCRIBED_TOKEN = PubSub.subscribe(
      unSubscribeEvent,
      (event, track: MediaTrack) => handleTrackUnSubscription(track)
    );

    const TRACK_MUTED_TOKEN = PubSub.subscribe(
      CONFERENCE_EVENTS.TRACK_MUTED,
      (event, track: MediaTrack) => handleTrackUnSubscription(track)
    );

    return () => {
      PubSub.unsubscribe(TRACK_SUBSCRIBED_TOKEN);
      PubSub.unsubscribe(TRACK_UNMUTED_TOKEN);
      PubSub.unsubscribe(TRACK_UNSUBSCRIBED_TOKEN);
      PubSub.unsubscribe(TRACK_MUTED_TOKEN);
    };
  });

  console.log('trackSources', trackSources);

  return (
    <div
      id={`participant-tile-${participant.sid}`}
      className="flex aspect-video relative rounded-xl gap-2 px-4 py-4 bg-sky-900 text-white overflow-hidden"
      {...props}
    >
      <div className="absolute top-0 right-0 bottom-0 left-0">
        {trackSources?.map((source) => (
          <Streamer
            key={source}
            participantId={participant.sid}
            participantIdentity={participant.identity}
            source={source}
          />
        ))}
        <div className="flex flex-1 w-full h-full justify-center items-center">
          <img
            src={`https://gravatar.com/avatar/${participant.sid.toLowerCase()}?d=identicon`}
            alt={participant.identity}
            className="rounded-full bg-blue-500 w-30 h-30"
          />
        </div>
      </div>
      <div
        title={participant.identity}
        className="z-10 mt-auto bg-black/30 rounded-lg px-4 py-1 text-sm max-h-7 text-ellipsis overflow-y-hidden"
      >
        {trackSources.includes(Track.Source.Microphone) || isLocalMicOn ? (
          <MicOn className="inline-flex w-5 h-5 mr-2" />
        ) : (
          <MicOff className="inline-flex w-5 h-5 mr-2" />
        )}
        {participant.identity}
      </div>
    </div>
  );
}
