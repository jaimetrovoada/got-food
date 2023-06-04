import restaurantsService from "@/lib/restaurantsService";
import { IOrder } from "@/types";
import React, { useRef, useState } from "react";
import Button from "./Button";
import Card from "./Card";

interface Props {
  orders: IOrder[];
  restaurantId: string;
}
const OrdersTableDetail = ({
  order,
  restaurantId,
}: {
  order: IOrder | null;
  restaurantId: string;
}) => {
  return (
    <aside className="hidden w-1/3 flex-col rounded-2xl border border-gray-600 bg-white shadow-lg transition-all md:flex">
      <p className="border-b border-black/50 p-2 font-bold uppercase shadow-md">
        Details
      </p>
      {order ? (
        <>
          <div className="flex flex-1 flex-col gap-4 p-2">
            <p>Order: #{order?.orderId}</p>
            <div>
              <p>Items:</p>
              {order.orderedItems.map((item) => (
                <ul className="list-inside list-disc" key={item._id}>
                  <li className="list-item text-gray-700">
                    {item.item.name} - {item.amount}
                  </li>
                </ul>
              ))}
            </div>
          </div>
          <Button
            variant="custom"
            onClick={() =>
              restaurantsService.updateOrder(restaurantId, order.id)
            }
            className="m-2 rounded-2xl bg-blue-500 p-2 font-bold text-white shadow-md transition-colors hover:bg-blue-600"
          >
            Completed
          </Button>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-2">
          <p>Click an order to see details!</p>
        </div>
      )}
    </aside>
  );
};

const OrdersTableWrapper = ({ orders, restaurantId }: Props) => {
  const [activeOrder, setActiveOrder] = useState<IOrder>();
  console.log({ activeOrder });

  const dateString = (orderDate: Date) => {
    const date = new Date(orderDate);
    const time = `${date.getHours()}:${date.getMinutes()}`;

    return `${time} @ ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  };

  return (
    <div className="flex h-full flex-1 gap-2 overflow-y-hidden pb-4 lg:gap-8">
      <aside className="grid h-fit flex-1 grid-cols-1 gap-4 overflow-y-auto scrollbar-none md:grid-cols-2 lg:grid-cols-3">
        {orders
          ?.filter((order) => order.status === "pending")
          ?.sort((a, b) => Number(a.orderId) - Number(b.orderId))
          ?.map((order) => (
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
                <span className="text-gray-600">
                  {order.status.toUpperCase()}
                </span>
              </div>
            </Card>
          ))}
      </aside>
      <OrdersTableDetail order={activeOrder} restaurantId={restaurantId} />
    </div>
  );
};

export default OrdersTableWrapper;
