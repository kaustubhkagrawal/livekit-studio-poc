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
  participantId: Participant['identity'];
  mirror?: boolean;
}

const Streamer = memo(
  ({ source, participantId, mirror = false }: StreamerProps) => {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      ConferenceSDK.provider.attachStream(ref, participantId, source);
    }, [source, participantId]);

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
      <audio
        ref={ref}
        style={{ display: 'hidden' }}
        autoPlay
        controls={false}
      />
    );
  }
);

export { Streamer };
