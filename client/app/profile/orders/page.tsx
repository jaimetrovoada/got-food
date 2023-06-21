import React from "react";
import { IOrder } from "@/types";
import { Item } from "@/components/Profile";
import axios from "axios";
import { getUser } from "@/lib/auth";
import { API } from "@/lib/constants";

const getUserOrders = async () => {
  try {
    
  const user = await getUser();

  const res = await axios.get<IOrder[]>(`${API.users}/${user.id}/orders`);
    console.log({res:res.data})
  return [res.data, null] as [IOrder[], Error];
  } catch (error) {
    console.log({error})

    return [null, error] as [null, Error];
  }
};

const OrdersPage = async () => {
  const [orders, error] = await getUserOrders();
  console.log({ orders });

  if (!orders || orders.length === 0) {
    return <>No orders made yet</>;
  }

  return (
    <section className="mx-auto w-full max-w-screen-md">
      <p>Order History:</p>
      <div className="flex flex-col gap-2">
        {orders.map((order) => (
          <Item key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
};

export default OrdersPage;
