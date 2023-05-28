"use client";

import { CardSkeleton, LinkCard } from "@/components/Card";
import RestaurantForm from "@/components/Forms/RestaurantForm";
import { useFileInput, useInput, useToasts } from "@/lib/hooks";
import restaurantsService from "@/lib/restaurantsService";
import React, { useRef } from "react";
import Modal, { ModalHandler } from "@/components/Modal";
import CardWrapper from "@/components/CardWrapper";
import Button from "@/components/Button";
import { IUserRestaurants, IUser } from "@/types";

interface Props {
  restaurants: IUserRestaurants[];
  user: IUser;
}
const UserRestaurantPage = ({ restaurants, user }: Props) => {
  const [nameValue, handleNameInput, setNameInput] = useInput("");
  const [descriptionValue, handleDescInput, setDescriptionInput] = useInput("");
  const [addressValue, handleAddrInput, setAddressInput] = useInput("");
  const [imageValue, handleLogoUpload, setImageInput] = useFileInput();
  console.log({ imageValue });

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
    handleNameInput,
    handleDescInput,
    handleAddrInput,
    handleLogoUpload,
    handleReset: () => {
      setNameInput("");
      setAddressInput("");
      setDescriptionInput("");
      setImageInput(null);
    },
    nameValue,
    descriptionValue,
    addressValue,
    logoValue: imageValue?.name,
  };

  const modalRef = useRef<ModalHandler>(null);

  return (
    <section className="mx-auto w-full max-w-screen-lg">
      <Modal ref={modalRef}>
        <RestaurantForm {...formHandlers} />
      </Modal>
      <CardWrapper>
        <h3 className="text-center text-3xl font-bold">Your Restaurants</h3>
        <Button
          variant="custom"
          className="w-full rounded-lg bg-blue-200/50 p-4 font-bold text-blue-600"
          onClick={() => modalRef.current?.show()}
        >
          Add Restaurant
        </Button>

        <div className="flex flex-col gap-4">
          {restaurants.map((restaurant) => (
            <LinkCard
              href={`/manage/${restaurant.id}/details`}
              key={restaurant.id}
              name={restaurant.name}
              description={restaurant.description}
              imageUrl={restaurant.logo}
            />
          ))}
        </div>
      </CardWrapper>
    </section>
  );
};

export default UserRestaurantPage;
