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
        className={`hidden md:flex flex-col w-full md:w-80 gap-2`}
      >
        <nav className="hstack justify-end w-full px-4 pt-4 gap-2">hi</nav>
        <div className="hidden md:flex flex-1 mx-2 mb-4 px-4 py-4 rounded-lg gap-2 bg-blue-400">
          {participants.map((participant) => (
            <div className="vstack items-center max-w-20">
              <img
                src={`https://gravatar.com/avatar/${participant.sid.toLowerCase()}?d=identicon`}
                alt={participant.identity}
                className="rounded-full bg-blue-500 w-10 h-10"
              ></img>
              <div>{participant.identity}</div>
            </div>
          ))}
        </div>
      </aside>
    );
  }
);

export { StudioAside };
