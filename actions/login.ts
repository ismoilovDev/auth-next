"use server"
import * as z from "zod";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/schemas";
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (
   values: z.infer<typeof LoginSchema>,
   callbackUrl?: string | null,
) => {
   const validatedFields = LoginSchema.safeParse(values)

   if (!validatedFields.success) {
      return { error: "Maydon xato kiritildi!" }
   }
   const { phone, password } = validatedFields.data

   try {
      await signIn('credentials', {
         phone,
         password,
         redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      });
   } catch (error) {
      if (error instanceof AuthError) {
         switch (error.type) {
            case 'CredentialsSignin':
               return { error: "Email yoki parol xato!" }
            default:
               return { error: "Something went wrong!" }
         }
      }
      throw error;
   }

}
