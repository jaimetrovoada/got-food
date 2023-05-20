"use client";

import Button from "@/components/Button";
import { RootState } from "@/reducers/store";
import { useUserOrders } from "@/hooks";
import React from "react";
import { useSelector } from "react-redux";
import { IOrder } from "@/types";
import Card from "@/components/Card";

interface Props {
  order: IOrder;
}

const OrderCard = ({ order }: Props) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const date = new Date(order.date);
  const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  const time = `${date.getHours()}:${date.getMinutes()}`;

  return (
    <Card className="flex flex-col p-2" variant="square">
      <div className="flex justify-between">
        <span className="font-bold">{order.restaurant.name}</span>
        <span className="font-bold">${order.totalPrice}</span>
      </div>
      <span className="text-gray-500">
        {dateString} - {time}
      </span>
      <div
        className={`${
          isExpanded ? "max-h-screen" : "max-h-0"
        } overflow-hidden transition-all`}
      >
        <ul className="list-inside list-disc">
          {order.orderedItems.map((item) => (
            <li key={item.item.image} className="list-item text-gray-700">
              {item.item.name} - ${item.item.price} x {item.amount}
            </li>
          ))}
        </ul>
      </div>
      <Button
        className="mx-auto text-gray-500"
        variant="tertiary"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        Details
      </Button>
    </Card>
  );
};

const OrdersPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const { orders } = useUserOrders(user.id);
  console.log({ orders });

  if (!orders || orders.length === 0) {
    return <>No orders made yet</>;
  }

  return (
    <section className="mx-auto w-full max-w-screen-md">
      <p>Order History:</p>
      <div>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
};

export default OrdersPage;
