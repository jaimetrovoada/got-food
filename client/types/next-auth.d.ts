import NextAuth from "next-auth";
import "next-auth/jwt";
import { IUser } from ".";

declare module "next-auth" {
  interface Session {
    user: IUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: IUser;
  }
}
