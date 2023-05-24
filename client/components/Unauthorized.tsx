"use client";

import { useRouter } from "next/navigation";
import Container from "./Container";
import { useState, useEffect } from "react";

const Unauthorized = () => {
  const router = useRouter();

  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(interval);
      router.replace("/");
    }

    return () => clearInterval(interval);
  }, [count, router]);

  return (
    <Container className="flex items-center justify-center">
      <h2 className="text-3xl font-bold">Unauthorized</h2>
      <p>You&apos;re being redirected to the home page in {count}s</p>
    </Container>
  );
};

export default Unauthorized;
