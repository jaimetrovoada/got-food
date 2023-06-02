import React from "react";
import { IOrder } from "@/types";
import { OrderCard } from "@/components/Card";
import axios from "axios";
import { getUser } from "@/lib/auth";
import { API } from "@/lib/constants";

const getUserOrders = async () => {
  const user = await getUser();
  const res = await axios.get<IOrder[]>(`${API.users}/${user.id}/orders`);
  return res.data;
};

const OrdersPage = async () => {
  const orders = await getUserOrders();
  console.log({ orders });

  if (!orders || orders.length === 0) {
    return <>No orders made yet</>;
  }

  return (
    <section className="mx-auto w-full max-w-screen-md">
      <p>Order History:</p>
      <div className="flex flex-col gap-2">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
};

export default OrdersPage;
