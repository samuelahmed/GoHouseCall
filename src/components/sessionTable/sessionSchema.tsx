import { z } from "zod";

export const sessionSchema = z.object({
  id: z.string(),
  sessionType: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  status: z.string().nullable(),
  city: z.string().nullable(),
  date: z.date().nullable(),
  startTime: z.string().nullable(),
  duration: z.number().nullable(),
  total: z.number().nullable(),
});

export type SessionSchema = z.infer<typeof sessionSchema>;
