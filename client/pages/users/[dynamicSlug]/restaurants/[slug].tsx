import ItemCard from "@/components/Card";
import MenuForm from "@/components/Forms/MenuForm";
import { useToasts } from "@/hooks";
import { RootState } from "@/reducers/store";
import restaurantsService from "@/services/restaurantsService";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";

interface FormData {
  name: string;
  description: string;
  price: number;
  category: string;
  image: File | undefined;
}

const UserRestaurant = () => {
  const { setSuccessMsg, setErrorMsg } = useToasts();
  const router = useRouter();
  const slug = router.query.slug as string;
  const user = useSelector((state: RootState) => state.user);

  const { restaurant, isLoading, isError } =
    restaurantsService.useRestaurant(slug);
  const { menu } = restaurantsService.useRestaurantMenu(slug);

  console.log({ slug, query: router.query });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: undefined,
  });

  const formHandlers = {
    handleSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("handleSubmit");
      try {
        const res = await restaurantsService.addMenuItem(
          user.token,
          slug,
          formData
        );
        console.log({ res });
        if (res.status === 201) {
          setSuccessMsg("Item added");
        }
      } catch (err) {
        console.log({ err });
        setErrorMsg("something went wrong");
      }
    },
    handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        name: event.target.value,
      });
    },
    handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        description: event.target.value,
      });
    },
    handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        price: Number(event.target.value),
      });
    },
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        image: event.target.files?.[0],
      });
    },
    handleCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        category: event.target.value,
      });
    },
  };

  if (isError) {
    console.log({ isError });
    return <div>something went wrong</div>;
  }

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <MenuForm {...formHandlers} />
      <div>
        <Image
          src={restaurant?.logo as string}
          alt=""
          width={50}
          height={50}
          className="border object-contain"
        />
        <h1>{restaurant?.name}</h1>
        <p>{restaurant?.description}</p>
        <p>{restaurant?.address}</p>
        {menu?.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            imageUrl={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default UserRestaurant;
