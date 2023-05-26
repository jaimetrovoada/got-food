"use client";

import { CardSkeleton, LinkCard } from "@/components/Card";
import RestaurantForm from "@/components/Forms/RestaurantForm";
import { useFileInput, useInput, useToasts } from "@/hooks";
import { RootState } from "@/reducers/store";
import restaurantsService from "@/services/restaurantsService";
import { useUserRestaurants } from "@/hooks";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Modal, { ModalHandler } from "@/components/Modal";
import CardWrapper from "@/components/CardWrapper";
import Button from "@/components/Button";

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

  const modalRef = useRef<ModalHandler>(null);

  return (
    <section className="mx-auto w-full max-w-screen-lg">
      <Modal ref={modalRef}>
        <RestaurantForm {...formHandlers} />
      </Modal>
      <CardWrapper>
        <h3 className="text-3xl font-bold text-center">Your Restaurants</h3>
        <Button
          variant="custom"
          className="w-full rounded-lg bg-blue-200/50 p-4 font-bold text-blue-600"
          onClick={() => modalRef.current?.show()}
        >
          Add Restaurant
        </Button>

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
                href={`/manage/${restaurant.id}/details`}
                key={restaurant.id}
                name={restaurant.name}
                description={restaurant.description}
                imageUrl={restaurant.logo}
              />
            ))
          )}
        </div>
      </CardWrapper>
    </section>
  );
};

export default UserRestaurantPage;
