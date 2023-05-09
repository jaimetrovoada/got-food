"use client";

import { useRestaurant } from "@/hooks";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useParams();
  const slug = router?.slug as string;

  const { restaurant } = useRestaurant(slug);

  console.log({ router });

  return (
    <section className="mx-auto w-full max-w-screen-md">
      <h1>{restaurant?.name}</h1>
      <p>{restaurant?.description}</p>
      <p>{restaurant?.address}</p>
    </section>
  );
};

export default Page;
