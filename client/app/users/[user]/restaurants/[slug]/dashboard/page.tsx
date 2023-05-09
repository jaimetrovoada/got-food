"use client";

import Button from "@/components/Button";
import { useRestaurant, useRestaurantOrders } from "@/hooks";
import restaurantsService from "@/services/restaurantsService";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useParams();
  const slug = router?.slug as string;

  const { restaurant } = useRestaurant(slug);
  const { orders } = useRestaurantOrders(slug);

  const dateString = (orderDate: Date) => {
    const date = new Date(orderDate);
    const time = `${date.getHours()}:${date.getMinutes()}`;

    return `${time} @ ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  };

  return (
    <section className="mx-auto w-full max-w-screen-md">
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
              <Button
                className=""
                kind="custom"
                onClick={() =>
                  restaurantsService.updateOrder(restaurant.id, order.id)
                }
              >
                ✅
              </Button>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Page;
