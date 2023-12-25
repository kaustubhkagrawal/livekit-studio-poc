import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@kaustubhkagrawal/ui';
import { useForm } from 'react-hook-form';
import { InferType } from 'yup';
import { joinFormSchema } from './schemas';

interface PreJoinProps {
  next: (data: InferType<typeof joinFormSchema>) => void;
  roomName?: string;
}

export function PreJoin({ next, roomName }: PreJoinProps) {
  const { register, handleSubmit } = useForm<InferType<typeof joinFormSchema>>({
    resolver: yupResolver(joinFormSchema),
    defaultValues: {
      roomName: roomName ?? '',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDM1MjU4MDUsImlzcyI6IkFQSUtKcE1WNXFOUGRaVSIsIm5iZiI6MTcwMzQzOTQwNSwic3ViIjoicXVpY2tzdGFydCB1c2VyIGk4YmxucSIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiJxdWlja3N0YXJ0IHJvb20iLCJyb29tSm9pbiI6dHJ1ZX19.GC23LyAO7-My2c7pZPvJm2WS-e4J8Y5lLeLDt4FbGfg',
    },
  });

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-64 lg:w-80 border-1 rounded-lg">
        <form className="px-3 py-4" onSubmit={handleSubmit(next)}>
          <Input id="username" label="Username" {...register('userName')} />
          <Input id="room" label="Room" {...register('roomName')} />
          <Input
            id="token"
            itemType={'password'}
            label="Token"
            {...register('token')}
          />
          <button type="submit">Join</button>
        </form>
      </div>
    </div>
  );
}
