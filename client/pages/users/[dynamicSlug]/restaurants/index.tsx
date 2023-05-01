import { LinkCard } from "@/components/Card";
import RestaurantForm from "@/components/Forms/RestaurantForm";
import { getUserLayout } from "@/components/UserLayout";
import { useToasts } from "@/hooks";
import { NextPageWithLayout } from "@/pages/_app";
import { RootState } from "@/reducers/store";
import restaurantsService from "@/services/restaurantsService";
import userService from "@/services/userService";
import React, { useState } from "react";
import { useSelector } from "react-redux";

interface FormData {
  name: string;
  description: string;
  address: string;
  logo: File | undefined;
}

const UserRestaurantPage: NextPageWithLayout = () => {
  const user = useSelector((state: RootState) => state.user);
  

  const { restaurants, isLoading, error } = userService.useUserRestaurants(
    user.id
  );

  const { setSuccessMsg, setErrorMsg } = useToasts();
  const [formState, setFormState] = useState<FormData>({
    name: "",
    description: "",
    address: "",
    logo: undefined,
  });
  const formHandlers = {
    handleSubmit: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("handleSubmit");
      try {
        const res = await restaurantsService.createRestaurant(
          user.token,
          formState
        );
        console.log({ res });
        if (res.status === 201) {
          setSuccessMsg("Restaurant created");
          setFormState({
            name: "",
            description: "",
            address: "",
            logo: undefined,
          });
        }
      } catch (err) {
        console.log({ err });
        setErrorMsg("something went wrong");
      }
    },
    handleNameInput: (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({ ...formState, name: e.target.value });
    },
    handleDescInput: (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({ ...formState, description: e.target.value });
    },
    handleAddrInput: (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({ ...formState, address: e.target.value });
    },
    handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log({ e });
      const file = e.target.files?.[0];
      console.log({ files: e.target.files });
      if (file) {
        setFormState({ ...formState, logo: file });
      }
    },
  };
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error) {
    console.log({ error });
    return <div>something went wrong</div>;
  }
  return (
    <div>
      Hi {user?.name}
      {user?.role === "business" ? <RestaurantForm {...formHandlers} /> : null}
      <div className="flex flex-col gap-4">
        <h3>your restaurants</h3>

        <div className="flex flex-col gap-4">
          {restaurants?.map((restaurant) => (
            <LinkCard
              href={`/users/${user.id}/restaurants/${restaurant.id}`}
              key={restaurant.id}
              name={restaurant.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

UserRestaurantPage.getLayout = getUserLayout;

export default UserRestaurantPage;
