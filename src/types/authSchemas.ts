import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const registerSchema = loginSchema.extend({
  email: z.string(),
});

export type CredentialLogin = z.infer<typeof loginSchema>;
export type CredentialRegister = z.infer<typeof registerSchema>;
