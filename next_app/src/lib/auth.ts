import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcrypt";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

import authConfig from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const validatedFields = LoginSchema.safeParse({ email, password });

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          try {
            const currentUser = await getUserByEmail(email);

            if (!currentUser || !currentUser.password) {
              return null;
            }
            const passwordsMatch = await bcrypt.compare(
              password,
              currentUser.password,
            );
            if (passwordsMatch) {
              return currentUser;
            }
          } catch (e) {
            console.error(e);
            return null;
          }
          return null;
        }
        return null;
      },
    }),
  ],
});
