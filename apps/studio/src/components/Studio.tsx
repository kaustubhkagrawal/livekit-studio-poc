import styles from './Studio.module.css';

export interface StudioProps {}

/**
 *
 * Main Studio(Video Conference) Page.
 */
export function Studio(props: StudioProps) {
  return (
    <main className="vstack h-screen overflow-hidden bg-blue-200">
      <section className="flex flex-1 gap-2">
        <div id="layout-container" className="flex flex-1 gap-2 py-4 pl-4">
          <div className="flex flex-auto rounded-xl gap-2 px-4 py-4 bg-blue-300">
            {' '}
            hi
          </div>
        </div>
        <aside
          className={`hidden md:flex flex-col w-full md:w-80 px-4 py-4 gap-2`}
        >
          <nav className="hstack justify-end w-full px-2 gap-2">hi</nav>
          <div className="hidden md:flex flex-1 rounded-lg bg-blue-800"></div>
        </aside>
      </section>
      <footer className="hstack w-100 justify-between px-4 py-2 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 text-white ">
        <nav className="hstack gap-2 px-4">Left</nav>
        <div className="hstack px-2">Logo</div>
        <nav className="hstack gap-2 px-4">Right</nav>
      </footer>
    </main>
  );
}
