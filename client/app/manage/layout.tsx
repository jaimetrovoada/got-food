"use client";

import Container from "@/components/Container";
import { useSession } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      throw new Error("NotLoggedIn");
      // The user is not authenticated, handle it here.
    },
  });
  if (status === "loading") {
    return <div>Loading</div>;
  }

  return <Container className="overflow-y-hidden">{children}</Container>;
}
