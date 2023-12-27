import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Spinner } from '@kaustubhkagrawal/ui';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InferType } from 'yup';
import { joinFormSchema } from './schemas';
import PubSub from 'pubsub-js';
import { CONFERENCE_EVENTS } from '@kaustubhkagrawal/shared';

interface PreJoinProps {
  next: (data: InferType<typeof joinFormSchema>, token: string) => void;
  roomName?: string;
  apiUrl: string;
}

export function PreJoin({ next, roomName, apiUrl }: PreJoinProps) {
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    PubSub.subscribe(CONFERENCE_EVENTS.ROOM_CONNECT_SUCCESS, () => {
      setIsLoading(false);
    });
  });

  const onSubmit = async (data: InferType<typeof joinFormSchema>) => {
    try {
      setIsLoading(true);
      const url = `${apiUrl}api/token`;
      const response = await axios.post(url, data);

      if (response.status === 201) {
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
            autoFocus
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
            {isLoading ? (
              <Spinner className="-ml-6 mr-2 mb-1 text-blue-200 dark:text-blue-700 fill-white w-4 h-4" />
            ) : null}
            Join
          </button>
        </form>
      </div>
    </div>
  );
}
