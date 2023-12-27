import { ConferenceSDK } from '@kaustubhkagrawal/core';
import { Participant, Track } from '@kaustubhkagrawal/shared';
import { memo, useEffect, useRef } from 'react';

const videoSources = [
  Track.Source.Camera,
  Track.Source.ScreenShare,
  Track.Source.ScreenShareAudio,
];

interface StreamerProps {
  source: Track.Source;
  participantId: Participant['sid'];
  participantIdentity: Participant['identity'];
  mirror?: boolean;
}

const Streamer = memo(
  ({
    source,
    participantId,
    participantIdentity,
    mirror = false,
  }: StreamerProps) => {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      ConferenceSDK.provider.attachStream(ref, participantIdentity, source);
    }, [source, participantIdentity]);

    return videoSources.includes(source) ? (
      <div
        style={{
          transform: mirror ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        className="w-full h-full relative overflow-hidden"
      >
        <video
          className="relative object-contain w-full h-full"
          ref={ref}
          controls={false}
          muted={true}
          autoPlay={true}
        />
      </div>
    ) : (
      <>
        <div className="flex flex-1 w-full h-full justify-center items-center">
          <img
            src={`https://gravatar.com/avatar/${participantId.toLowerCase()}?d=identicon`}
            alt={participantIdentity}
            className="rounded-full bg-blue-500 w-30 h-30"
          />
        </div>
        <audio
          ref={ref}
          style={{ display: 'hidden' }}
          autoPlay
          controls={false}
        />
      </>
    );
  }
);

export { Streamer };
