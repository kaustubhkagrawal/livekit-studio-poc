import { object, string } from 'yup';

export const joinFormSchema = object({
  roomName: string().required().min(3).max(20),
  userName: string().required().min(3),
  // .max(15),
});
