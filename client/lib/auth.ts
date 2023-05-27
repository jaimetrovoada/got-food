import authService from "@/lib/authService";
import { IUser } from "@/types";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV !== "production",
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await authService.login(credentials);
        const user = { ...res.data.user, token: res.data.token };
        if (res.status === 200 && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user as IUser;
      }
      return token;
    },
  },
};

export const getUser = async () => {
  const session = await getServerSession(nextAuthOptions);

  return session?.user;
};
