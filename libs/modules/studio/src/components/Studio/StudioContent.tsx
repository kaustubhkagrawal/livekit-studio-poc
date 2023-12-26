import { RootState } from '@kaustubhkagrawal/shared';
import { useLayout } from '@kaustubhkagrawal/ui';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { StudioTile } from './StudioTile';

interface StudioContentProps {
  footerHeight: number;
  asideWidth: number;
  // items: number;
}

const StudioContent = forwardRef<HTMLDivElement, StudioContentProps>(
  ({ footerHeight, asideWidth, ...props }, parentRef) => {
    const participants = useSelector(
      (state: RootState) => state.participants.participants
    );

    const [ref, tileCalc] = useLayout<HTMLDivElement>({
      items: participants.length,
    });

    console.log('tileCalc', tileCalc);

    return (
      <div
        ref={ref}
        id="layout-container"
        className="flex flex-wrap overflow-hidden justify-center items-center content-center gap-2 py-4 mx-4 md:mr-0"
        style={{
          height: `calc(100vh - ${footerHeight}px)`,
          width: `calc(100% - ${asideWidth}px)`,
        }}
      >
        {participants.map((participant, i) => (
          <StudioTile
            key={participant.sid}
            participant={participant}
            style={{
              width: `${tileCalc.dim.w}px`,
            }}
          />
        ))}
      </div>
    );
  }
);

export { StudioContent };
