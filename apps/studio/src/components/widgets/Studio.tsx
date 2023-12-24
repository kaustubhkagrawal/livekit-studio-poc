import { useLayout } from '@kaustubhkagrawal/ui';
import { useMeasure } from 'react-use';
import { StudioTile } from './StudioTile';

export interface StudioProps {}

/**
 *
 * Main Studio(Video Conference) Page.
 */
export function Studio(props: StudioProps) {
  const items = 10;

  const [asideRef, { width: asideWidth }] = useMeasure<HTMLDivElement>();
  const [footerRef, { height: footerHeight }] = useMeasure<HTMLDivElement>();

  const [ref, tileCalc] = useLayout<HTMLDivElement>({ items });
  console.log('tileCalc', tileCalc);

  return (
    <main className="vstack h-screen overflow-hidden bg-blue-200">
      <section className="flex flex-1 max-h-full gap-1">
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
        <aside
          ref={asideRef}
          className={`hidden md:flex flex-col w-full md:w-80 gap-2`}
        >
          <nav className="hstack justify-end w-full px-4 pt-4 gap-2">hi</nav>
          <div className="hidden md:flex flex-1 mx-2 mb-4 rounded-lg bg-blue-800"></div>
        </aside>
      </section>
      <footer
        ref={footerRef}
        className="hstack w-100 justify-between bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 text-white "
      >
        <nav className="hstack gap-2 px-4 py-2">Left</nav>
        <div className="hstack px-6 py-2">Logo</div>
        <nav className="hstack gap-2 px-4 py-2">Right</nav>
      </footer>
    </main>
  );
}
