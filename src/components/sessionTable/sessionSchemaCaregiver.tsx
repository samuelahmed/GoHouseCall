import { z } from "zod";

export const sessionSchemaCaregiver = z.object({
  id: z.string(),
  sessionType: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  applicationStatus: z.string().nullable(),
  city: z.string().nullable(),
  date: z.date().nullable(),
  startTime: z.string().nullable(),
  duration: z.number().nullable(),
  total: z.number().nullable(),
});

export type sessionSchemaCaregiver = z.infer<typeof sessionSchemaCaregiver>;
