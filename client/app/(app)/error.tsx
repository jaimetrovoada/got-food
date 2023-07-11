"use client"; // Error components must be Client components

import Button from "@/components/Button";
import Container from "@/components/Container";
import Unauthorized from "@/components/Unauthorized";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  if (error.message === "NotLoggedIn") {
    return <Unauthorized />;
  }

  return (
    <Container className="h-full items-center justify-center gap-4">
      <h2 className="text-3xl font-bold">Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </Container>
  );
}
