import NextAuth from "next-auth";
import "next-auth/jwt";
import { LoginResponse } from ".";

declare module "next-auth" {
  interface Session {
    user: LoginResponse;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: LoginResponse;
  }
}
