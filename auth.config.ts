
import type { NextAuthConfig } from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from './schemas';

async function login(credentials: { phone: string, password: string }) {
   try {
      const response = await fetch('https://todo.de-code.uz/api/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(credentials),
      });

      if (response.ok) {
         const user = await response.json();

         return user;
      } else {
         return null;
      }
   } catch (error) {
      console.error('Failed to login:', error);
      return null;
   }
}


export const authConfig = {
   providers: [
      Credentials({
         async authorize(credentials) {
            const validatedFields = LoginSchema.safeParse(credentials);

            if (validatedFields.success) {
               const user = await login(validatedFields.data)
               return user
            }

            return null;
         }
      }),
   ],
   callbacks: {
      async authorized({ auth, request: { nextUrl } }) {
         const isLoggedIn = !!auth?.user;
         const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
         if (isOnDashboard) {
            if (isLoggedIn) return true;
            return false;
         } else if (isLoggedIn) {
            return Response.redirect(new URL('/dashboard', nextUrl));
         }
         return true;
      },
   },
} satisfies NextAuthConfig