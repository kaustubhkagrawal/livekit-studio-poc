import { forwardRef } from 'react';
import PubSub from 'pubsub-js';
import { CONFERENCE_EVENTS, RootState } from '@kaustubhkagrawal/shared';
import { useSelector } from 'react-redux';
import { CameraOff, CameraOn, MicOff, MicOn } from '@kaustubhkagrawal/ui';

interface StudioFooterProps {}

const StudioFooter = forwardRef<HTMLDivElement, StudioFooterProps>(
  (props, ref) => {
    const roomState = useSelector((state: RootState) => state.room);
    const controls = useSelector((state: RootState) => state.controls);
    return (
      <footer
        ref={ref}
        className="hstack w-100 justify-between bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 text-white "
      >
        <nav className="hstack gap-2 px-4 py-2">
          <button
            className={`rounded-md px-1 py-1 bg-white/20 cursor-pointer hover:bg-white/30 ${
              controls.audio ? 'bg-white/30' : ''
            }`}
            onClick={() => PubSub.publish(CONFERENCE_EVENTS.AUDIO_TOGGLE)}
          >
            {controls.audio ? <MicOn /> : <MicOff />}
          </button>
          <button
            className={`rounded-md px-1 py-1 bg-white/20 cursor-pointer hover:bg-white/30 ${
              controls.video ? 'bg-white/30' : ''
            }`}
            onClick={() => PubSub.publish(CONFERENCE_EVENTS.VIDEO_TOGGLE)}
          >
            {controls.video ? <CameraOn /> : <CameraOff />}
          </button>
        </nav>
        <div className="hstack px-6 py-2">{roomState.name}</div>
        <nav className="hstack gap-2 px-4 py-2">
          <button
            className={`rounded-md px-4 py-1 bg-white/20 cursor-pointer hover:bg-white/30`}
            onClick={() => PubSub.publish(CONFERENCE_EVENTS.ROOM_LEAVE)}
          >
            Leave
          </button>
        </nav>
      </footer>
    );
  }
);

export { StudioFooter };
