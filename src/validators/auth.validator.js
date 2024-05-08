import { z } from 'zod';

export const signUpValidator = z.object({
  firstName: z.string().min(3).max(10),
  lastName: z.string().min(3).max(10),
  password: z.string().min(8).max(12, { message: 'Password should not be less than 8 characters' }),
  email: z.string({ message: 'Email should not be less than 3 characters' }),
  confirmPassword: z.string().min(8).max(12, { message: 'Password should be same' }),
  address: z.string().min(5).max(40, { message: 'You should get sense' }),
  phone: z.string().min(11).max(11, { message: 'Please enter an actual phone number' }),
}).required({ message: 'Please enter all the required fields' });

export const signInValidator = z.object({
  loginID: z.string({ message: 'Email should not be less than 3 characters' }),
  password: z.string().min(8).max(12, { message: 'Password should not be less than 8 characters' }),
}).required({ message: 'Please enter all the required fields' });
