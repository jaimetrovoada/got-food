import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import restaurantsService from "@/services/restaurantsService";
import userService from "@/services/userService";
import { useToasts } from "@/hooks";
import Link from "next/link";

interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleNameInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddrInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormData {
  name: string;
  description: string;
  address: string;
  logo: File | undefined;
}

const RestaurantForm: React.FC<FormProps> = ({
  handleSubmit,
  handleAddrInput,
  handleDescInput,
  handleLogoUpload,
  handleNameInput,
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label htmlFor="nameInput">
        Name:
        <input
          type="text"
          name="name"
          id="nameInput"
          className="border"
          onChange={handleNameInput}
        />
      </label>
      <label htmlFor="descInput">
        Description:
        <input
          type="text"
          name="description"
          id="descInput"
          className="border"
          onChange={handleDescInput}
        />
      </label>
      <label htmlFor="addrInput">
        Address:
        <input
          type="text"
          name="address"
          id="addrInput"
          className="border"
          onChange={handleAddrInput}
        />
      </label>
      <label htmlFor="logoUpload">
        Add logo
        <input
          type="file"
          name="logo"
          accept="image/*"
          title="add your logo"
          multiple={false}
          id="logoUpload"
          className="border"
          onChange={handleLogoUpload}
        />
      </label>
      <button type="submit" className="rounded-xl border bg-slate-500 p-2">
        submit
      </button>
    </form>
  );
};
const UserPage = () => {
  const router = useRouter();
  const slug = router.query.dynamicSlug as string;
  console.log({ slug });
  const [user, setUser] = useState<
    | {
        name: string;
        email: string;
        role: string;
        id: string;
      }
    | undefined
  >(undefined);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "{}"));
  }, []);

  const { restaurants, isLoading, error } =
    userService.useUserRestaurants(slug);

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
        const res = await restaurantsService.createRestaurant(formState);
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
            <Link
              href={`/users/${slug}/restaurants/${restaurant.id}`}
              className="rounded-2xl border p-2 text-xl font-bold"
              key={restaurant.id}
            >
              {restaurant.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;

// TODO: add list of restaurants belonging to user
