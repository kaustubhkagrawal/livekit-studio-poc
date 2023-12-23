import { useMeasure } from 'react-use';
import styles from './Studio.module.css';
import { StudioTile } from './StudioTile';

export interface StudioProps {}

interface Dimension {
  w: number;
  h: number;
}

function getDim(
  dim: Dimension,
  aspectRatio: number,
  row: number,
  col: number
): Dimension {
  const maxWidth = Math.min(dim.w / col, (dim.h / row) * aspectRatio);

  const maxHeight = Math.min(dim.w / (col * aspectRatio), dim.h / row);

  return { w: maxWidth, h: maxHeight };
}

const calcDimension = (
  containerDim: Dimension,
  items: number = 1,
  aspectRatio = 16 / 9
) => {
  let maxArea = 0;
  let flag = true;
  let col = Math.max(Math.floor(items / 2), 1);
  let row = Math.max(items - col, 1);

  let prevCol = col;
  let prevRow = row;

  while (maxArea > 0 && flag) {
    const tileDim = getDim(containerDim, aspectRatio, row, col);

    const area = tileDim.w * tileDim.h * row * col;

    if (area > maxArea) {
      maxArea = area;
      prevCol = col;
      prevRow = row;
      if (tileDim.w < containerDim.w / col) {
        col++;
      } else {
        row++;
      }
    } else {
      flag = false;
    }
  }

  return getDim(containerDim, aspectRatio, prevRow, prevCol);
};

/**
 *
 * Main Studio(Video Conference) Page.
 */
export function Studio(props: StudioProps) {
  const items = 10;

  const [ref, { width, height }] = useMeasure<HTMLDivElement>();

  const tileDim = calcDimension({ w: width, h: height }, items);

  return (
    <main className="vstack h-screen overflow-hidden bg-blue-200">
      <section className="flex flex-1 max-h-full gap-1">
        <div
          ref={ref}
          id="layout-container"
          className="flex flex-1 flex-wrap overflow-hidden justify-center items-center content-center gap-2 py-4 pl-4"
        >
          {Array(items)
            .fill(0)
            .map((el, i) => (
              <StudioTile
                key={i}
                style={{
                  width: `${tileDim.w}px`,
                }}
              />
            ))}
        </div>
        <aside
          className={`hidden md:flex flex-col w-full md:w-80 px-2 py-4 gap-2`}
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
