import { forwardRef } from 'react';
import PubSub from 'pubsub-js';
import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';

interface StudioFooterProps {}

const StudioFooter = forwardRef<HTMLDivElement, StudioFooterProps>(
  (props, ref) => {
    return (
      <footer
        ref={ref}
        className="hstack w-100 justify-between bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 text-white "
      >
        <nav className="hstack gap-2 px-4 py-2">
          <button
            onClick={() => PubSub.publish(CONFERENCE_EVENTS.AUDIO_TOGGLE, true)}
          >
            {' '}
            Toggle Audio{' '}
          </button>
        </nav>
        <div className="hstack px-6 py-2">Logo</div>
        <nav className="hstack gap-2 px-4 py-2">Right</nav>
      </footer>
    );
  }
);

export { StudioFooter };
