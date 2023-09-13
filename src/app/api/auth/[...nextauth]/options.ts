import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../lib/prisma";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@test.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your awesome password",
        },
      },
      async authorize(credentials, profile) {
        console.log(credentials, "CREDENTIALS");

        console.log(profile, "PROFILE");

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        console.log(user, "USER2");

        if (!user) return null;
        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}`;
      else if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
  },
};
