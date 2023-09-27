import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../lib/prisma";
import { compare } from "bcrypt";
import { User } from "@prisma/client";

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
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) return null;

        const isPasswordValid = await compare(
          credentials.password,
          user.password as string
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      return `/`;
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    session: ({ session, token }) => {
      console.log("SESSION=", {
        ...session,
        user: {
          ...session.user,
          id: Number(token.id),
        },
      });
      return {
        ...session,
        user: {
          ...session.user,
          id: Number(token.id),
        },
      };
    },
    // user only passed in the first time they log in
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        console.log("JWT RESPONSE=", {
          ...token,
          id: u.id,
        });
        return {
          ...token,
          id: Number(u.id),
        };
      }
      return token;
    },
  },
};
