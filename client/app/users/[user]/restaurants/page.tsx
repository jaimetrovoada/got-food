"use client";

import { CardSkeleton, LinkCard } from "@/components/Card";
import RestaurantForm from "@/components/Forms/RestaurantForm";
import { useFileInput, useInput, useToasts } from "@/hooks";
import { RootState } from "@/reducers/store";
import restaurantsService from "@/services/restaurantsService";
import { useUserRestaurants } from "@/hooks";
import React from "react";
import { useSelector } from "react-redux";

const UserRestaurantPage = () => {
  const user = useSelector((state: RootState) => state.user);

  const { restaurants, isLoading } = useUserRestaurants(user.id);
  console.log({ restaurants });

  const [nameValue, nameInput] = useInput("");
  const [descriptionValue, descriptionInput] = useInput("");
  const [addressValue, addressInput] = useInput("");
  const [imageValue, imageInput] = useFileInput();

  const { setSuccessMsg, setErrorMsg } = useToasts();

  const formHandlers = {
    handleSubmit: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("handleSubmit");
      try {
        const res = await restaurantsService.createRestaurant(user.token, {
          name: nameValue,
          description: descriptionValue,
          address: addressValue,
          logo: imageValue,
        });
        console.log({ res });
        if (res.status === 201) {
          setSuccessMsg("Restaurant created");
        }
      } catch (err) {
        console.log({ err });
        setErrorMsg("something went wrong");
      }
    },
    handleNameInput: nameInput,
    handleDescInput: descriptionInput,
    handleAddrInput: addressInput,
    handleLogoUpload: imageInput,
  };

  return (
    <section className="mx-auto w-full max-w-screen-md">
      <RestaurantForm {...formHandlers} />
      <div className="flex flex-col gap-4">
        <h3>your restaurants</h3>

        <div className="flex flex-col gap-4">
          {isLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            restaurants.map((restaurant) => (
              <LinkCard
                href={`/users/${user.id}/restaurants/${restaurant.id}/details`}
                key={restaurant.id}
                name={restaurant.name}
                description={restaurant.description}
                imageUrl={restaurant.logo}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default UserRestaurantPage;
