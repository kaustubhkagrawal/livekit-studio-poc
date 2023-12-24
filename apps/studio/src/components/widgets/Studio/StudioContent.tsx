import { useLayout } from '@kaustubhkagrawal/ui';
import { forwardRef } from 'react';
import { StudioTile } from './StudioTile';

interface StudioContentProps {
  footerHeight: number;
  asideWidth: number;
  items: number;
}

const StudioContent = forwardRef<HTMLDivElement, StudioContentProps>(
  ({ footerHeight, asideWidth, items, ...props }, parentRef) => {
    const [ref, tileCalc] = useLayout<HTMLDivElement>({ items });
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
        {Array(Math.floor(items))
          .fill(0)
          .map((el, i) => (
            <StudioTile
              key={i}
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
