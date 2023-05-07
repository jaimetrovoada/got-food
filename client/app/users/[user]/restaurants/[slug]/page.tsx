"use client";

import Button from "@/components/Button";
import ItemCard from "@/components/Card";
import MenuForm from "@/components/Forms/MenuForm";
import { useToasts } from "@/hooks";
import { IOrder } from "@/hooks/user";
import { RootState } from "@/reducers/store";
import restaurantsService, {
  MenuItem,
  Restaurant,
} from "@/services/restaurantsService";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRestaurant, useRestaurantOrders, useRestaurantMenu } from "@/hooks";

interface FormData {
  name: string;
  description: string;
  price: number;
  category: string;
  image: File | undefined;
}

interface ViewsProps {
  view: string;
  formHandlers: {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionChange: (
      event: React.ChangeEvent<HTMLInputElement>
    ) => void;
    handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  restaurant: Restaurant | undefined;
  menu: MenuItem[] | undefined;
  orders: IOrder[] | undefined;
}

const Views = ({
  view,
  formHandlers,
  restaurant,
  menu,
  orders,
}: ViewsProps) => {
  console.log({ currV: view });
  if (view === "menu") {
    return (
      <div className="flex flex-col gap-4">
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
      </div>
    );
  }

  if (view === "details") {
    return (
      <div className="flex flex-col gap-4">
        <h1>{restaurant?.name}</h1>
        <p>{restaurant?.description}</p>
        <p>{restaurant?.address}</p>
      </div>
    );
  }

  const dateString = (orderDate: Date) => {
    const date = new Date(orderDate);
    const time = `${date.getHours()}:${date.getMinutes()}`;

    return `${time} @ ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  };

  return (
    <div className="flex flex-col gap-4">
      <p>active orders:</p>
      <div className="grid grid-cols-4">
        {orders
          ?.filter((order) => order.status === "pending")
          ?.map((order) => (
            <div
              key={order.id}
              className="border-2 border-black p-2 shadow-custom"
            >
              <div className="flex justify-between">
                <p className="font-bold underline">
                  Table: {order.tableNumber}
                </p>
                <p className="text-gray-500">{dateString(order.date)}</p>
              </div>
              <p className="">STATUS: {order.status.toUpperCase()}</p>
              {order.orderedItems.map((item) => (
                <ul className="list-inside list-disc" key={item._id}>
                  <li className="list-item text-gray-700">
                    {item.item.name} - {item.amount}
                  </li>
                </ul>
              ))}
              <Button className="" kind="custom">
                ✅
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};
const UserRestaurant = () => {
  const { setSuccessMsg, setErrorMsg } = useToasts();
  const router = useParams();
  const slug = router?.slug as string;
  const user = useSelector((state: RootState) => state.user);

  const { orders } = useRestaurantOrders(slug);
  console.log({ orders });
  const { restaurant, isLoading, isError } = useRestaurant(slug);
  const { menu } = useRestaurantMenu(slug);

  const views = ["dashboard", "menu", "details"];

  const [view, setView] = useState<string>("dashboard");

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
      <div>
        <ul className="flex gap-4">
          {views.map((_view) => (
            <li key={_view}>
              <Button
                className={`font-normal ${
                  view === _view ? "underline" : "text-gray-500"
                }`}
                kind="custom"
                onClick={() => setView(_view)}
              >
                {_view}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <Views
        view={view}
        formHandlers={formHandlers}
        restaurant={restaurant}
        menu={menu}
        orders={orders}
      />
    </div>
  );
};

export default UserRestaurant;
