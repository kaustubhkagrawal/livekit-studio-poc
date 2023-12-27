import { RootState } from '@kaustubhkagrawal/shared';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';

interface StudioAsideProps {}

const StudioAside = forwardRef<HTMLDivElement, StudioAsideProps>(
  (props, ref) => {
    const participants = useSelector(
      (state: RootState) => state.participants.participants
    );

    return (
      <aside
        ref={ref}
        className={`hidden md:flex flex-col w-full md:w-80 gap-2 text-white`}
      >
        {/* <nav className="hstack justify-end w-full px-4 pt-4 gap-2">hi</nav> */}
        <div className="hidden md:flex flex-col flex-1 mx-2 my-4 px-4 py-4 rounded-lg gap-2 bg-blue-400">
          <h2 className="text-xl">Participants</h2>
          <div className="hstack gap-2 flex-wrap">
            {participants.map((participant) => (
              <div
                key={participant.sid}
                className="vstack items-center"
                style={{ width: '60px' }}
              >
                <img
                  src={`https://gravatar.com/avatar/${participant.sid.toLowerCase()}?d=identicon`}
                  alt={participant.identity}
                  className="rounded-full bg-blue-500 w-10 h-10"
                />
                <div className="text-sm text-center text-truncate whitespace-nowrap overflow-hidden w-full">
                  {participant.identity.split(' ')[0]}
                </div>
              </div>
            ))}
          </div>
          <div id="aside-footer" className="mt-auto text-center text-sm">
            There are {participants.length ?? 0} participants today.
          </div>
        </div>
      </aside>
    );
  }
);

export { StudioAside };
