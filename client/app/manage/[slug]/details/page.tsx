"use client";

import Button from "@/components/Button";
import { useRestaurant, useToasts } from "@/lib/hooks";
import { RootState } from "@/lib/reducers/store";
import restaurantsService from "@/lib/restaurantsService";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const router = useRouter();

  const { setErrorMsg, setSuccessMsg } = useToasts();

  const { restaurant } = useRestaurant(slug);
  const user = useSelector((state: RootState) => state.user);

  const handleDeleteRestaurant = async () => {
    try {
      const res = await restaurantsService.deleteRestaurant(
        user.token,
        restaurant?.id
      );

      if (res.status === 200) {
        setSuccessMsg("Restaurant deleted successfully");
        router.replace(`/users/${user.id}/restaurants`);
      }
      console.log({ res });
    } catch (error) {
      console.log({ delError: error });
      setErrorMsg("Something went wrong");
    }
  };

  return (
    <section className="mx-auto w-full max-w-screen-md">
      <h1>{restaurant?.name}</h1>
      <p>{restaurant?.description}</p>
      <p>{restaurant?.address}</p>
      <Button onClick={handleDeleteRestaurant} className="bg-red-500">
        🗑️
      </Button>
    </section>
  );
};

export default Page;
