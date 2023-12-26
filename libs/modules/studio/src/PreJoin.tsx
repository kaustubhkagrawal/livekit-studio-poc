import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@kaustubhkagrawal/ui';
import { useForm } from 'react-hook-form';
import { InferType } from 'yup';
import { joinFormSchema } from './schemas';
import axios from 'axios';
import { error } from 'console';

interface PreJoinProps {
  next: (data: InferType<typeof joinFormSchema>, token: string) => void;
  roomName?: string;
  apiUrl: string;
}

export function PreJoin({ next, roomName, apiUrl }: PreJoinProps) {
  const { register, handleSubmit } = useForm<InferType<typeof joinFormSchema>>({
    resolver: yupResolver(joinFormSchema),
    defaultValues: {
      roomName: roomName ?? '',
    },
  });

  const onSubmit = async (data: InferType<typeof joinFormSchema>) => {
    try {
      const response = await axios.post(apiUrl, data);

      if (response.status === 200) {
        next({ ...data }, response.data.token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-64 lg:w-80 border-1 rounded-lg">
        <form className="px-3 py-4" onSubmit={handleSubmit(onSubmit)}>
          <Input id="username" label="Username" {...register('userName')} />
          <Input id="room" label="Room" {...register('roomName')} />
          <button type="submit">Join</button>
        </form>
      </div>
    </div>
  );
}
