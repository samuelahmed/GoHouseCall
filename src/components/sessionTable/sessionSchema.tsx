import { z } from "zod";

export const sessionSchema = z.object({
  id: z.string(),
  sessionType: z.string(),
  description: z.string(),
  status: z.string(),
});

export type SessionSchema = z.infer<typeof sessionSchema>;
