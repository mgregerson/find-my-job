import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../lib/prisma";
import { compare } from "bcrypt";

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

        console.log(user, "USER2");

        const isPasswordValid = await compare(
          credentials.password,
          user.password as string
        );

        if (!isPasswordValid) return null;

        const userData = {
          id: String(user.id), // Cast user.id to a string
          email: user.email,
          name: user.email,
        };

        return userData;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log(url, "URL");
      console.log(baseUrl, "BASEURL");

      return `${baseUrl}/jobs`;
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    // user only passed in the first time they log in
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
  },
};
