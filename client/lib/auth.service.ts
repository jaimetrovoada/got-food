import { LoginResponse, LoginRequest } from "@/types";
import { API } from "./constants";
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
        const [res, err] = await authService.login(credentials);
        if (err) {
          return null;
        }

        const user = res;
        return user;
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
        token.user = user as LoginResponse;
      }
      return token;
    },
  },
};

export const getUser = async () => {
  const session = await getServerSession(nextAuthOptions);

  return session?.user;
};

const login = async (credentials: LoginRequest) => {
  try {
    const res = await fetch(API.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();

    return [data, null] as [LoginResponse, null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const register = async (payload: {
  name: string;
  email: string;
  password: string;
  role: "customer" | "business";
}) => {
  try {
    const res = await fetch(API.register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return [res.status, null] as [number, null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const updateUser = async (
  token: string,
  id: string,
  payload: {
    name: string;
    email: string;
    password: string;
    role: string;
  }
) => {
  try {
    const res = await fetch(`${API.users}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    return [res.status, null] as [number, null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const authService = {
  login,
  register,
  updateUser,
};

export default authService;
