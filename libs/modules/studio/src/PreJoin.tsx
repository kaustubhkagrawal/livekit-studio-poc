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
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<InferType<typeof joinFormSchema>>({
    mode: 'all',
    resolver: yupResolver(joinFormSchema),
    defaultValues: {
      roomName: roomName ?? '',
    },
  });

  const onSubmit = async (data: InferType<typeof joinFormSchema>) => {
    try {
      const response = await axios.post(`${apiUrl}api/token`, data);

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
          <Input
            id="username"
            label="Username"
            {...register('userName')}
            hasError={!!errors.userName}
            helperText={errors.userName?.message}
          />
          <Input
            id="room"
            label="Room"
            {...register('roomName')}
            hasError={!!errors.roomName}
            helperText={errors.roomName?.message}
          />
          <button
            className="w-full rounded-md border border-blue-500 py-1 text-blue-500 hover:bg-blue-500 hover:text-blue-100 disabled:border-gray-500 disabled:text-gray-500 disabled:hover:bg-gray-500 disabled:hover:text-gray-100 cursor-pointer outline-none"
            type="submit"
            disabled={!isValid}
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
}
