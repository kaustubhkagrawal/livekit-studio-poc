import { Participant } from '@kaustubhkagrawal/shared';
import { HTMLAttributes } from 'react';

interface StudioTileProps extends HTMLAttributes<HTMLDivElement> {
  participant: Participant;
}

export function StudioTile({ participant, ...props }: StudioTileProps) {
  return (
    <div
      id={participant.sid}
      className="flex aspect-video rounded-xl gap-2 px-4 py-4 bg-blue-300"
      {...props}
    >
      {participant.identity}
    </div>
  );
}
