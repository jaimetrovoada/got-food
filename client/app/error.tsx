"use client"; // Error components must be Client components

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Container from "@/components/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error({ error });
  }, [error]);

  if (error.message === "NotLoggedIn") {
    setTimeout(() => {
      router.replace("/");
    }, 5000);
    return (
      <Container className="flex items-center justify-center">
        <h2 className="text-3xl font-bold">Unauthorized</h2>
        <p>You&apos;re being redirected to the home page</p>
      </Container>
    );
  }

  return (
    <Container className="flex items-center justify-center">
      <h2 className="text-3xl font-bold">Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </Container>
  );
}
