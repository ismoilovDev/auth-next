import NextAuth from 'next-auth';
import { authConfig } from './auth.config';


export const {
   handlers: { GET, POST },
   auth,
   signIn,
   signOut
} = NextAuth({
   ...authConfig,
   pages: {
      signIn: "/auth/login"
   },
   callbacks: {

      async session({ token, session }) {
         if (token.sub && session.user) {
            session.user.id = token.sub;
         }

         if (session.user) {
            session.user.name = token.name;
            session.user.email = token.email;
         }

         return session;
      },
   },
});