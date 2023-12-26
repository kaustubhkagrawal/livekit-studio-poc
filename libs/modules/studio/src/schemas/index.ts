import { object, string } from 'yup';

export const joinFormSchema = object({
  roomName: string().required().min(3).max(20).label('Room name'),
  userName: string().required().min(3).label('Username'),
  // .max(15),
});
