import { useMeasure } from 'react-use';
import { StudioAside, StudioContent, StudioFooter } from './components';
import { ConferenceSDK } from '@kaustubhkagrawal/core';

export interface StudioProps {}

/**
 *
 * Main Studio(Video Conference) Page.
 */
export function Studio(props: StudioProps) {
  const items = ConferenceSDK.room.numParticipants;

  const [asideRef, { width: asideWidth }] = useMeasure<HTMLDivElement>();
  const [footerRef, { height: footerHeight }] = useMeasure<HTMLDivElement>();

  return (
    <main className="vstack h-screen overflow-hidden bg-blue-200">
      <section className="flex flex-1 max-h-full gap-1">
        <StudioContent
          asideWidth={asideWidth}
          footerHeight={footerHeight}
          items={items}
        />
        <StudioAside ref={asideRef} />
      </section>
      <StudioFooter ref={footerRef} />
    </main>
  );
}
