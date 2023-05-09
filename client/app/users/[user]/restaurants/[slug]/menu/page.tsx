"use client";

import ItemCard from "@/components/Card";
import MenuForm from "@/components/Forms/MenuForm";
import { useRestaurantMenu, useToasts } from "@/hooks";
import { RootState } from "@/reducers/store";
import restaurantsService from "@/services/restaurantsService";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

interface FormData {
  name: string;
  description: string;
  price: number;
  category: string;
  image: File | undefined;
}

const Page = () => {
  const { setSuccessMsg, setErrorMsg } = useToasts();

  const user = useSelector((state: RootState) => state.user);

  const router = useParams();
  const slug = router?.slug as string;

  const { menu } = useRestaurantMenu(slug);

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

  return (
    <section className="mx-auto w-full max-w-screen-md">
      <MenuForm {...formHandlers} />
      <div>
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
    </section>
  );
};

export default Page;
