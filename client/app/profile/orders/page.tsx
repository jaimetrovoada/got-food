import React from "react";
import { Item } from "@/components/Profile";
import userService from "@/lib/user.service";

const OrdersPage = async () => {
  const [orders, error] = await userService.getOrders();
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
