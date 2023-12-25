import { object, string } from 'yup';

export const joinFormSchema = object({
  roomName: string().optional().min(3).max(20),
  userName: string().optional().min(3),
  token: string().required().min(3),
  // .max(15),
});
