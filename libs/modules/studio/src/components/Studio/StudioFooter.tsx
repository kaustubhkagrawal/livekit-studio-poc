import { forwardRef } from 'react';
import PubSub from 'pubsub-js';
import { CONFERENCE_EVENTS, RootState } from '@kaustubhkagrawal/shared';
import { useSelector } from 'react-redux';

interface StudioFooterProps {}

const StudioFooter = forwardRef<HTMLDivElement, StudioFooterProps>(
  (props, ref) => {
    const controls = useSelector((state: RootState) => state.controls);
    return (
      <footer
        ref={ref}
        className="hstack w-100 justify-between bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 text-white "
      >
        <nav className="hstack gap-2 px-4 py-2">
          <button
            onClick={() => PubSub.publish(CONFERENCE_EVENTS.AUDIO_TOGGLE)}
          >
            {' '}
            Toggle Audio {controls.audio ? 'off' : 'on'}
          </button>
          <button
            onClick={() => PubSub.publish(CONFERENCE_EVENTS.VIDEO_TOGGLE)}
          >
            {' '}
            Toggle Video {controls.video ? 'off' : 'on'}
          </button>
        </nav>
        <div className="hstack px-6 py-2">Logo</div>
        <nav className="hstack gap-2 px-4 py-2">
          <button onClick={() => PubSub.publish(CONFERENCE_EVENTS.ROOM_LEAVE)}>
            Leave
          </button>
        </nav>
      </footer>
    );
  }
);

export { StudioFooter };
