import { useLayout } from '@kaustubhkagrawal/ui';
import { forwardRef } from 'react';
import { StudioTile } from './StudioTile';
import { ConferenceSDK } from '@kaustubhkagrawal/core';

interface StudioContentProps {
  footerHeight: number;
  asideWidth: number;
  // items: number;
}

const StudioContent = forwardRef<HTMLDivElement, StudioContentProps>(
  ({ footerHeight, asideWidth, ...props }, parentRef) => {
    const participants = Object.keys(
      ConferenceSDK.provider.room?.participants ?? {}
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
        {participants.map((el, i) => (
          <StudioTile
            key={i}
            id={`participant-${el}`}
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
