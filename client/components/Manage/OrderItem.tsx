import { IOrder } from "@/types";
import React from "react";
import Card from "../Card";

interface Props {
  order: IOrder;
  setActiveOrder: React.Dispatch<React.SetStateAction<IOrder>>;
}

const Item = ({ order, setActiveOrder }: Props) => {
  const dateString = (orderDate: Date) => {
    const date = new Date(orderDate);
    const time = `${date.getHours()}:${date.getMinutes()}`;

    return `${time} @ ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  };

  return (
    <Card
      key={order.id}
      className="flex h-fit cursor-pointer flex-col gap-2 bg-white p-2"
      onClick={() => setActiveOrder(order)}
      role="button"
      tabIndex={0}
      aria-label={`order number: ${order.orderId}`}
    >
      <div className="">
        <p className="font-bold underline">
          Order: #{order.orderId.split("-")[1]}
        </p>
        <p className="text-gray-600">{dateString(order.date)}</p>
      </div>
      <div>
        <span className="mr-2">Table:</span>
        <span className="">#{order.tableNumber}</span>
      </div>
      <div>
        <span className="mr-2">Status</span>
        <span className="text-gray-600">{order.status.toUpperCase()}</span>
      </div>
    </Card>
  );
};

export default Item;
