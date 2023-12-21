import { z } from 'zod';

export const loginValidator = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerValidator = z.object({
  id: z.number().optional(), // autoincremented in Prisma, so it might be optional
  first_name: z.string(),
  last_name: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string().email(),
  password: z.string(),
  city: z.string(),
  date_of_birth: z.date(),
  gender: z.string(),
  contact_preference: z.string(),
  cedula: z.string(),
  user_type: z.enum(['admin', 'seller', 'customer']),
});
