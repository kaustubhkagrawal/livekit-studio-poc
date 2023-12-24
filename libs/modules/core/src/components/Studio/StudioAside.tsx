import { forwardRef } from 'react';

interface StudioAsideProps {}

const StudioAside = forwardRef<HTMLDivElement, StudioAsideProps>(
  (props, ref) => {
    return (
      <aside
        ref={ref}
        className={`hidden md:flex flex-col w-full md:w-80 gap-2`}
      >
        <nav className="hstack justify-end w-full px-4 pt-4 gap-2">hi</nav>
        <div className="hidden md:flex flex-1 mx-2 mb-4 rounded-lg bg-blue-800"></div>
      </aside>
    );
  }
);

export { StudioAside };
