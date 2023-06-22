import { IOrder } from "@/types";
import React from "react";
import Card from "../Card";

interface Props {
  order: IOrder;
  showDetails: (order: IOrder) => void;
}

const Item = ({ order, showDetails }: Props) => {
  return (
    <Card
      key={order.id}
      className="flex flex-col gap-8 p-2"
      onClick={() => showDetails(order)}
      role="button"
      tabIndex={0}
      aria-label={`order number: ${order.orderId}`}
    >
      <div className="flex flex-row items-center justify-between">
        <span className="font-semibold text-slate-200 underline">
          Order: #{order.orderId.split("-")[1]}
        </span>
        <span className="text-sm text-slate-400">
          Table {order.tableNumber}
        </span>
      </div>
      <span className="flex w-fit items-center gap-1 rounded-full bg-gray-800/50 px-2 py-1.5 text-xs uppercase text-gray-400">
        {order.status}
      </span>
    </Card>
  );
};

export default Item;
