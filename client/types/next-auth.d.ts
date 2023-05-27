import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      role: "customer" | "business";
      restaurants: string[];
      orders: string[];
      id: string;
      token: string;
    };
  }
}
