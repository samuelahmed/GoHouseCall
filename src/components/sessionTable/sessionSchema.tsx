import { z } from "zod";

export const sessionSchema = z.object({
  id: z.string(),
  sessionType: z.string().nullable(),
  description: z.string().nullable(),
  status: z.string().nullable(),
});

export type SessionSchema = z.infer<typeof sessionSchema>;
