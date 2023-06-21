"use client";

import Button from "@/components/Button";
import CardWrapper from "@/components/CardWrapper";
import { RestaurantItem as Item } from "@/components/Manage";
import RestaurantForm from "@/components/Forms/RestaurantForm";
import Modal, { ModalHandler } from "@/components/Modal";
import { IUser, IUserRestaurants } from "@/types";
import { useRef } from "react";
import { XCircle } from "react-feather";

interface Props {
  restaurants: IUserRestaurants[];
  user: IUser;
}
const UserRestaurantPage = ({ restaurants, user }: Props) => {
  const modalRef = useRef<ModalHandler>(null);

  return (
    <section className="mx-auto w-full max-w-screen-lg">
      <Modal ref={modalRef}>
        <div className="z-50 flex w-full max-w-screen-md flex-col rounded-2xl border border-gray-200 bg-white p-2 shadow-lg">
          <Button
            variant="tertiary"
            onClick={() => modalRef?.current.hide()}
            className="ml-auto text-red-700"
          >
            <XCircle />
          </Button>
          <RestaurantForm user={user} />
        </div>
      </Modal>
      <CardWrapper>
        <h3 className="text-center text-3xl font-bold">Your Restaurants</h3>
        <Button
          variant="custom"
          className="w-full rounded-lg bg-blue-600/20 p-4 font-bold text-slate-200 hover:bg-blue-600/40"
          onClick={() => modalRef.current?.show()}
        >
          Add Restaurant
        </Button>

        <div className="flex flex-col gap-4">
          {restaurants?.map((restaurant) => (
            <Item key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </CardWrapper>
    </section>
  );
};

export default UserRestaurantPage;
