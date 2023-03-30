import { useToasts } from "@/hooks";
import restaurantsService from "@/services/restaurantsService";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface MenuFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface FormData {
  name: string;
  description: string;
  price: number;
  category: string;
  image: File | undefined;
}

const MenuForm: React.FC<MenuFormProps> = ({
  handleSubmit,
  handleCategoryChange,
  handleDescriptionChange,
  handleImageChange,
  handleNameChange,
  handlePriceChange,
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 border p-2">
      <label htmlFor="name">
        Name:{" "}
        <input
          className="border"
          type="text"
          name="name"
          id="name"
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="description">
        Description:
        <input
          className="border"
          type="text"
          name="description"
          id="description"
          onChange={handleDescriptionChange}
        />
      </label>
      <label htmlFor="price">
        Price:{" "}
        <input
          className="border"
          type="number"
          name="price"
          id="price"
          onChange={handlePriceChange}
        />
      </label>
      <label htmlFor="category">
        Category:{" "}
        <input
          className="border"
          type="text"
          name="category"
          id="category"
          onChange={handleCategoryChange}
        />
      </label>
      <label htmlFor="image">
        Image:{" "}
        <input
          className="border"
          type="file"
          accept="image/*"
          name="image"
          id="image"
          onChange={handleImageChange}
        />
      </label>
      <button type="submit" className="rounded-xl border bg-slate-500 p-2">
        submit
      </button>
    </form>
  );
};

const UserRestaurant = () => {
  const { setSuccessMsg, setErrorMsg } = useToasts();
  const router = useRouter();
  const slug = router.query.slug as string;

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
        const res = await restaurantsService.addMenuItem(slug, formData);
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
        <img
          src={restaurant?.logo}
          alt=""
          width={50}
          height={50}
          className="border object-contain"
        />
        <h1>{restaurant?.name}</h1>
        <p>{restaurant?.description}</p>
        <p>{restaurant?.address}</p>
        {menu?.map((item) => (
          <div key={item.id} className="flex flex-row rounded-xl border">
            <img
              src={item.image}
              alt=""
              width={50}
              height={50}
              className="aspect-square rounded-tl-xl rounded-bl-xl object-cover"
            />
            <div className="p-2">
              <p className="text-xl font-bold">{item.name}</p>
              <p className="text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRestaurant;
