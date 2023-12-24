import { useMeasure } from 'react-use';

interface Dimension {
  w: number;
  h: number;
}

function getDim(
  dim: Dimension,
  aspectRatio: number,
  row: number,
  col: number,
  gap: number,
  hasGap: boolean = true
): Dimension {
  const maxWidth = Math.max(
    Math.min(dim.w / col, (dim.h / row) * aspectRatio),
    100
  );

  const maxHeight = Math.max(
    Math.min(dim.w / (col * aspectRatio), dim.h / row),
    100
  );

  const extraGap = hasGap ? gap * 2 : 0;

  return { w: maxWidth - extraGap, h: maxHeight - extraGap };
}

const calcDimension = (
  containerDim: Dimension,
  items: number = 1,
  aspectRatio = 16 / 9,
  gap = 4
) => {
  const isPotrait = containerDim.w / containerDim.h < aspectRatio;

  const sqrt = Math.sqrt(items);
  const col = Math.max(isPotrait ? Math.floor(sqrt) : Math.ceil(sqrt), 1);
  const row = Math.max(Math.ceil(items / col), 1);

  return {
    dim: getDim(containerDim, aspectRatio, row, col, gap),
    grid: { row, col: col },
  };
};

interface useLayoutProps {
  items: number;
}

export type useLayoutRef<E extends Element = Element> = (element: E) => void;

export type useLayoutResult<E extends Element = Element> = [
  useLayoutRef<E>,
  ReturnType<typeof calcDimension>
];

export function useLayout<E extends Element = Element>({
  items = 1,
}: useLayoutProps): useLayoutResult<E> {
  const [ref, { width, height }] = useMeasure<E>();
  const tileCalc = calcDimension({ w: width, h: height }, items);

  return [ref, tileCalc];
}
