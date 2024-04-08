import { z } from "zod";

export const LoginSchema = z.object({
   phone: z.string().min(5, {
      message: "Email is required",
   }),
   password: z.string().min(1, {
      message: "Password is required",
   })
});