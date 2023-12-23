export interface StudioProps {}

/**
 *
 * Main Studio(Video Conference) Page.
 */
export function Studio(props: StudioProps) {
  return (
    <main className="vstack h-screen overflow-hidden bg-blue-200">
      <section className="flex flex-1">
        <div id="layout-container" className="flex-1"></div>
        <aside className="w-full md:w-80 px-4 py-4 hidden md:flex flex-col bg-blue-800">
          aside
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
