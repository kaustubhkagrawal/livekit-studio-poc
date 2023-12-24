import { HTMLAttributes } from 'react';

interface StudioTileProps extends HTMLAttributes<HTMLDivElement> {}

export function StudioTile(props: StudioTileProps) {
  return (
    <div
      className="flex aspect-video rounded-xl gap-2 px-4 py-4 bg-blue-300"
      {...props}
    >
      hi
    </div>
  );
}
